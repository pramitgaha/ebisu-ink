<script>
    import { selectedAccount } from './../main';
    import { loanInfo } from './../stores';
    import PayLoan from './../functions/PayLoan.svelte';
    import GetCollateral from './../functions/GetCollateral.svelte';

    let data;
    loanInfo.subscribe(obj => data = obj)
</script>

<loaninfo>
    <hr>
    <div>
        <p>Loan id: {data.loan_id}</p>
        <p>Borrowed by: {data.borrowed_by}</p>
        <p>Amount borrowed: {data.amount_borrowed}</p>
        <p>Amount to be paid: {data.amount_to_be_paid}</p>
        <p>Lent by: {data.lent_by}</p>
        <p>rate: {parseInt(data.rate.replace(/,/g, ''))/ 100}%</p>
        <p>Time: {data.time} days</p>
        {#if selectedAccount.address === data.borrowed_by}
    <PayLoan loan_id={data.loan_id}, amount={data.amount_to_be_paid}/>
    {:else}
    <GetCollateral loan_id={data.loan_id}/>
    {/if}
</div>
<hr>
</loaninfo>

<style>
    loaninfo{
        text-align: center;
    }
    loaninfo div{
        background-color: navajowhite;
    }
</style>