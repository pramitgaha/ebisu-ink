<script>
    import { contract, selectedAccount, injector } from './../main';

    export let auction_id;
    const CANCELLATION_FEE = 1000000000000;
    const cancelAuction = async () =>{
        const { gasRequired, result, output } = await contract.query.cancelAuction(
            selectedAccount.address,
            { value: CANCELLATION_FEE, gasLimit: -1, storageDepositLimit: null },
            auction_id
        )
        if (result.toHuman().Err){
            alert(`Transaction failed: ${result.toHuman().Err.toString()}`)
            return
        }else{
            if (output.toHuman().Err){
                alert(`Transaction failed: ${output.toHuman().Err.toString()}`)
                return
            }
            await contract.tx.cancelAuction({
                value: CANCELLATION_FEE,
                storageDepositLimit: null,
                gasLimit: gasRequired
            }, auction_id).signAndSend(
                selectedAccount.address,
                {signer: injector.signer},
                (res) => {
                    if (res.status.isFinalized){
                        console.log("Tx submitted")
                    }
                }
            )
            alert("Auction cancelled")
        }

    }
</script>

<cancel>
<button on:click|preventDefault={() => {cancelAuction()}}>Cancel Auction</button>
</cancel>

<style>
    cancel{
        text-align: center;
    }
</style>