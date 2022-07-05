<script>
    import {contract, selectedAccount, injector } from "../main.js";

    export let auction_id;
    const PRECISION = 1000000000000;
    let amount;
    let time;
    let rate;

    const createBid = async () => {
        const { gasRequired, result, output } = await contract.query.createBid(
            selectedAccount.address,
            { value: 0, gasLimit: -1, storageDepositLimit: null },
            auction_id, amount * PRECISION, time, rate * 100
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.createBid({
                value: 0,
                gasLimit: gasRequired,
                storageDepositLimit: null,
            }, auction_id, amount, time, rate * 100).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized){
                        alert("Tx submitted")
                    }
                }
            )
            alert("Offer created")
        }
    }
</script>

<form on:submit={() => {createBid()}}>
    <input type="number" placeholder="Bid amount" bind:value={amount}>
    <input type="number" placeholder="Lent time in days" bind:value={time}>
    <input type="number" placeholder="interest rate" bind:value={rate}>
    <button>Create Bid</button>
</form>

<style>
    form{
        text-align: center;
    }
</style>