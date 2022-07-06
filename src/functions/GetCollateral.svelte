<script>
    import { contract, selectedAccount, injector } from "../main.js";

    export let loan_id;
    const CANCELLATION_FEE = 1000000000000;
    const getCollateral = async () => {
        const { gasRequired, result, output } = await contract.query.getCollateral(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null, value: CANCELLATION_FEE },
            loan_id
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.getCollateral(
                { value: CANCELLATION_FEE, gasLimit: gasRequired, storageDepositLimit: null },
                loan_id
            ).signAndSend(
                selectedAccount.address,
                { signer: injector.signer },
                (res) => {
                    if (res.status.isFinalized){
                        alert("tx submitted")
                    }
                }
            )
            alert("Collateral withdrawal")
        }
    }
</script>

<button on:click|preventDefault={() => {getCollateral()}}>Get collateral</button>