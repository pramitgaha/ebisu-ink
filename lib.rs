#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

use ink_lang as ink;

#[ink::contract]
mod ebisu {
    use ink_env::CallFlags;
    use ink_storage::{
        Mapping,
        traits::{SpreadAllocate, PackedLayout, SpreadLayout}
    };
    use ink_prelude::{
        vec::Vec,
        vec
    };
    use openbrush::contracts::psp34::*;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum ContractError{
        Unauthorized,
        NftTransferFailed,
        NotEnoughBalance,
        NftNotDeposited,
        AuctionDoesNotExist,
        BidDoesNotExist,
        LoanDoesNotExist,
        LoanDueTimeExceed,
        AmountMismatched,
        FeeNotPaid,
        TransferFailed,
        BorrowerHaveTimeToPayTheLoan,
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AuctionData{
        by: AccountId,
        nft_contract: AccountId,
        id: u32,
        amount_asked: Balance,
        time_asked: u64,
        rate_asked: u32,
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout, Clone, Copy)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct BidData{
        by: AccountId,
        amount: Balance,
        time: u64,
        rate: u32
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct LoanData{
        lent_by: AccountId,
        borrowed_by: AccountId,
        nft_contract: AccountId,
        id: u32,
        amount_borrowed: Balance,
        amount_to_be_paid: Balance,
        loan_started_on: u64,
        loan_ends_on: u64,
        time: u64,
        rate: u32,
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout, Clone, Copy)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AuctionAcceptedData{
        accepted_investor: AccountId,
        amount: Balance,
        time: u64,
        rate: u32,
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout, Clone, Copy)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AuctionResult{
        created_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
        amount_asked: Balance,
        time_asked: u64,
        rate_asked: u32,
        accepted_data: Option<AuctionAcceptedData>
    }

    #[derive(scale::Encode, scale::Decode, PackedLayout, SpreadLayout, Clone, Copy)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct LoanResult{
        lent_by: AccountId,
        borrowed_by: AccountId,
        amount_borrowed: Balance,
        time: u64,
        rate: u32,
        collateral_withdrawal: bool,
        amount_paid: Option<Balance>,
    }

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct Ebisu{
        owner: AccountId,
        fee: u32,
        loan_default_fee: u128,
        auction_cancellation_fee: u128,
        auction_count: u128,
        loan_count: u128,
        auction_nft_vault: Mapping<u128, (AccountId, u32)>,
        asset_vault: Mapping<AccountId, Balance>,
        nft_vault: Mapping<AccountId, Vec<(AccountId, u32)>>,
        auction_details: Mapping<u128, AuctionData>,
        bid_details: Mapping<u128, Vec<BidData>>,
        loan_details: Mapping<u128, LoanData>,
        // mapping of (nft_contract's address, id) to value of (lender, borrower)
        collateral_vault: Mapping<(AccountId, u32), (AccountId, AccountId)>,
        auction_history: Mapping<u128, AuctionResult>,
        loan_history: Mapping<u128, LoanResult>,
    }

    #[ink(event)]
    pub struct OwnerChanged{
        old_owner: AccountId,
        new_owner: AccountId,
    }

    #[ink(event)]
    pub struct FeeChanged{
        old_fee: u32,
        new_fee: u32,
    }

    #[ink(event)]
    pub struct AssetDeposited{
        deposit_by: AccountId,
        amount: Balance,
        new_balance: Balance,
    }

    #[ink(event)]
    pub struct AssetWithdrawal{
        withdrawn_by: AccountId,
        amount: Balance,
        new_balance: Balance,
    }

    #[ink(event)]
    pub struct NftDeposit{
        deposit_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
    }

    #[ink(event)]
    pub struct NftWithdrawal{
        withdrawn_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
    }

    #[ink(event)]
    pub struct AuctionCreated{
        auction_id: u128,
        created_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
        amount_asked: Balance,
        time_asked: u64,
        rate_asked: u32,
    }

    #[ink(event)]
    pub struct BidCreated{
        auction_id: u128,
        bid_index: u128,
        bid_by: AccountId,
        amount: Balance,
        time: u64,
        rate: u32,
    }

    #[ink(event)]
    pub struct OrderAccepted{
        loan_id: u128,
        lent_by: AccountId,
        borrowed_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
        amount_borrowed: Balance,
        amount_to_be_paid: Balance,
        loan_started_on: u64,
        loan_ends_on: u64,
        time: u64,
        rate: u32,
    }

    #[ink(event)]
    pub struct AuctionCancelled{
        auction_id: u128,
        cancelled_by: AccountId,
    }

    #[ink(event)]
    pub struct LoanPaid{
        loan_id: u128,
        paid_by: AccountId,
    }

    #[ink(event)]
    pub struct CollateralWithdrawal{
        loan_id: u128,
        withdrawn_by: AccountId,
        nft_contract: AccountId,
        token_id: u32,
    }

    #[ink(impl)]
    impl Ebisu{
        fn get_new_auction_id(&mut self) -> u128{
            let id = self.auction_count;
            self.auction_count += 1;
            id
        }

        fn get_new_loan_id(&mut self) -> u128{
            let id = self.loan_count;
            self.loan_count += 1;
            id
        }

        #[ink(constructor)]
        pub fn init(fee: u32, auction_cancellation_fee: u128, loan_default_fee: u128) -> Self{
            ink_lang::utils::initialize_contract(|contract: &mut Ebisu|{
                contract.owner = Self::env().caller();
                contract.fee = fee;
                contract.auction_count = 0;
                contract.loan_count = 0;
                contract.auction_cancellation_fee = auction_cancellation_fee;
                contract.loan_default_fee = loan_default_fee;
            })
        }

        #[ink(message)]
        pub fn change_owner(&mut self, new_owner: AccountId) -> Result<(), ContractError>{
            if self.env().caller() != self.owner{
                return Err(ContractError::Unauthorized)
            }
            self.owner = new_owner;
            self.env().emit_event(OwnerChanged{
                old_owner: self.env().caller(),
                new_owner,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn current_owner(&self) -> AccountId{
            self.owner
        }
        
        #[ink(message)]
        pub fn change_fee(&mut self, new_fee: u32) -> Result<(), ContractError>{
            if self.env().caller() != self.owner{
                return Err(ContractError::Unauthorized)
            }
            self.env().emit_event(FeeChanged{
                old_fee: self.fee,
                new_fee
            });
            self.fee = new_fee;
            Ok(())
        }

        #[ink(message, payable)]
        pub fn deposit_asset(&mut self) -> Result<(), ContractError>{
            let caller = self.env().caller();
            let prev_balance = self.asset_vault.get(caller).unwrap_or(0);
            let transferred_balance = self.env().transferred_value();
            self.asset_vault.insert(caller, &(prev_balance + transferred_balance));
            self.env().emit_event(AssetDeposited{
                deposit_by: caller,
                amount: transferred_balance,
                new_balance: self.asset_vault.get(caller).unwrap_or(0)
            });
            Ok(())
        }

        #[ink(message)]
        pub fn withdraw_asset(&mut self, amount: Balance) -> Result<(), ContractError>{
            let caller = self.env().caller();
            let current_balance = self.asset_vault.get(caller).unwrap_or(0);
            if amount > current_balance{
                return Err(ContractError::NotEnoughBalance)
            }
            self.env().transfer(caller, amount).expect("Transfer failed");
            self.asset_vault.insert(caller, &(current_balance - amount));
            self.env().emit_event(AssetWithdrawal{
                withdrawn_by: caller,
                amount,
                new_balance: self.asset_vault.get(caller).unwrap_or(0)
            });
            Ok(())
        }

        #[ink(message)]
        pub fn check_balance(&self) -> Balance{
            let caller = self.env().caller();
            let balance = self.asset_vault.get(caller).unwrap_or(0);
            balance
        }

        #[ink(message)]
        pub fn deposit_nft(&mut self, nft_contract: AccountId, id: u32) -> Result<(), ContractError>{
            let caller = self.env().caller();
            let transfer_res = PSP34Ref::transfer_builder(&nft_contract, self.env().account_id(), Id::U32(id), vec![]).call_flags(CallFlags::default().set_allow_reentry(true)).fire();
            if transfer_res.unwrap().is_err(){
                return Err(ContractError::NftTransferFailed)
            }
            let mut prev_nft = self.nft_vault.get(caller).unwrap_or_default();
            prev_nft.push((nft_contract, id));
            self.nft_vault.insert(caller, &prev_nft);
            Ok(())
        }

        #[ink(message)]
        pub fn withdraw_nft(&mut self, nft_contract: AccountId, id: u32) -> Result<(), ContractError>{
            let caller = self.env().caller();
            if let Some(mut list) = self.nft_vault.get(caller){
                if !list.contains(&(nft_contract, id)){
                    return Err(ContractError::NftNotDeposited)
                }
                let transfer_res = PSP34Ref::transfer(&nft_contract, caller, Id::U32(id), vec![]);
                if transfer_res.is_err(){
                    return Err(ContractError::TransferFailed)
                }
                list.retain(|(nft, nft_id)| *nft != nft_contract && *nft_id != id);
                return Ok(())
            }
            Err(ContractError::NftNotDeposited)
        }

        #[ink(message)]
        pub fn nft_balance(&self) -> Vec<(AccountId, u32)>{
            let caller = Self::env().caller();
            let default_value: Vec<(AccountId, u32)> = Vec::new();
            let result = self.nft_vault.get(caller).unwrap_or(default_value);
            result
        }

        #[ink(message)]
        pub fn create_auction(&mut self, nft_contract: AccountId, id: u32, amount_asked: Balance, time_asked: u64, rate_asked: u32) -> Result<(), ContractError>{
            let caller = self.env().caller();
            if let Some(mut list) = self.nft_vault.get(caller){
                if !list.contains(&(nft_contract, id)){
                    return Err(ContractError::NftNotDeposited)
                }
                list.retain(|(nft, nft_id)| *nft != nft_contract && *nft_id != id);
                self.nft_vault.insert(caller, &list);
                let auction_id = self.get_new_auction_id();
                let auction_data = AuctionData{
                    by: caller,
                    nft_contract,
                    id,
                    amount_asked,
                    time_asked,
                    rate_asked
                };
                self.auction_nft_vault.insert(auction_id, &(nft_contract, id));
                self.auction_details.insert(auction_id, &auction_data);
                let value: Vec<BidData> = Vec::new();
                self.bid_details.insert(auction_id, &value);
                self.env().emit_event(AuctionCreated{
                    auction_id,
                    created_by: caller,
                    nft_contract,
                    token_id: id,
                    amount_asked,
                    time_asked,
                    rate_asked
                });
                return Ok(())
            }
            Err(ContractError::Unauthorized)
        }

        #[ink(message)]
        pub fn get_auction_list(&self) -> Vec<(u128, AuctionData)>{
            let mut list = Vec::new();
            for i in 0..=self.auction_count{
                if let Some(data) = self.auction_details.get(i){
                    list.push((i, data))
                }
            }
            list
        }

        #[ink(message)]
        pub fn create_bid(&mut self, auction_id: u128, amount: Balance, time: u64, rate: u32) -> Result<(), ContractError>{
            if let Some(mut list) = self.bid_details.get(auction_id){
                let caller = self.env().caller();
                let caller_balance = self.asset_vault.get(caller).unwrap_or(0);
                if amount > caller_balance{
                    return Err(ContractError::NotEnoughBalance)
                }
                let bid_data = BidData{
                    by: caller,
                    amount,
                    time,
                    rate
                };
                list.push(bid_data);
                self.bid_details.insert(auction_id, &list);
                self.env().emit_event(BidCreated{
                    auction_id,
                    bid_index: (list.len() - 1) as u128,
                    bid_by: caller,
                    amount,
                    time,
                    rate
                });
                return Ok(())
            }
            Err(ContractError::AuctionDoesNotExist)
        }

        #[ink(message)]
        pub fn get_bid_list(&self, auction_id: u128) -> Result<Vec<BidData>, ContractError>{
            if let Some(list) = self.bid_details.get(auction_id){
                return Ok(list)
            }
            Err(ContractError::AuctionDoesNotExist)
        }

        #[ink(message)]
        pub fn accept_order(&mut self, auction_id: u128, index: u32) -> Result<(), ContractError>{
            if let Some(data) = self.auction_details.get(auction_id){
                let caller = self.env().caller();
                if caller != data.by{
                    return Err(ContractError::Unauthorized)
                }
                let bid_data = self.bid_details.get(auction_id).ok_or(ContractError::AuctionDoesNotExist)?.get(index as usize).ok_or(ContractError::BidDoesNotExist)?.clone();
                self.create_loan(bid_data.by, data.by, data.nft_contract, data.id, bid_data.amount, bid_data.time, bid_data.rate)?;
                self.auction_nft_vault.remove(auction_id);
                self.collateral_vault.insert((data.nft_contract, data.id), &(bid_data.by, data.by));
                self.auction_details.remove(auction_id);
                self.bid_details.remove(auction_id);
                self.env().transfer(caller, bid_data.amount).expect("Transfer failed");
                let auction_accepted_data = AuctionAcceptedData{
                    accepted_investor: bid_data.by,
                    amount: bid_data.amount,
                    time: bid_data.time,
                    rate: bid_data.rate,
                };
                let auction_result = AuctionResult{
                    created_by: data.by,
                    nft_contract: data.nft_contract,
                    token_id: data.id,
                    amount_asked: data.amount_asked,
                    time_asked: data.time_asked,
                    rate_asked: data.rate_asked,
                    accepted_data: Some(auction_accepted_data),
                };
                self.auction_history.insert(auction_id, &auction_result);
                return Ok(())
            }
            Err(ContractError::AuctionDoesNotExist)
        }

        fn create_loan(&mut self, lent_by: AccountId, borrowed_by: AccountId, nft_contract: AccountId, id: u32, amount_borrowed: Balance, time: u64, rate: u32) -> Result<(), ContractError>{
            let loan_id = self.get_new_loan_id();
            let amount_to_be_paid = amount_borrowed + (((amount_borrowed * time as u128 * rate as u128)/ 365)/ 10000);
            let loan_started_on = self.env().block_timestamp();
            let loan_ends_on = loan_started_on + (time * 24 * 60 * 60);
            let loan_data = LoanData{
                lent_by,
            borrowed_by,
            nft_contract,
            id,
            amount_borrowed,
            amount_to_be_paid,
            loan_started_on,
            loan_ends_on,
            time,
            rate,
            };
            self.loan_details.insert(loan_id, &loan_data);
            self.env().emit_event(OrderAccepted{
                loan_id,
                lent_by,
                borrowed_by,
                nft_contract,
                token_id: id,
                amount_borrowed,
                amount_to_be_paid,
                loan_started_on,
                loan_ends_on,
                time,
                rate,
            });
            Ok(())
        }

        #[ink(message, payable)]
        pub fn cancel_auction(&mut self, auction_id: u128) -> Result<(), ContractError>{
            if let Some(data) = self.auction_details.get(auction_id){
                if self.env().caller() != data.by{
                    return Err(ContractError::Unauthorized)
                }
                if self.env().transferred_value() != self.auction_cancellation_fee{
                    return Err(ContractError::FeeNotPaid)
                }
                self.auction_details.remove(auction_id);
                self.bid_details.remove(auction_id);
                self.auction_nft_vault.remove(auction_id);
                let mut prev_nft = self.nft_vault.get(data.by).ok_or(ContractError::Unauthorized)?;
                prev_nft.push((data.nft_contract, data.id));
                self.nft_vault.insert(self.env().caller(), &prev_nft);
                self.env().emit_event(AuctionCancelled{
                    auction_id,
                    cancelled_by: self.env().caller(),
                });
                let auction_result = AuctionResult{
                    created_by: data.by,
                    nft_contract: data.nft_contract,
                    token_id: data.id,
                    amount_asked: data.amount_asked,
                    time_asked: data.time_asked,
                    rate_asked: data.rate_asked,
                    accepted_data: None,
                };
                self.auction_history.insert(auction_id, &auction_result);
                return Ok(())
            }
            Err(ContractError::AuctionDoesNotExist)
        }

        #[ink(message)]
        pub fn get_loan_list(&self) -> Vec<(u128, LoanData)>{
            let mut list = Vec::new();
            for i in 0..=self.loan_count{
                if let Some(data) = self.loan_details.get(i){
                    list.push((i, data))
                }
            }
            list
        }

        #[ink(message)]
        pub fn get_loan_data(&self, loan_id: u128) -> Result<LoanData, ContractError>{
            if let Some(data) = self.loan_details.get(loan_id){
                return Ok(data)
            }
            Err(ContractError::LoanDoesNotExist)
        }

        #[ink(message, payable)]
        pub fn pay_loan(&mut self, loan_id: u128) -> Result<(), ContractError>{
            if let Some(loan_data) = self.loan_details.get(loan_id){
                if self.env().caller() != loan_data.borrowed_by{
                    return Err(ContractError::Unauthorized)
                }
                let transferred_value = self.env().transferred_value();
                if transferred_value != loan_data.amount_to_be_paid{
                    return Err(ContractError::AmountMismatched)
                }
                let current_timestamp = self.env().block_timestamp();
                if current_timestamp > loan_data.loan_ends_on{
                    return Err(ContractError::LoanDueTimeExceed)
                }
                let fee = self.fee as u128 * ((loan_data.amount_to_be_paid - loan_data.amount_borrowed)/ 10000);
                self.env().transfer(self.owner, fee).expect("Transfer failed");
                let lender_balance = self.asset_vault.get(loan_data.lent_by).unwrap_or(0);
                self.asset_vault.insert(loan_data.lent_by, &(lender_balance + (loan_data.amount_to_be_paid - fee)));
                let mut prev_nft = self.nft_vault.get(loan_data.borrowed_by).unwrap_or_default();
                prev_nft.push((loan_data.nft_contract, loan_data.id));
                self.nft_vault.insert(loan_data.borrowed_by, &prev_nft);
                self.loan_details.remove(loan_id);
                self.collateral_vault.remove((loan_data.nft_contract, loan_data.id));
                let loan_result = LoanResult{
                    lent_by: loan_data.lent_by,
                    borrowed_by: loan_data.borrowed_by,
                    amount_borrowed: loan_data.amount_borrowed,
                    time: loan_data.time,
                    rate: loan_data.rate,
                    collateral_withdrawal: false,
                    amount_paid: Some(transferred_value),
                };
                self.loan_history.insert(loan_id, &loan_result);
                self.env().emit_event(LoanPaid{
                    loan_id,
                    paid_by: loan_data.borrowed_by,
                });
                return Ok(())
            }
            Err(ContractError::LoanDoesNotExist)
        }

        #[ink(message, payable)]
        pub fn get_collateral(&mut self, loan_id: u128) -> Result<(), ContractError>{
            if let Some(loan_data) = self.loan_details.get(loan_id) {
                if self.env().caller() != loan_data.lent_by {
                    return Err(ContractError::Unauthorized)
                }
                if self.env().transferred_value() != self.loan_default_fee{
                    return Err(ContractError::FeeNotPaid)
                }
                let current_timestamp = self.env().block_timestamp();
                if current_timestamp < loan_data.loan_ends_on {
                    return Err(ContractError::BorrowerHaveTimeToPayTheLoan)
                }
                self.env().transfer(self.owner, self.env().transferred_value()).expect("Transfer failed");
                let mut prev_nft = self.nft_vault.get(loan_data.lent_by).unwrap_or_default();
                prev_nft.push((loan_data.nft_contract, loan_data.id));
                self.nft_vault.insert(loan_data.lent_by, &prev_nft);
                self.collateral_vault.remove((loan_data.nft_contract, loan_data.id));
                self.loan_details.remove(loan_id);
                let loan_result = LoanResult{
                    lent_by: loan_data.lent_by,
                    borrowed_by: loan_data.borrowed_by,
                    amount_borrowed: loan_data.amount_borrowed,
                    time: loan_data.time,
                    rate: loan_data.rate,
                    collateral_withdrawal: true,
                    amount_paid: None,
                };
                self.loan_history.insert(loan_id, &loan_result);
                self.env().emit_event(CollateralWithdrawal{
                    loan_id,
                    withdrawn_by: loan_data.lent_by,
                    nft_contract: loan_data.nft_contract,
                    token_id: loan_data.id
                });
                return Ok(())
            }
            Err(ContractError::LoanDoesNotExist)
        }

        #[ink(message)]
        pub fn get_auction_history(&self) -> Vec<(u128, AuctionResult)>{
            let count = self.auction_count;
            let mut auction_history: Vec<(u128, AuctionResult)> = Vec::new();
            for i in 0..count{
                if let Some(data) = self.auction_history.get(i){
                    auction_history.push((i, data))
                }
            }
            auction_history
        }

        #[ink(message)]
        pub fn get_loan_history(&self) -> Vec<(u128, LoanResult)>{
            let count = self.loan_count;
            let mut loan_history: Vec<(u128, LoanResult)> = Vec::new();
            for i in 0..count{
                if let Some(data) = self.loan_history.get(i){
                    loan_history.push((i, data))
                }
            }
            loan_history
        }
    }
}