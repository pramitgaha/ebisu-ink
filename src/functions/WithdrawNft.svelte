<script>
    import { contract, selectedAccount, injector } from "../main.js";

    export let nft_contract;
    export let id;
    const withdrawNft = async () =>{
        console.log(nft_contract, id)
        const { gasRequired, result, output } = await contract.query.withdrawNft(
            selectedAccount.address,
            { gasLimit: -1, value: 0, storageDepositLimit: null },
            nft_contract, id
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }
        if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
        }
        await contract.tx.withdrawNft({
                storageDepositLimit: null,
                gasLimit: gasRequired
            }, nft_contract, id).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized){
                        console.log("Tx submitted")
                    }
                }
            )
            alert("withdraw successful")
    }
</script>

<button on:click|preventDefault={() => {withdrawNft()}}>Withdraw Nft</button>