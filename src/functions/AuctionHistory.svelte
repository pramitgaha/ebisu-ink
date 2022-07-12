<script>
import { contract, selectedAccount } from './../main.js';


    const getAuctionHistory = async () => {
        const list = [];
        const { result, output } = await contract.query.getAuctionHistory(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null },
        )
        if (result.toHuman().Err){
            alert(`Failed to get the list`)
            return
        }
        let data = output.toHuman()
        console.log(data)
        for (let i = 0; i < data.length; i++){
            if (data[i][1].acceptedData === null){
                let obj = {
                    auction_id: data[i][0],
                asked_by: data[i][1].createdBy,
                nft_contract: data[i][1].nftContract,
                id: data[i][1].tokenId,
                time: data[i][1].timeAsked,
                rate: data[i][1].rateAsked,
                accepted_data: null
                }
                list.push(obj)
            }else{
            let accepted_info = {
                lender: data[i][1].acceptedData.acceptedInvestor,
                amount: data[i][1].acceptedData.amount,
                rate: data[i][1].acceptedData.rate,
                time: data[i][1].acceptedData.time
            }
            let obj = {
                auction_id: data[i][0],
                asked_by: data[i][1].createdBy,
                nft_contract: data[i][1].nftContract,
                id: data[i][1].tokenId,
                time: data[i][1].timeAsked,
                rate: data[i][1].rateAsked,
                accepted: accepted_info
            }
            list.push(obj)
        }
        }
        console.log(list)
        return list
    }
    let auctionHistory = getAuctionHistory()
</script>

<list>
    {#await auctionHistory}
        <p>Loading....</p>
    {:then ResolvedHistory} 
        {#if ResolvedHistory.length === 0}
        <p>No auction finalized yet</p>
            {:else}
            {#each ResolvedHistory as auction}
            <div>
                {#if auction.accepted_data === null}
                    <p>Auction Id: {auction.auction_id}</p>
                    <p>Nft contract: {auction.nft_contract}, id: {auction.id}</p>
                    <p>Time: {auction.time} days Rate: {parseInt(auction.rate.replace(/,/g, ''))/ 100}%</p>
                    <p>status: Auction cancelled</p>
                {:else}
                <p>Auction Id: {auction.auction_id}</p>
                <p>Nft contract: {auction.nft_contract}, id: {auction.id}</p>
                <p>Time: {auction.time} Rate: {parseInt(auction.rate.replace(/,/g, ''))/ 100}%</p>
                <p>status: Offer accepted</p>
                <p>Investor address: {auction.accepted.lender}</p>
                <p>Amount accepted: {parseInt(auction.accepted.amount.replace(/,/g, ''))/ 1000000000000}</p>
                <p>Rate: {parseInt(auction.accepted.rate.replace(/,/g, ''))/ 100}%  Time: {auction.accepted.time} days</p>
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