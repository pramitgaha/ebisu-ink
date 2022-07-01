import App from './App.svelte'
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";

const CONTRACT_ABI = {
  "source": {
    "hash": "0x35dfcc5f554dfbc0e8520cc7ff6d3b4509478c9d366654aa1e6ca13fc075fefa",
    "language": "ink! 3.2.0",
    "compiler": "rustc 1.64.0-nightly"
  },
  "contract": {
    "name": "ebisu",
    "version": "0.1.0",
    "authors": [
      "[Pramit Gaha] <[pramitgaha21@gmail.com]>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "fee",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            },
            {
              "label": "auction_cancellation_fee",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "label": "loan_default_fee",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "init",
          "payable": false,
          "selector": "0x44d6441f"
        }
      ],
      "docs": [],
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "old_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "OwnerChanged"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "old_fee",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "new_fee",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "FeeChanged"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "deposit_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "new_balance",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "AssetDeposited"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "withdrawn_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "new_balance",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "AssetWithdrawal"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "deposit_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "token_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "NftDeposit"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "withdrawn_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "token_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "NftWithdrawal"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "created_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "token_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount_asked",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "time_asked",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "rate_asked",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "AuctionCreated"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "bid_index",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "bid_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "rate",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "BidCreated"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "lent_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "borrowed_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "token_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount_borrowed",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount_to_be_paid",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "loan_started_on",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "loan_ends_on",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "rate",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "OrderAccepted"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "cancelled_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "AuctionCancelled"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "paid_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "LoanPaid"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "withdrawn_by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "token_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "CollateralWithdrawal"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "change_owner",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x015eeeaf"
        },
        {
          "args": [],
          "docs": [],
          "label": "current_owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 0
          },
          "selector": "0x9d2b2e75"
        },
        {
          "args": [
            {
              "label": "new_fee",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "change_fee",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x4882700b"
        },
        {
          "args": [],
          "docs": [],
          "label": "deposit_asset",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x97a1ec55"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "withdraw_asset",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x2f4c07de"
        },
        {
          "args": [],
          "docs": [],
          "label": "check_balance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 4
          },
          "selector": "0x4e5446be"
        },
        {
          "args": [
            {
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "deposit_nft",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x420e0f3f"
        },
        {
          "args": [
            {
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "withdraw_nft",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x018d1025"
        },
        {
          "args": [],
          "docs": [],
          "label": "nft_balance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 10
          },
          "selector": "0xba7466ba"
        },
        {
          "args": [
            {
              "label": "nft_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            },
            {
              "label": "amount_asked",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "label": "time_asked",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "label": "rate_asked",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "create_auction",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0xd6cd59d7"
        },
        {
          "args": [],
          "docs": [],
          "label": "get_auction_list",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 32
          },
          "selector": "0xa11bd706"
        },
        {
          "args": [
            {
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 4
              }
            },
            {
              "label": "time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 13
              }
            },
            {
              "label": "rate",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "create_bid",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x2c5108ec"
        },
        {
          "args": [
            {
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "get_bid_list",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 34
          },
          "selector": "0x265f6cb2"
        },
        {
          "args": [
            {
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            },
            {
              "label": "index",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "accept_order",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0xfd20fce8"
        },
        {
          "args": [
            {
              "label": "auction_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "cancel_auction",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0x64e3bd76"
        },
        {
          "args": [],
          "docs": [],
          "label": "get_loan_list",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 35
          },
          "selector": "0x4e072e52"
        },
        {
          "args": [
            {
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "get_loan_data",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 37
          },
          "selector": "0x76abdcec"
        },
        {
          "args": [
            {
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "pay_loan",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0xe36ebe8c"
        },
        {
          "args": [
            {
              "label": "loan_id",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "get_collateral",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 29
          },
          "selector": "0xf48343ad"
        },
        {
          "args": [],
          "docs": [],
          "label": "get_auction_history",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 38
          },
          "selector": "0x541809ed"
        },
        {
          "args": [],
          "docs": [],
          "label": "get_loan_history",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 40
          },
          "selector": "0x27099a94"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "owner"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "fee"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 4
              }
            },
            "name": "loan_default_fee"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 4
              }
            },
            "name": "auction_cancellation_fee"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 4
              }
            },
            "name": "auction_count"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                "ty": 4
              }
            },
            "name": "loan_count"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                "ty": 5
              }
            },
            "name": "auction_nft_vault"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "asset_vault"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                "ty": 9
              }
            },
            "name": "nft_vault"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                "ty": 11
              }
            },
            "name": "auction_details"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                "ty": 14
              }
            },
            "name": "bid_details"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                "ty": 17
              }
            },
            "name": "loan_details"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                "ty": 19
              }
            },
            "name": "collateral_vault"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0d00000000000000000000000000000000000000000000000000000000000000",
                "ty": 21
              }
            },
            "name": "auction_history"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0e00000000000000000000000000000000000000000000000000000000000000",
                "ty": 25
              }
            },
            "name": "loan_history"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 2
            }
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 6
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "tuple": [
              0,
              3
            ]
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 0
            },
            {
              "name": "V",
              "type": 4
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 0
            },
            {
              "name": "V",
              "type": 10
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "sequence": {
              "type": 6
            }
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 12
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "nft_contract",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "id",
                  "type": 3,
                  "typeName": "u32"
                },
                {
                  "name": "amount_asked",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "time_asked",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate_asked",
                  "type": 3,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "AuctionData"
          ]
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 15
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "sequence": {
              "type": 16
            }
          }
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "amount",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "time",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate",
                  "type": 3,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "BidData"
          ]
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 18
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "lent_by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "borrowed_by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "nft_contract",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "id",
                  "type": 3,
                  "typeName": "u32"
                },
                {
                  "name": "amount_borrowed",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "amount_to_be_paid",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "loan_started_on",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "loan_ends_on",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "time",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate",
                  "type": 3,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "LoanData"
          ]
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 6
            },
            {
              "name": "V",
              "type": 20
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "tuple": [
              0,
              0
            ]
          }
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 22
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "created_by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "nft_contract",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "token_id",
                  "type": 3,
                  "typeName": "u32"
                },
                {
                  "name": "amount_asked",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "time_asked",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate_asked",
                  "type": 3,
                  "typeName": "u32"
                },
                {
                  "name": "accepted_data",
                  "type": 23,
                  "typeName": "Option<AuctionAcceptedData>"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "AuctionResult"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 24
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 24
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 24,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "accepted_investor",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "amount",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "time",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate",
                  "type": 3,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "AuctionAcceptedData"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 7,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 4
            },
            {
              "name": "V",
              "type": 26
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 26,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "lent_by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "borrowed_by",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "amount_borrowed",
                  "type": 4,
                  "typeName": "Balance"
                },
                {
                  "name": "time",
                  "type": 13,
                  "typeName": "u64"
                },
                {
                  "name": "rate",
                  "type": 3,
                  "typeName": "u32"
                },
                {
                  "name": "collateral_withdrawal",
                  "type": 27,
                  "typeName": "bool"
                },
                {
                  "name": "amount_paid",
                  "type": 28,
                  "typeName": "Option<Balance>"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "LoanResult"
          ]
        }
      },
      {
        "id": 27,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 28,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 4
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 4
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 29,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 30
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 30
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 30,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 31,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Unauthorized"
                },
                {
                  "index": 1,
                  "name": "NftTransferFailed"
                },
                {
                  "index": 2,
                  "name": "NotEnoughBalance"
                },
                {
                  "index": 3,
                  "name": "NftNotDeposited"
                },
                {
                  "index": 4,
                  "name": "AuctionDoesNotExist"
                },
                {
                  "index": 5,
                  "name": "BidDoesNotExist"
                },
                {
                  "index": 6,
                  "name": "LoanDoesNotExist"
                },
                {
                  "index": 7,
                  "name": "LoanDueTimeExceed"
                },
                {
                  "index": 8,
                  "name": "AmountMismatched"
                },
                {
                  "index": 9,
                  "name": "FeeNotPaid"
                },
                {
                  "index": 10,
                  "name": "TransferFailed"
                },
                {
                  "index": 11,
                  "name": "BorrowerHaveTimeToPayTheLoan"
                }
              ]
            }
          },
          "path": [
            "ebisu",
            "ebisu",
            "ContractError"
          ]
        }
      },
      {
        "id": 32,
        "type": {
          "def": {
            "sequence": {
              "type": 33
            }
          }
        }
      },
      {
        "id": 33,
        "type": {
          "def": {
            "tuple": [
              4,
              12
            ]
          }
        }
      },
      {
        "id": 34,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 15
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 15
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 35,
        "type": {
          "def": {
            "sequence": {
              "type": 36
            }
          }
        }
      },
      {
        "id": 36,
        "type": {
          "def": {
            "tuple": [
              4,
              18
            ]
          }
        }
      },
      {
        "id": 37,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 18
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 18
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 38,
        "type": {
          "def": {
            "sequence": {
              "type": 39
            }
          }
        }
      },
      {
        "id": 39,
        "type": {
          "def": {
            "tuple": [
              4,
              22
            ]
          }
        }
      },
      {
        "id": 40,
        "type": {
          "def": {
            "sequence": {
              "type": 41
            }
          }
        }
      },
      {
        "id": 41,
        "type": {
          "def": {
            "tuple": [
              4,
              26
            ]
          }
        }
      }
    ]
  }
}

export const NFT_CONTRACT_ABI = {
  "source": {
    "hash": "0x4dd4e9c173da1d8df6086fe0adca0ce39c3ac394aa73501ec62343aef7884e48",
    "language": "ink! 3.3.0",
    "compiler": "rustc 1.64.0-nightly"
  },
  "contract": {
    "name": "psp34",
    "version": "0.1.0",
    "authors": [
      "Pramit Gaha <pramitgaha21@gmail.com"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [
            {
              "label": "id",
              "type": {
                "displayName": [
                  "psp34_external",
                  "OwnerOfInput1"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns the owner of the token if any."
          ],
          "label": "PSP34::owner_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "OwnerOfOutput"
            ],
            "type": 21
          },
          "selector": "0x1168624d"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "psp34_external",
                  "TransferInput1"
                ],
                "type": 8
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "psp34_external",
                  "TransferInput2"
                ],
                "type": 1
              }
            },
            {
              "label": "data",
              "type": {
                "displayName": [
                  "psp34_external",
                  "TransferInput3"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Transfer approved or owned token from caller.",
            "",
            " On success a `Transfer` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `TokenNotExists` error if `id` does not exist.",
            "",
            " Returns `NotApproved` error if `from` doesn't have allowance for transferring.",
            "",
            " Returns `SafeTransferCheckFailed` error if `to` doesn't accept transfer."
          ],
          "label": "PSP34::transfer",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "TransferOutput"
            ],
            "type": 22
          },
          "selector": "0x3128d61b"
        },
        {
          "args": [],
          "docs": [
            " Returns the collection `Id` of the NFT token.",
            "",
            " This can represents the relationship between tokens/contracts/pallets."
          ],
          "label": "PSP34::collection_id",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "CollectionIdOutput"
            ],
            "type": 1
          },
          "selector": "0xffa27a5f"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "psp34_external",
                  "AllowanceInput1"
                ],
                "type": 8
              }
            },
            {
              "label": "operator",
              "type": {
                "displayName": [
                  "psp34_external",
                  "AllowanceInput2"
                ],
                "type": 8
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "psp34_external",
                  "AllowanceInput3"
                ],
                "type": 14
              }
            }
          ],
          "docs": [
            " Returns `true` if the operator is approved by the owner to withdraw `id` token.",
            " If `id` is `None`, returns `true` if the operator is approved to withdraw all owner's tokens."
          ],
          "label": "PSP34::allowance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "AllowanceOutput"
            ],
            "type": 25
          },
          "selector": "0x4790f55a"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "psp34_external",
                  "BalanceOfInput1"
                ],
                "type": 8
              }
            }
          ],
          "docs": [
            " Returns the balance of the owner.",
            "",
            " This represents the amount of unique tokens the owner has."
          ],
          "label": "PSP34::balance_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "BalanceOfOutput"
            ],
            "type": 4
          },
          "selector": "0xcde7e55f"
        },
        {
          "args": [
            {
              "label": "operator",
              "type": {
                "displayName": [
                  "psp34_external",
                  "ApproveInput1"
                ],
                "type": 8
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "psp34_external",
                  "ApproveInput2"
                ],
                "type": 14
              }
            },
            {
              "label": "approved",
              "type": {
                "displayName": [
                  "psp34_external",
                  "ApproveInput3"
                ],
                "type": 25
              }
            }
          ],
          "docs": [
            " Approves `operator` to withdraw the `id` token from the caller's account.",
            " If `id` is `None` approves or disapproves the operator for all tokens of the caller.",
            "",
            " On success a `Approval` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `SelfApprove` error if it is self approve.",
            "",
            " Returns `NotApproved` error if caller is not owner of `id`."
          ],
          "label": "PSP34::approve",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "ApproveOutput"
            ],
            "type": 22
          },
          "selector": "0x1932a8b0"
        },
        {
          "args": [],
          "docs": [
            " Returns current NFT total supply."
          ],
          "label": "PSP34::total_supply",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp34_external",
              "TotalSupplyOutput"
            ],
            "type": 6
          },
          "selector": "0x628413fe"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "cell": {
                        "key": "0xba1ad52bdf66c4b31efe8d66cea66b6f6365ce24823669066601b29c4e05a571",
                        "ty": 0
                      }
                    },
                    "name": "token_owner"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0xbb1ad52bdf66c4b31efe8d66cea66b6f6365ce24823669066601b29c4e05a571",
                        "ty": 12
                      }
                    },
                    "name": "operator_approvals"
                  },
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x8d39d0aed2c956632aa5585df1cf2e62db270d80130ca613ea19cbd8f2278d61",
                                "ty": 18
                              }
                            },
                            "name": "owned_tokens_count"
                          },
                          {
                            "layout": {
                              "cell": {
                                "key": "0x8e39d0aed2c956632aa5585df1cf2e62db270d80130ca613ea19cbd8f2278d61",
                                "ty": 6
                              }
                            },
                            "name": "total_supply"
                          }
                        ]
                      }
                    },
                    "name": "balances"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0xbc1ad52bdf66c4b31efe8d66cea66b6f6365ce24823669066601b29c4e05a571",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0xbd1ad52bdf66c4b31efe8d66cea66b6f6365ce24823669066601b29c4e05a571",
                                    "ty": 15
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "_reserved"
                  }
                ]
              }
            },
            "name": "psp34"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 10
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 8
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 2,
                      "typeName": "u8"
                    }
                  ],
                  "index": 0,
                  "name": "U8"
                },
                {
                  "fields": [
                    {
                      "type": 3,
                      "typeName": "u16"
                    }
                  ],
                  "index": 1,
                  "name": "U16"
                },
                {
                  "fields": [
                    {
                      "type": 4,
                      "typeName": "u32"
                    }
                  ],
                  "index": 2,
                  "name": "U32"
                },
                {
                  "fields": [
                    {
                      "type": 5,
                      "typeName": "u64"
                    }
                  ],
                  "index": 3,
                  "name": "U64"
                },
                {
                  "fields": [
                    {
                      "type": 6,
                      "typeName": "u128"
                    }
                  ],
                  "index": 4,
                  "name": "U128"
                },
                {
                  "fields": [
                    {
                      "type": 7,
                      "typeName": "Vec<u8>"
                    }
                  ],
                  "index": 5,
                  "name": "Bytes"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "types",
            "Id"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u16"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 9,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 2
            }
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "sequence": {
              "type": 11
            }
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "tuple": [
              1,
              8
            ]
          }
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 16
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 13
            },
            {
              "name": "V",
              "type": 15
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "tuple": [
              8,
              8,
              14
            ]
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 1
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 1
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "sequence": {
              "type": 17
            }
          }
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "tuple": [
              13,
              15
            ]
          }
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 19
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 8
            },
            {
              "name": "V",
              "type": 4
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "sequence": {
              "type": 20
            }
          }
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "tuple": [
              8,
              4
            ]
          }
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 8
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 8
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 15
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 23
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 15
            },
            {
              "name": "E",
              "type": 23
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 24,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "index": 1,
                  "name": "SelfApprove"
                },
                {
                  "index": 2,
                  "name": "NotApproved"
                },
                {
                  "index": 3,
                  "name": "TokenExists"
                },
                {
                  "index": 4,
                  "name": "TokenNotExists"
                },
                {
                  "fields": [
                    {
                      "type": 24,
                      "typeName": "String"
                    }
                  ],
                  "index": 5,
                  "name": "SafeTransferCheckFailed"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "psp34",
            "PSP34Error"
          ]
        }
      },
      {
        "id": 24,
        "type": {
          "def": {
            "primitive": "str"
          }
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      }
    ]
  }
};

export const CONTRACT_ADDRESS = "5GqJ178WUP8UYwYV9A1gKnBxyJQZMkkjuqT75synXotDvajS";

const provider = new WsProvider('ws://127.0.0.1:9944');

// Create the API and wait until ready
export const api = await ApiPromise.create({ provider });

export const contract = new ContractPromise(api, CONTRACT_ABI, CONTRACT_ADDRESS);
const extensions = await web3Enable("Ebisu");
if (extensions.length == 0){
  alert("no extension found")
}
const allAccounts = await web3Accounts();
export const selectedAccount = allAccounts[0];

export const injector = await web3FromSource(selectedAccount.meta.source);

const res = await contract.query.createAuction(
    selectedAccount.address, { storageDepositLimit: null, gasLimit: -1 },
    "5FEsvzG5mDNtZZGAYWpck7hr9M83vVqQzVwBd5fhnY2FTUGy", 10, 10000, 30, 500
    );

console.log(`outcome: ${res.result.isOk ? console.log(res.output.toHuman()) : 'Error'}`);
console.log(`gasRequired ${res.gasRequired.toString()}`);
const app = new App({
  target: document.getElementById('app')
})

export default app