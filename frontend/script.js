import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { CodePromise } from '@polkadot/api-contracts';

const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// const api = await ApiPromise.create();

// const code = new CodePromise(api, abi, wasm);
