<script>
    import { contract, selectedAccount, injector } from "../main.js";

    export let nft_contract;
    export let id;

    const withdrawNft = async () =>{
        const { gasRequired, result, output } = await contract.query.withdrawNft(
            { gasLimit: -1, value: 0, storageDepositLimit: null },
            nft_contract, id
        );
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
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
                        alert("tx submitted")
                    }
                }
            )
            alert("Withdraw successful")
        }
    }
</script>

<button on:click={() => {withdrawNft()}}>Withdraw Nft</button>