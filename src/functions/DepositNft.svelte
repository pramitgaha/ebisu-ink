<script>
    import { contract, injector, selectedAccount, NFT_CONTRACT_ABI, api, CONTRACT_ADDRESS } from './../main';
    import { ContractPromise } from "@polkadot/api-contract";

    let nft_contract_address;
    let id;
    const approvalNft = async () => {
        let nft_contract = new ContractPromise(api, NFT_CONTRACT_ABI, nft_contract_address);

        //calling approve function of nft
        const {gasRequired, result, output} = await nft_contract.query["psp34::approve"](
            selectedAccount.address,
            {gasLimit: -1, storageDepositLimit: null},
            CONTRACT_ADDRESS, {u32: id}, true
        );
        if (result.toHuman().Err) {
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }
        if (output.toHuman().Err) {
            alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
            return
        }
        await nft_contract.tx["psp34::approve"](
            {gasLimit: gasRequired, value: 0, storageDepositLimit: null},
            CONTRACT_ADDRESS, {u32: id}, true
        ).signAndSend(
            selectedAccount.address,
            {signer: injector.signer},
            async (res) => {
                if (res.status.isFinalized) {
                    console.log("Tx submitted")
                }
            }
        )
    }
    const depositNft =  async () => {
            const {gasRequired, result, output} = await contract.query.depositNft(
                selectedAccount.address,
                {gasLimit: -1, value: 0, storageDepositLimit: null},
                nft_contract_address, id
            )
            if (result.toHuman().Err) {
                alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
                return
            }
            if (output.toHuman().Err) {
                alert(`line:47 Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.depositNft(
                {value: 0, gasLimit: gasRequired, storageDepositLimit: null},
                nft_contract_address, id
            ).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized) {
                        console.log("tx submitted")
                    }
                }
            )
            alert("Deposit successful")
        }
        const doAll = async () => {
            await approvalNft().then( async () => await depositNft())
        }
</script>

<form on:submit|preventDefault={() => {doAll()}}>
    <input type="text" placeholder="Nft Contract Address" bind:value={nft_contract_address}>
    <input type="number" placeholder="Token Id" bind:value={id}>
    <button>Deposit Nft</button>
</form>

<style>
    form{
        text-align: center;
    }
</style>