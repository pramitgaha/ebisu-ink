<script>
    import { contract, selectedAccount } from './../main.js'
    import { Link } from "svelte-routing";
    import { auctionInfo } from './../stores';

    const getList = async () => {
        const list = []
        const {result, output} = await contract.query.getAuctionList(
            selectedAccount.address, { gasLimit: -1, storageDepositLimit: null }
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }
        let data = output.toHuman()
        console.log(data[0])
        for (let i = 0; i < data.length; i++){
            let obj = {
                auction_id: data[i].at(0),
                by: data[i][1].by,
                nft_contract: data[i][1].nftContract,
                id: data[i][1].id,
                amount_asked: data[i][1].amountAsked,
                rate_asked: data[i][1].rateAsked,
                time_asked: data[i][1].timeAsked
            }
            list.push(obj)
        }
        return list
    }
    let auctionList = getList()

    const updateStore = (obj) => {
        console.log(obj)
        auctionInfo.set(obj)
    }
</script>

<list>
    {#await auctionList}
        <p>loading auction list</p>
    {:then resolvedGetList} 
        {#if resolvedGetList.length === 0}
        <p>No auction started yet</p>
        {:else}
        {#each resolvedGetList as auction}
        <div>
            <p>Auction Id: {auction.auction_id}</p>
            <p>Asked by: {auction.by}</p>
            <p>Nft contract address: {auction.nft_contract} Id: {auction.id}</p>
            <p>Amount asked: {auction.amount_asked}</p>
            <p>Rate Asked: {auction.rate_asked/ 100}%</p>
            <p>time asked: {auction.time_asked} days</p>
            <Link to="auction/{auction.auction_id}"><button on:click={() => {updateStore(auction)}}>See More...</button></Link>
        </div>
        {/each}
        {/if}
    {/await}
</list>

<style>
    list{
        background-color: aqua;
        text-align: center;
    }
</style>