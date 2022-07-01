<script>
    import { contract, selectedAccount, injector } from './../main';

    const PRECISION = 1000000000000;
    let nft_contract;
    let id;
    let amount_asked;
    let time_asked;
    let rate_asked;

    const createAuction = async () => {
        const { gasRequired, result, output } = await contract.query.createAuction(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null},
            nft_contract, id, amount_asked * PRECISION, time_asked, rate_asked * 100
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.createAuction(
                {gasLimit: gasRequired, value: 0, storageDepositLimit: null},
                nft_contract, id, amount_asked * PRECISION, time_asked, rate_asked * 100
            ).signAndSend(
                selectedAccount.address,
                { signer: injector.signer },
                (res) => {
                    if (res.status.isFinalized){
                        alert ("Tx successful")
                    }
                }
            )
            alert("Transaction successful")
        }
    }
</script>

<form on:submit|preventDefault={() => {createAuction()}}>
    <input type="text" placeholder="Nft contract address" bind:value={nft_contract}>
    <input type="number" placeholder="Token id" bind:value={id}>
    <input type="number" placeholder="Amount Asked" bind:value={amount_asked}>
    <input type="number" placeholder="Time asked in days" bind:value={time_asked}>
    <input type="number" placeholder="Rate asked" bind:value={rate_asked}>
    <button>Create Auction</button>
</form>