import { mnemonicToWalletKey, mnemonicNew, sign } from "ton-crypto";
import { compileFunc } from '@ton-community/func-js';
import fs from 'fs'; // we use fs for reading content of files
import { Address, beginCell, Cell, toNano } from "ton-core";
import { TonClient } from "ton";
import {config} from "../config";
async function main() {
    const keyPair = await mnemonicToWalletKey(config.mnemonicArray); // extract private and public keys from mnemonic

    const subWallet = 698983191;

    const result = await compileFunc({
        targets: ['wallet_v3.fc'], // targets of your project
        sources: {
            "stdlib.fc": fs.readFileSync('./stdlib.fc', { encoding: 'utf-8' }),
            "wallet_v3.fc": fs.readFileSync('./wallet_v3.fc', { encoding: 'utf-8' }),
        }
    });

    if (result.status === 'error') {
        console.log(111);
        console.error(result.message)
        return;
    }
    // const code = Cell.fromBoc(Buffer.from(result.codeBoc,"base64"))[0];
console.log(result.codeBoc);
}

main().finally(() => console.log("Exiting..."));
