<script>
    import {selectedAccount, contract, injector} from "../main.js";
    let value;
    const PRECISION = 1000000000000;

    const depositAsset = async () => {
        try {
            await contract.tx.depositAsset({
                value: value * PRECISION,
                gasLimit: 74999922688,
                storageDepositLimit: null
            }).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized) {
                        alert("deposit successful")
                    }
                }
            )
            alert("transaction successful")
        } catch (err){
            alert("Transaction failed");
        }
    }
</script>

<form on:submit|preventDefault={() => {depositAsset()}}>
    <input type="number" placeholder="Amount" bind:value={value}>
    <button>Deposit</button>
</form>