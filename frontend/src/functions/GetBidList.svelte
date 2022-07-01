<script>
    import { contract, selectedAccount } from "../main.js";
    export let auction_id;
    let list;
    const getBidList = async () => {
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
        list = output.toHuman().Ok
    }
    getBidList()
</script>

<list>
    {#if list.length === 0}
        <h2>No offer</h2>
        {:else}
        {#each list as bid(bid[0])}
            <p>{bid}</p>
            {/each}
        {/if}
</list>