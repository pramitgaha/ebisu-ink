import App from './App.svelte'
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";

const CONTRACT_ABI = {
  "source": {
    "hash": "0xe1c9adbd2a4bdbaa249d20524e0d8a2d35e77f3c0676d69691bfc6bc6c8a0bf4",
    "language": "ink! 3.2.0",
    "compiler": "rustc 1.63.0-nightly"
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
            "type": 21
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
            "type": 21
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
            "type": 21
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
            "type": 21
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
            "type": 21
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
            "type": 21
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
            "type": 21
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
            "type": 24
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
            "type": 21
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
            "type": 26
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
            "type": 21
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
            "type": 21
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
            "type": 27
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
            "type": 29
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
            "type": 21
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
            "type": 21
          },
          "selector": "0xf48343ad"
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
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 22
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
              "type": 22
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
        "id": 22,
        "type": {
          "def": {
            "tuple": []
          }
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
        "id": 24,
        "type": {
          "def": {
            "sequence": {
              "type": 25
            }
          }
        }
      },
      {
        "id": 25,
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
        "id": 26,
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
        "id": 27,
        "type": {
          "def": {
            "sequence": {
              "type": 28
            }
          }
        }
      },
      {
        "id": 28,
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
        "id": 29,
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
              "type": 18
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
      }
    ]
  }
};
const CONTRACT_ADDRESS = "5FEsvzG5mDNtZZGAYWpck7hr9M83vVqQzVwBd5fhnY2FTUGy";

const provider = new WsProvider('ws://127.0.0.1:9944');

// Create the API and wait until ready
const api = await ApiPromise.create({ provider });

export const contract = new ContractPromise(api, CONTRACT_ABI, CONTRACT_ADDRESS);
const extensions = await web3Enable("local canvas");
const allAccounts = await web3Accounts();
export const selectedAccount = allAccounts[0];

export const injector = await web3FromSource(selectedAccount.meta.source);

// const res = await contract.query.getAuctionList(
//     selectedAccount.address, { storageDepositLimit: null, gasLimit: -1 },
//     // "5H4GM9SboBNMxotX5TsGNk2t92unLxNdPW5BfzdCjW9snqMR",
//     // 100
//     );
//
// console.log(`outcome: ${res.result.isOk ? console.log(res.output.toHuman()) : 'Error'}`);
// console.log(`gasRequired ${res.gasRequired.toString()}`);
const app = new App({
  target: document.getElementById('app')
})

export default app
