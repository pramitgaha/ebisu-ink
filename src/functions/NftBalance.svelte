<script>
    import { add_resize_listener } from "svelte/internal";
import { contract, selectedAccount } from "./../main";
    import WithdrawNft from './WithdrawNft.svelte';
  
    const getNftBalance = async () => {
      const balance = [];
      const { result, output } = await contract.query.nftBalance(
        selectedAccount.address,
        { gasLimit: -1, value: 0, storageDepositLimit: null }
      );
  
      if (result.toHuman().Err) {
        alert(`Failed to fetch nft balance: ${result.toHuman().Err.toString()}`);
        return;
      }
  
      let res = output.toHuman();
  
      for (let i = 0; i < res.length; i++) {
        let data = {
          address: res[i][0],
          id: res[i][1],
        };
  
        balance.push(data);
      }
  
      return balance;
    };
  
    let balancePromise = getNftBalance();
  </script>
  
  <div>
  {#await balancePromise}
    <p>Loading balance...</p>
  {:then resolvedBalancePromise}
    {#if resolvedBalancePromise.length === 0}
      <h1>No nft deposited</h1>
    {:else}
      {#each resolvedBalancePromise as nft (nft.address, nft.id)}
        <p>address: {nft.address}, id: {nft.id} <WithdrawNft nft_contract={nft.address} id={nft.id} /></p>
      {/each}
    {/if}
  {/await}
</div>

<style>
    div{
        text-align: center;
    }
</style>