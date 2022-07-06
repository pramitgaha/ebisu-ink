<script>
    import AssetBalance from './../functions/AssetBalance.svelte'
    import DepositAsset from './../functions/DepositAsset.svelte';
    import WithdrawAsset from './../functions/WithdrawAsset.svelte';
    import NftBalance from './../functions/NftBalance.svelte'
    import DepositNft from './../functions/DepositNft.svelte';
</script>

<vault>
    <AssetBalance />
    <DepositAsset />
    <WithdrawAsset />
    <NftBalance />
    <DepositNft />
</vault>