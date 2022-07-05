<script>
    import CreateAuction from './../functions/CreateAuction.svelte';
    import GetAuctionList from './../functions/GetAuctionList.svelte';
    let createAuction = false;
</script>
<auction>
    <hr>
    <div>
    <button on:click={() => {createAuction === true? createAuction = false: createAuction= true}}>Create auction</button>
    {#if createAuction}
        <CreateAuction />
    {/if}
</div>
    <GetAuctionList />
</auction>

<style>
    auction{
        text-align: center;
    }
</style>