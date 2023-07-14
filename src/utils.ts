import { KeyPair, mnemonicToPrivateKey } from "ton-crypto";
import {
    beginCell,
    Cell,
    OpenedContract,
    TonClient, WalletContractV3R1,
    WalletContractV4,
} from "ton";
import {config} from "./config";

export type OpenedWallet = {
    contract: OpenedContract<WalletContractV4>;
    keyPair: KeyPair;

};

export async function openWallet(mnemonic: string[]) {
    const keyPair = await mnemonicToPrivateKey(mnemonic);

    const toncenterBaseEndpoint: string = "https://toncenter.com"

    const client = new TonClient({
        endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
        apiKey: config.apiTonToken,
    });

    const wallet = WalletContractV3R1.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
    });

    const contract = client.open(wallet);
    return { contract, keyPair };
}
