<script>
    import { contract, selectedAccount } from './../main';

    let balance;

    const getBalance = async () =>{
        const { result, output } = await contract.query.checkBalance(
            selectedAccount.address,
            { value: 0, gasLimit: -1, storageDepositLimit: null }
        )

        if ( result.toHuman().Err){
            alert(`Failed to fetch balance: ${result.toHuman().Err.toString()}`)
                return
        }
        balance = output.toHuman()
    }

    getBalance().then(() => console.log(balance))
</script>

<div>
    <h3>Your balance: {parseInt(balance.replace(/,/g, ''))/ 1000000000000}</h3>
</div>

<style>
    div{
        text-align: center;
    }
</style>