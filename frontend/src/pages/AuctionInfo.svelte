<script>
    import { auctionInfo } from './../stores';
    import CreateBid from './../functions/CreateBid.svelte';
    import GetBidList from './../functions/GetBidList.svelte';
    import CancelAuction from './../functions/CancelAuction.svelte';

    let data;
    let show_bid_function = false
    auctionInfo.subscribe((obj) => data = obj)
</script>

<auctioninfo>
    <div>
        <p>Auction Id: {data.auction_id}</p>
        <p>Asked by: {data.by}</p>
        <p>Nft contract address: {data.nft_contract} Id: {data.id}</p>
        <p>Amount asked: {data.amount_asked}</p>
        <p>Rate Asked: {parseInt(data.rate_asked.replace(/,/g, ''))}</p>
        <p>time asked: {data.time_asked}</p>
    </div>
    <div>
    <CancelAuction auction_id={data.auction_id}/>
    </div>
    <div>
    <button on:click={() => {
        show_bid_function === true? show_bid_function = false: show_bid_function = true
    }}>Make a bid</button>
    {#if show_bid_function}
    <CreateBid auction_id={data.id}/>
    {/if}
</div>
    <div>
        <GetBidList auction_id={data.auction_id}/>
    </div>
</auctioninfo>

<style>
    auctioninfo{
        text-align: center;
    }
    auctioninfo div{
        background-color: yellow;
    }
</style>