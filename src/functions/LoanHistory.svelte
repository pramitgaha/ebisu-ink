<script> 
    import { contract, selectedAccount } from './../main.js';


    const getLoanHistory = async () => {
        const history = []
        const { result, output } = await contract.query.getLoanHistory(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null }
        )
        if (result.toHuman().Err){
            alert(`Failed to fetch history: ${result.toHuman().Err.toString()}`)
            return
        }
        let list = output.toHuman();
        console.log(list)
        for (let i = 0; i < list.length; i++){
                let obj = {
                loan_id: list[i][0],
                amount_borrowed: list[i][1].amountBorrowed,
                amount_paid: list[i][1].amountPaid,
                borrowed_by: list[i][1].borrowedBy,
                collateral_withdrawal: list[i][1].collateralWithdrawal,
                lent_by: list[i][1].lentBy,
                rate: list[i][1].rate,
                time: list[i][1].time
            }
            history.push(obj)   
        }
        return history
    }
    let history = getLoanHistory()
</script>

<list>
    {#await history}
        <p>Loading loan history</p>
    {:then ResolvedHistory} 
        {#if ResolvedHistory.length === 0}
            <p>No loan history</p>
            {:else}
            {#each ResolvedHistory as loan}
            <div>
                {#if loan.collateral_withdrawal === false}
                    <p>Loan id: {loan.loan_id}</p>
                    <p>Borrowed by: {loan.borrowed_by}</p>
                    <p>Lent by: {loan.lent_by}</p>
                    <p>Amount borrowed: {parseInt(loan.amount_borrowed.replace(/,/g, ''))/ 1000000000000}</p>
                    <p>Amount paid: {parseInt(loan.amount_paid.replace(/,/g, ''))/ 1000000000000}</p>
                    <p>Rate: {parseInt(loan.rate.replace(/,/g, ''))} Time: {loan.time} days</p>
                    <p>Status: Loan Paid</p>
                {:else}
                <p>Loan id: {loan.loan_id}</p>
                    <p>Borrowed by: {loan.borrowed_by}</p>
                    <p>Lent by: {loan.lent_by}</p>
                    <p>Amount borrowed: {parseInt(loan.amount_borrowed.replace(/,/g, ''))/ 1000000000000}</p>
                    <p>Rate: {parseInt(loan.rate.replace(/,/g, ''))} Time: {loan.time} days</p>
                    <p>Status: Borrower failed to pay the loan</p>
                {/if}
            </div>
            {/each}
        {/if}
    {/await}
</list>

<style>
    list{
        text-align: center;
    }
</style>