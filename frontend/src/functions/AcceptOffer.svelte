<script>
    import { contract, selectedAccount, injector } from './../main';

    export let auction_id;
    export let offer_index;
    const acceptOffer = async () => {
        await contract.tx.acceptOffer({
            storageDepositLimit: null,
        }, auction_id, offer_index).signAndSend(
            selectedAccount.address,
            {signer: injector.signer}
        )
    }
</script>

<button on:click={acceptOffer}></button>