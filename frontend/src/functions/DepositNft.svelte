<script>
    import { contract, injector, selectedAccount } from "../main.js";

    let nft_contract;
    let id;

    const depositNft = async () =>{
            await contract.tx.depositNft({
                gasLimit: 107376485583,
                storageDepositLimit: null
            }, nft_contract, id).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                result => {
                    if (result.status.isFinalized){
                        console.log(result.toHuman());
                        alert('tx finalized');
                    }
                }
                );
            alert("deposit succeed")
    }
</script>

<form on:submit|preventDefault={() => {depositNft()}}>
    <input type="text" placeholder="Nft Contract Address" bind:value={nft_contract}>
    <input type="number" placeholder="Token Id" bind:value={id}>
    <button>Deposit Nft</button>
</form>