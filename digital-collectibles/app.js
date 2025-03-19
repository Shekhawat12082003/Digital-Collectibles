const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const MODULE_ADDRESS = "0xc055552e2218b86443390e46bf5c21cbdd044accd7987e12b86d2a9fe74bb99f"; // Replace with actual module address

async function mintCollectible() {
    const privateKey = document.getElementById("privateKey").value;
    const metadata = document.getElementById("metadata").value;
    const payload = {
        function: `${MODULE_ADDRESS}::DigitalCollectibles::mint_collectible`,
        type_arguments: [],
        arguments: [Array.from(new TextEncoder().encode(metadata))], // Fix applied here
    };

    try {
        const response = await sendTransaction(privateKey, payload);
        document.getElementById("status").innerText = "NFT Minted Successfully! TX: " + response.hash;
    } catch (error) {
        document.getElementById("status").innerText = "Minting failed: " + error.message;
    }
}

async function transferCollectible() {
    const privateKey = document.getElementById("fromPrivateKey").value;
    const toAddress = document.getElementById("toAddress").value;
    const payload = {
        function: `${MODULE_ADDRESS}::DigitalCollectibles::transfer_collectible`,
        type_arguments: [],
        arguments: [toAddress],
    };

    try {
        const response = await sendTransaction(privateKey, payload);
        document.getElementById("status").innerText = "NFT Transferred Successfully! TX: " + response.hash;
    } catch (error) {
        document.getElementById("status").innerText = "Transfer failed.";
    }
    console.log("Transfer Collectible Successful");
}

async function sendTransaction(privateKey, payload) {
    const { AptosClient, AptosAccount, HexString } = window.aptos;
    const client = new AptosClient(NODE_URL);
    const account = new AptosAccount(new HexString(privateKey).toUint8Array());

    const txn = await client.generateTransaction(account.address(), payload);
    const signedTxn = await client.signTransaction(account, txn);
    return await client.submitTransaction(signedTxn);
}
