<script>
    import { contract, injector, selectedAccount } from "../main.js";
    let amount;
    const PRECISION = 1000000000000;

    const withdrawAsset = async () => {
        const { gasRequired, result, output } = await contract.query.withdrawAsset(
            selectedAccount.address,
            { gasLimit: -1, value: 0, storageDepositLimit: null},
            amount * PRECISION
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.withdrawAsset(
                { storageDepositLimit: null, gasLimit: gasRequired },
                amount * PRECISION).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized) {
                        alert("tx submitted")
                    }
                })
            alert("Withdraw successful")
        }
    }
</script>

<form on:submit|preventDefault={() => {withdrawAsset()}}>
    <input type="number" placeholder="amount to withdraw" bind:value={amount}>
    <button>withdraw</button>
</form>