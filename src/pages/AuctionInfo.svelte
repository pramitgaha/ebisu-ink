<script>
    import { auctionInfo } from './../stores';
    import CreateBid from './../functions/CreateBid.svelte';
    import GetBidList from './../functions/GetBidList.svelte';
    import CancelAuction from './../functions/CancelAuction.svelte';
import { selectedAccount } from './../main';

    let data;
    let show_bid_function = false
    auctionInfo.subscribe((obj) => data = obj)
</script>

<auctioninfo>
    <div>
        <p>Auction Id: {data.auction_id}</p>
        <p>Asked by: {data.by}</p>
        <p>Nft contract address: {data.nft_contract} Id: {data.id}</p>
        <p>Amount asked: {parseInt(data.amount_asked.replace(/,/g, ''))/ 1000000000000}</p>
        <p>Rate Asked: {parseInt(data.rate_asked.replace(/,/g, ''))}</p>
        <p>time asked: {data.time_asked}</p>
        {#if selectedAccount.address === data.by}
            <CancelAuction auction_id={data.auction_id}/>
            {/if}
            {#if selectedAccount.address != data.by}
            <button on:click={() => {
                show_bid_function === true? show_bid_function = false: show_bid_function = true
            }}>Make a bid</button>
            {#if show_bid_function}
            <CreateBid auction_id={data.auction_id}/>
            {/if}
            {/if}
</div>
    <div>
        <GetBidList auction_id={data.auction_id} by={data.by}/>
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