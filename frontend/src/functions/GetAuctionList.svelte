<script>
    import { contract, selectedAccount } from './../main.js'
    let list;

    const getList = async () =>{
        await contract.query.getAuctionList(selectedAccount.address, {gasLimit: -1, storageDepositLimit: null,}).
            then((res) =>{
                if (res.result.status.isFinalized){
                    alert('successful')
                }
            list = res.output.toJson()
        },)
        console.log(list)
    }

</script>

<button on:click={getList()}>show</button>