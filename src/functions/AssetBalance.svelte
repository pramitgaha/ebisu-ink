<script>
    import { contract, selectedAccount } from './../main';

    let balance;

    const getBalance = async () =>{
        const { result, output } = await contract.query.checkBalance(
            selectedAccount.address,
            { value: 0, gasLimit: -1, storageDepositLimit: null }
        )
        console.log(result.toHuman())
        if ( result.toHuman().Err){
            alert(`Failed to fetch balance: ${result.toHuman().Err.toString()}`)
                return
        }
        balance = parseInt(output.toHuman().replace(/,/g, ''))/ 1000000000000;
    }

    getBalance().then(() => console.log(balance))
</script>

<div>
        <h3>Your balance: {balance}</h3>
</div>

<style>
    div{
        text-align: center;
    }
</style>