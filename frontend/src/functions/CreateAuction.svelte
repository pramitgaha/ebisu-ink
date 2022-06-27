<!-- <script>
    import { contract, selectedAccount, injector } from './../main';

    let nft_contract;
    let id;
    let amount_asked;
    let time_asked;
    let rate_asked;

    const createAuction = async () => {
        await contract.tx.createAuction({
            storageDepositLimit: null,
            value: 0,
            gasLimit: 74999922688
        }, nft_contract, id, amount_asked, time_asked, rate_asked * 100).signAndSend(
            selectedAccount.address,
            { signer: injector.signer },

        )
    }
</script>

<form on:submit|preventDefault={() => {createAuction}}>
    <input type="text" placeholder="Nft contract address" bind:value={}>
</form> -->