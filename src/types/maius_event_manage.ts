export type MaiusEventManage = {
  "version": "0.1.0",
  "name": "maius_event_manage",
  "instructions": [
    {
      "name": "createIdentifier",
      "accounts": [
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "executor",
          "type": "publicKey"
        },
        {
          "name": "opened",
          "type": "bool"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "frameUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "setEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numberOfNft",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferFee",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimVault",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nftMore",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "collection",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "opened",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "frameUrl",
            "type": "string"
          },
          {
            "name": "host",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "executor",
            "type": "publicKey"
          },
          {
            "name": "numberOfNft",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "collection",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "identifier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "host",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughLamport",
      "msg": "Not enough lamport"
    },
    {
      "code": 6001,
      "name": "InvalidAccount",
      "msg": "Invalid account"
    }
  ]
};

export const IDL: MaiusEventManage = {
  "version": "0.1.0",
  "name": "maius_event_manage",
  "instructions": [
    {
      "name": "createIdentifier",
      "accounts": [
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "executor",
          "type": "publicKey"
        },
        {
          "name": "opened",
          "type": "bool"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "frameUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "setEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numberOfNft",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferFee",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "executor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimVault",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateEvent",
      "accounts": [
        {
          "name": "event",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "host",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nftMore",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "collection",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "opened",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "frameUrl",
            "type": "string"
          },
          {
            "name": "host",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "executor",
            "type": "publicKey"
          },
          {
            "name": "numberOfNft",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "collection",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "identifier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "host",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughLamport",
      "msg": "Not enough lamport"
    },
    {
      "code": 6001,
      "name": "InvalidAccount",
      "msg": "Invalid account"
    }
  ]
};
