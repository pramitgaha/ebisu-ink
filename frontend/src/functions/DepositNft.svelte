<script>
    import { contract, injector, selectedAccount, NFT_CONTRACT_ABI, api, CONTRACT_ADDRESS } from './../main';
    import { ContractPromise } from "@polkadot/api-contract";

    let nft_contract_address;
    let id;
    const depositNft = async () => {
        let nft_contract = new ContractPromise(api, NFT_CONTRACT_ABI, nft_contract_address);

        //calling approve function of nft
        const { gasRequired, result, output } = await nft_contract.query["PSP34::approve"](
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null},
            CONTRACT_ADDRESS, { U32: id }, true
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await nft_contract.tx.approve(
                { gasLimit: gasRequired, value: 0, storageDepositLimit: null },
                CONTRACT_ADDRESS, { U32: id }, true
            ).signAndSend(
                selectedAccount.address,
                { signer: injector.signer },
                async (res) => {
                    if (res.status.isFinalized){
                        alert("Tx submitted")
                    }
                }
            )
            alert("Approval successful")
        }
    }
</script>

<form on:submit|preventDefault={() => {depositNft()}}>
    <input type="text" placeholder="Nft Contract Address" bind:value={nft_contract_address}>
    <input type="number" placeholder="Token Id" bind:value={id}>
    <button>Deposit Nft</button>
</form>