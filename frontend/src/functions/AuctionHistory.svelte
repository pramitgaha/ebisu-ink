<script>
    import { contract, selectedAccount } from './../main.js';

    let list;

    const getAuctionHistory = async () => {
        const { result, output } = await contract.query.getAuctionHistory(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null },
        )
        if (result.toHuman().Err){
            alert(`Failed to get the list`)
            return
        }
        list = output.toHuman()
    }
    getAuctionHistory()
</script>

<list>
    {#if list.length === 0}
        <h1>No auction yet</h1>
        {:else}
        {#each list as pastAuction}
            <div>
                {pastAuction}
            </div>
            {/each}
        {/if}
</list>