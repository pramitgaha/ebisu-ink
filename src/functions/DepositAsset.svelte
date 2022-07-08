<script>
    import {selectedAccount, contract, injector} from "../main.js";
    let value;
    const PRECISION = 1000000000000;

    const depositAsset = async () => {
        const { gasRequired, result, output } = await contract.query.depositAsset(
            selectedAccount.address,
            { value: value * PRECISION, gasLimit: -1, storageDepositLimit: null }
        );
        if (result.toHuman().Err){
            alert(`transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.depositAsset({
                value: value * PRECISION,
                gasLimit: gasRequired,
                storageDepositLimit: null
            }).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized) {
                        console.log("Tx submitted")
                    }
                }
            )
            alert("Deposit successful")
        }
    }
</script>

<form on:submit|preventDefault={() => {depositAsset()}}>
    <input type="number" placeholder="Amount" bind:value={value} step="0.000000000001">
    <button>Deposit</button>
</form>

<style>
    form{
        text-align: center;
    }
</style>