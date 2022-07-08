<script>
    import { contract, selectedAccount } from "../main.js";
    import AcceptOffer from './AcceptOffer.svelte';

    export let auction_id;
    export let by;
    const getBidList = async () => {
        const list = []
        const { result, output } = await contract.query.getBidList(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null },
            auction_id
        )
        if (result.toHuman().Err){
            alert(`Failed to fetched list: ${result.toHuman().Err.toString()}`)
            return
        }
        if (output.toHuman().Err){
            alert(`Failed to fetched list: ${output.toHuman().Err.toString()}`)
            return
        }
        console.log(output.toHuman().Ok)
        let data = output.toHuman().Ok
        for (let i = 0; i < data.length; i++){
            let obj = {
                offer_index: i,
                offered_by: data[i].by,
                amount_offered: data[i].amount,
                time: data[i].time,
                rate: data[i].rate
            }
            list.push(obj)
        }
        return list
    }
    let list = getBidList()
</script>

<list>
    {#await list}
        <p>Loading auction list</p>
    {:then ResolvedList} 
        {#if ResolvedList.length === 0}
        <p>No offer available</p>
        {:else}
        {#each ResolvedList as offer(offer.offer_index)}
        <div>
            <p>Offered by: {offer.offered_by}</p>
            <p>Amount offered: {offer.amount_offered}</p>
            <p>Time: {offer.time} Rate: {parseInt(offer.rate.replace(/,/g, ''))/ 100}%</p>
            {#if selectedAccount.address === by}
            <AcceptOffer auction_id={Number(auction_id)}, offer_index={offer.offer_index} />
            {/if}
            </div>
            <hr>
        {/each}
        {/if}
    {/await}
</list>

<style>
    list{
        text-align: center;
    }
</style>