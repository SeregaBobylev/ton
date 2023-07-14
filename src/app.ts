import { openWallet } from "./utils";
import {config} from "./config";
import { updateMetadataFiles, uploadFolderToIPFS } from "./metadata";
import {waitSeqno} from "./delay";
import {NftCollection} from "./contracts/NftCollection";
async function init() {
    const metadataFolderPath = "./data/metadata/";
    const imagesFolderPath = "./data/img/";
    const wallet = await openWallet(config.mnemonicArray);
    // console.log("Started uploading images to IPFS...");
    const imagesIpfsHash = 'QmaBagHt24TJFcc93ejSjskfSowgGRsWFQLcbTxzq3R9dk';
    // const imagesIpfsHash = await uploadFolderToIPFS(imagesFolderPath);
    // console.log(
    //     `Successfully uploaded the pictures to ipfs: https://gateway.pinata.cloud/ipfs/${imagesIpfsHash}`
    // );
    //
    // console.log("Started uploading metadata files to IPFS...");
    // await updateMetadataFiles(metadataFolderPath, imagesIpfsHash);
    const metadataIpfsHash = 'QmWe7Fsq8zo74RioiuYXDiaFbcKXySuyZw3s7MjTub9YXg';
    // const metadataIpfsHash = await uploadFolderToIPFS(metadataFolderPath);
    // console.log(
    //     `Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`
    // );


    console.log("Start deploy of nft collection...");
    const collectionData = {
        ownerAddress: wallet.contract.address,
        royaltyPercent: 0.05, // 0.05 = 5%
        royaltyAddress: wallet.contract.address,
        nextItemIndex: 0,
        collectionContentUrl: `ipfs://${metadataIpfsHash}/collection.json`,
        commonContentUrl: `ipfs://${metadataIpfsHash}/`,
    };
    const collection = new NftCollection(collectionData);
    let seqno = await collection.deploy(wallet);
    console.log(`Collection deployed: ${collection.address}`);
    await waitSeqno(seqno, wallet);
}

void init();
