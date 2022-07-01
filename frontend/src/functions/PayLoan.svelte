<script>
    import { contract, selectedAccount, injector } from './../main.js';

    export let loan_id;
    const PRECISION = 1000000000000;
    export let amount;

    const payLoan = async() => {
        const {gasRequired, result, output} = await contract.query.payLoan(
            selectedAccount.address,
            {gasLimit: -1, storageDepositLimit: null, value: amount * PRECISION},
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
            await contract.tx.payLoan(
                { gasLimit: gasRequired, value: amount * PRECISION, storageDepositLimit: null },
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
            alert("Loan paid")
        }
    }
</script>

<button on:click={() => {payLoan()}}>Pay Loan</button>