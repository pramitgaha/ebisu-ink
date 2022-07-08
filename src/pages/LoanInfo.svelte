<script>
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
        <p>borrowed_by: {data.borrowed_by}</p>
        <p>Amount borrowed: {parseInt(data.amount_borrowed.replace(/,/g, ''))/ 1000000000000}</p>
        <p>Amount to be paid: {parseInt(data.amount_to_be_paid.replace(/,/g, ''))/ 1000000000000}</p>
        <p>Lent by: {data.lent_by}</p>
        <p>rate: {parseInt(data.rate.replace(/,/g, ''))/ 100}%</p>
        <p>Time: {data.time} days</p>
    <PayLoan loan_id={data.loan_id}, amount={data.amount_to_be_paid}/>
    <GetCollateral loan_id={data.loan_id}/>
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