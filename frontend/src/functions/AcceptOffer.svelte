<script>
    import { contract, selectedAccount, injector } from './../main';

    export let auction_id;
    export let offer_index;
    const acceptOffer = async () => {
        const { gasRequired, result ,output } = await contract.query.acceptOffer(
            selectedAccount.address,
            { gasLimit: -1, storageDepositLimit: null, value: 0 },
            auction_id, offer_index
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
            }
            await contract.tx.acceptOffer(
                { gasLimit: gasRequired, storageDepositLimit: null, value: 0 },
                auction_id, offer_index
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

<button on:click={() => acceptOffer()}></button>