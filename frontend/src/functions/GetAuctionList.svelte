<script>
    import { contract, selectedAccount } from './../main.js'
    let list;

    const getList = async () =>{
        await contract.query.getAuctionList(selectedAccount.address, {gasLimit: -1, storageDepositLimit: null,}).
            then(
                (res) => {
                    if (res.result.asOk){
                        list = res.output.toJSON()
                    }
                }
            ).catch((err) =>{
                alert(err)
            })
    }

</script>

<button on:load={getList()}>show</button>