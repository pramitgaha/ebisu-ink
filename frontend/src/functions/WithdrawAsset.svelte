<script>
    import { contract, injector, selectedAccount } from "../main.js";
    let amount;
    const PRECISION = 1000000000000;

    const withdrawAsset = async () => {
        try {
            await contract.tx.withdrawAsset({
                storageDepositLimit: null,
                gasLimit: 74999922688,
            }, amount * PRECISION).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized) {
                        alert("withdraw successful")
                    }
                })
            alert("Withdraw successful")
    }catch (err) {
            alert("Withdraw failed")
        }
    }
</script>

<form on:submit|preventDefault={() => {withdrawAsset()}}>
    <input type="number" placeholder="amount to withdraw" bind:value={amount}>
    <button>withdraw</button>
</form>