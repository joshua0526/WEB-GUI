﻿

namespace WebBrowser
{
    export class UTXO
    {
        addr: string;
        txid: string;
        n: number;
        asset: string;
        count: Neo.Fixed8;
    }
    export class CoinTool
    {
        static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
        static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
        static assetID2name: { [id: string]: string } = {};
        static name2assetID: { [id: string]: string } = {};
        static async initAllAsset()
        {
            var allassets = await WWW.api_getAllAssets();
            for (var a in allassets)
            {
                var asset = allassets[a];
                var names = asset.name;
                var id = asset.id;
                var name: string = "";
                if (id == CoinTool.id_GAS)
                {
                    name = "GAS";
                }
                else if (id == CoinTool.id_NEO)
                {
                    name = "NEO";
                }
                else
                {
                    for (var i in names)
                    {
                        name = names[i].name;
                        if (names[i].lang == "en")
                            break;
                    }
                }
                CoinTool.assetID2name[id] = name;
                CoinTool.name2assetID[name] = id;
            }
        }

        static ZoroFunction(){
            var select = document.createElement('select');
            var sitem = document.createElement("option");
            sitem.text = "NEO->ZORO";
            sitem.value = "NEO";
            select.appendChild(sitem);

            var sitem = document.createElement("option");
            sitem.text = "ZORO->NEO";
            sitem.value = "ZORO";
            select.appendChild(sitem);

            return select;
        }

        static ZoroAsset(){
            var select = document.createElement('select');
            var sitem = document.createElement("option");
            sitem.text = "BCP";
            sitem.value = "BCP";
            select.appendChild(sitem);

            var sitem = document.createElement("option");
            sitem.text = "NEO";
            sitem.value = "NEO";
            select.appendChild(sitem);

            var sitem = document.createElement("option");
            sitem.text = "GAS";
            sitem.value = "GAS";
            select.appendChild(sitem);

            return select;
        }

        static makeZoroTran(address:string, targetaddr:string, sendcount:Neo.Fixed8, assetid:string, chainHash:string): ThinNeo.Transaction
        {
            if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
               throw new Error("can not send zero.");           
            
            var array = [];
            var sb = new ThinNeo.ScriptBuilder();            
           
            var randomBytes = new Uint8Array(32);            
            var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(randomBytes);
            var randomNum = new Neo.BigInteger(key);
            sb.EmitPushNumber(randomNum);
            sb.Emit(ThinNeo.OpCode.DROP);
            array.push("(addr)" + address);
            array.push("(addr)" + targetaddr);
            array.push("(int)" + sendcount);
            sb.EmitParamJson(array);
            sb.EmitPushString("transfer");
            sb.EmitAppCall(assetid.hexToBytes().reverse());
            // var scripthash = sb.ToArray().toHexString();

            // var postArray = [];
            // postArray.push(chainHash);
            // postArray.push(scripthash);

            var extdata = new ThinNeo.InvokeTransData();
            extdata.script = sb.ToArray();
            extdata.gas = Neo.Fixed8.Zero;

            var tran = new  ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.version = 1;
            
            tran.extdata = extdata;

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address);

            tran.attributes = [];
            tran.attributes[0] = new ThinNeo.Attribute();
            tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[0].data = scriptHash;
            tran.inputs = [];
            tran.outputs = [];
           
            return tran;
        }

        static makeTran(utxos: { [id: string]: UTXO[] }, targetaddr: string, assetid: string, sendcount: Neo.Fixed8): ThinNeo.Transaction
        {
            if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
                throw new Error("can not send zero.");
            var tran = new ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.ContractTransaction;
            tran.version = 0;//0 or 1
            tran.extdata = null;

            tran.attributes = [];

            tran.inputs = [];
            var scraddr: string = "";
            utxos[assetid].sort((a, b) =>
            {
                return a.count.compareTo(b.count);
            });
            var us = utxos[assetid];
            var count: Neo.Fixed8 = Neo.Fixed8.Zero;
            for (var i = 0; i < us.length; i++)
            {
                var input = new ThinNeo.TransactionInput();
                input.hash = us[i].txid.hexToBytes().reverse();
                input.index = us[i].n;
                input["_addr"] = us[i].addr;//利用js的隨意性，臨時傳個值
                tran.inputs.push(input);
                count = count.add(us[i].count);
                scraddr = us[i].addr;
                if (count.compareTo(sendcount) > 0)
                {
                    break;
                }
            }
            if (count.compareTo(sendcount) >= 0)//输入大于0
            {
                tran.outputs = [];
                //输出
                var output = new ThinNeo.TransactionOutput();
                output.assetId = assetid.hexToBytes().reverse();
                output.value = sendcount;
                output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(targetaddr);
                tran.outputs.push(output);

                //找零
                var change = count.subtract(sendcount);
                if (change.compareTo(Neo.Fixed8.Zero) > 0)
                {
                    var outputchange = new ThinNeo.TransactionOutput();
                    outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
                    outputchange.value = change;
                    outputchange.assetId = assetid.hexToBytes().reverse();
                    tran.outputs.push(outputchange);
                }
            }
            else
            {
                throw new Error("no enough money.");
            }
            return tran;
        }

    }


}