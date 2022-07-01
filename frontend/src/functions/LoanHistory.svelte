<script>
    import { contract, selectedAccount } from './../main.js';

    let list;

    const getLoanHistory = async () => {
        const { result, output } = await contract.query.getLoanHistory(
            selectedAccount.address,
            { gaLimit: -1, storageDepositLimit: null }
        )
        if (result.toHuman().Err){
            alert(`Failed to fetch history: ${result.toHuman().Err.toString()}`)
            return
        }
        list = output.toHuman();
    }
    getLoanHistory()
</script>

