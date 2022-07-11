<script>
    import { loanInfo } from './../stores';
import { Link } from 'svelte-routing';
import { contract, selectedAccount } from './../main';


    const getLoanList = async () => {
        const list = []
        const { result, output } = await contract.query.getLoanList(selectedAccount.address,
        { gasLimit: -1, storageDepositLimit: null, value: 0 }
        )
        if (result.toHuman().Err){
            alert(`Failed to fetch history: ${result.toHuman().Err.toString()}`)
            return
        }
        let data = output.toHuman();
        for (let i = 0; i < data.length; i++){
            let obj = {
                loan_id: data[i][0],
                amount_borrowed: parseInt(data[i][1].amountBorrowed.replace(/,/g, ''))/ 1000000000000,
                amount_to_be_paid: parseInt(data[i][1].amountToBePaid.replace(/,/g, ''))/ 1000000000000,
                borrowed_by: data[i][1].borrowedBy,
                lent_by: data[i][1].lentBy,
                loan_started_on: data[i][1].loanStartedOn,
                loan_ends_on: data[i][1].loanEndsOn,
                rate: data[i][1].rate,
                time: data[i][1].time,
            }
            list.push(obj)
        }
        return list
    }
    let getList = getLoanList()

    const updateStore = (obj) =>{
        loanInfo.set(obj)
    }
</script>

<loanlist>
    {#await getList}
        <p>loading loans.....</p>
    {:then ResolvedGetList} 
        {#if ResolvedGetList.length === 0}
        <p>No loan started yet</p>
            {:else}
            {#each ResolvedGetList as loan(loan.loan_id)}
            <div>
                <p>Loan id: {loan.loan_id}</p>
                <p>borrowed_by: {loan.borrowed_by}</p>
                <p>Amount borrowed: {loan.amount_borrowed}</p>
                <p>Amount to be paid: {loan.amount_to_be_paid}</p>
                <p>Lent by: {loan.lent_by}</p>
                <p>rate: {parseInt(loan.rate.replace(/,/g, ''))/ 100}%</p>
                <p>Time: {loan.time} days</p>
                <Link to="loan/{loan.loan_id}"><button on:click={() => updateStore(loan)}>See more...</button></Link>
                </div>
            {/each}
        {/if}
    {/await}
</loanlist>

<style>
    loanlist{
        text-align: center;
    }
</style>