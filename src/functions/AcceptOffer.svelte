<script>
    import { contract, selectedAccount, injector } from './../main';

    export let auction_id;
    export let offer_index;
    const acceptOffer = async () => {
        console.log(auction_id, Number(offer_index))
        const { gasRequired, result ,output } = await contract.query.acceptOrder(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null, value: 0 },
            parseInt(auction_id), offer_index
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
            }
            await contract.tx.acceptOrder(
                { gasLimit: gasRequired, storageDepositLimit: null, value: 0 },
                parseInt(auction_id), offer_index
            ).signAndSend(
                selectedAccount.address,
                { signer: injector.signer },
                (res) => {
                    if (res.status.isFinalized){
                        alert("tx submitted")
                    }
                }
            )
            alert("Offer Accepted")
        }
    }
</script>

<accept>
<button on:click={() => acceptOffer()}>Accept this Offer</button>
</accept>