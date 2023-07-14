import pinataSDK from "@pinata/sdk";
import { readdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import path from "path";
import {config} from "./config";

export async function uploadFolderToIPFS(folderPath: string): Promise<string> {
    const pinata = new pinataSDK({
        pinataApiKey: config.pinataApiKey,
        pinataSecretApiKey: config.pinataSecretKey,
    });

    const response = await pinata.pinFromFS(folderPath);
    return response.IpfsHash;
}

export async function updateMetadataFiles(metadataFolderPath: string, imagesIpfsHash: string): Promise<void> {
    const files = readdirSync(metadataFolderPath);

    files.forEach(async (filename, index) => {
        const filePath = path.join(metadataFolderPath, filename)
        const file = await readFile(filePath);

        const metadata = JSON.parse(file.toString());
        metadata.image =
            index != files.length - 1
                ? `ipfs://${imagesIpfsHash}/${index}.jpg`
                : `ipfs://${imagesIpfsHash}/logo.jpg`;

        await writeFile(filePath, JSON.stringify(metadata));
    });
}
