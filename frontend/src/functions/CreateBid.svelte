<script>
    import {contract, selectedAccount, injector } from "../main.js";

    export let auction_id;
    let amount;
    let time;
    let rate;

    const createBid = async () => {
        try {
            await contract.tx.createBid({
                value: 0,
                gasLimit: 74999922688,
                storageDepositLimit: null,
            }, auction_id, amount, time, rate * 100).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized){
                        alert("Tx successful")
                    }
                }
            )
            alert("Deposit successful")
        }catch (err){
            alert("Failed to make a bid")
        }
    }
</script>

<form on:submit={() => {createBid()}}>
    <input type="number" placeholder="Bid amount" bind:value={amount}>
    <input type="number" placeholder="Lent time in days" bind:value={time}>
    <input type="number" placeholder="interest rate" bind:value={rate}>
    <submit>Create Bid</submit>
</form>