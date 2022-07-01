<script>
    import { contract, selectedAccount } from './../main.js'
    let list;

    const getList = async () => {
        const {result, output} = await contract.query.getAuctionList(
            selectedAccount.address, {gasLimit: -1, storageDepositLimit: null}
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }
        list = output.toHuman();
    }
    getList()
</script>

<list>
    <!--{#if list.length === 0}-->
    <!--    <p>No auction started yet</p>-->
    <!--    {:else}-->
    <!--    {#each list as auction(auction[0])}-->
    <!--        -->
    <!--    {/if}-->
</list>