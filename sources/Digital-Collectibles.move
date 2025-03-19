module MyModule::DigitalCollectibles {
    use std::signer;

    /// Struct representing a collectible NFT.
    struct Collectible has store, key {
        creator: address,
        owner: address,
        metadata: vector<u8>,
    }

    /// Function to mint a new collectible NFT.
    public entry fun mint_collectible(minter: &signer, metadata: vector<u8>) {
        let creator_addr = signer::address_of(minter);
        let collectible = Collectible {
            creator: creator_addr,
            owner: creator_addr,
            metadata,
        };
        move_to(minter, collectible);
    }

    /// Function to transfer ownership of a collectible.
    public entry fun transfer_collectible(from: &signer, to: address) acquires Collectible {
        let from_addr = signer::address_of(from);
        let collectible = borrow_global_mut<Collectible>(from_addr);
        collectible.owner = to;
    }
}
