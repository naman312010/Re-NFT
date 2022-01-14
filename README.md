# Re-NFT
Redoing how useful NFTs can be. Introducing programmable NFTs. 

## Blockchain term
in wallet/in account : you own it
NFT: Non-Fungible Token

NFT: non-interchangable with another NFT
NFT made by making entry on blockchain and managing ownership
NFT's info permanent when outside blockchain or unreliable when on a centralized location ^1
Data storage on chain is very expensive
DeFi - Decentralized Finance

## Applications of NFTs
multimedia creations as assets
in games (NFTs can have properties)
Certificate
Websites
Official documents

## Problem
### Why editable NFT
Properties need to be changed

NFTs are mostly traded as uneditable ^1
Data storage on chain is very expensive

## Benefits
Official documents that can expire
Licensing of media, to enable just ownership at all stages (eg: before and after end of licensing deal)
properties of a game's nft can change, but the properties themselves cannot be altered

## Options on "mint page":
Upload file
name, description, [exptime], [color]
mint button

## Browse (default) page:
display minted NFT

## NFT Page:
details of NFT

## Basic query for all token data:
query AllTokens {
  tokens {
    id
    uri
    owner
    creator
    contractAddress
  }
}

## Query endpoint:
https://api.thegraph.com/subgraphs/name/naman312010/re-nft-mumbai