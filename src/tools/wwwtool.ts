
namespace WebBrowser {
	export class WWW {
		static api: string = "http://localhost:59908/api/testnet/";
		static apiaggr: string = "http://localhost:59999/api/testnet/";

		static rpc: string = "http://127.0.0.1:20332/";
        static rpcName: string = "";

        static blockHeight:number = 0;
        static chainHashLength:number = 1;
        static ContractHash:string = "c4108917282bff79b156d4d01315df811790c0e8";

		static makeZoroRpcUrl(url: string, method: string, ..._params: any[])
        {


            if (url[url.length - 1] != '/')
                url = url + "/";
            var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
            for (var i = 0; i < _params.length; i++)
            {
                urlout += JSON.stringify(_params[i]);
                if (i != _params.length - 1)
                    urlout += ",";
            }
            urlout += "]";
            return urlout;
        }


		static makeRpcUrl(method: string, ..._params: any[]) {
			var url = WWW.api;
			var urlout = WWW.makeUrl(method, url, ..._params);
			return urlout;
		}
		static makeUrl(method: string, url: string, ..._params: any[]) {
			var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
			for (var i = 0; i < _params.length; i++) {
				urlout += JSON.stringify(_params[i]);
				if (i != _params.length - 1)
					urlout += ",";
			}
			urlout += "]";
			return urlout;
		}
		static makeRpcPostBody(method: string, ..._params: any[]): {} {
			var body = {};
			body["jsonrpc"] = "2.0";
			body["id"] = 1;
			body["method"] = method;
			var params = [];
			for (var i = 0; i < _params.length; i++) {
				params.push(_params[i]);
			}
			body["params"] = params;
			return body;
		}
		//获得高度
		static async  api_getHeight()    // covered ; gets the id of lastblockheight
		{
			var str = WWW.makeRpcUrl("getblockcount");
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			var height = parseInt(r[0]["indexx"] as string) - 1;
			return height;
		}
		//获得交易总数
		static async gettxcount(type: string) // covered ; gets the total number of txs in address_tx
		{
			var str = WWW.makeRpcUrl("gettxcount", type);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0]['txcount'] as number;
		}
		static async getappchaintxcount(appchain: string) // covered ; gets the total number of txs in address_tx
		{
			var str = WWW.makeRpcUrl("getappchaintxcount", appchain);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0]['txcount'] as number;
		}
		//地址总数
		static async getaddrcount()     // covered ; gets the total number of address in address
		{
			var str = WWW.makeRpcUrl("getaddrcount");
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0]['addrcount'] as number;
		}
        /**
         * 获取区块列表
         * @param size 记录条数
         * @param page 页码
         */
		static async getblocks(size: number, page: number)      
		{
			var str = WWW.makeRpcUrl("getblocks", size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Block[];
		}

		static async getappchainblocks(appchain:string ,size: number, page: number)      
		{
			var str = WWW.makeRpcUrl("getappchainblocks", appchain ,size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Block[];
		}

		static async getblock(index: number)      
		{
			var str = WWW.makeRpcUrl("getblock", index);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Block[];
		}

		//查询交易列表
		static async getrawtransactions(size: number, page: number, txtype: string) {

			var str = WWW.makeRpcUrl("getrawtransactions", size, page, txtype);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Tx[]; // needs most recent 10 txs returned, needs a sorting by txtype
		}

		static async getappchainrawtransactions(appchain:string , size: number, page: number) {

			var str = WWW.makeRpcUrl("getappchainrawtransactions", appchain,size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Tx[]; // needs most recent 10 txs returned, needs a sorting by txtype
		}

		static async getaddrs(size: number, page: number) {
			var str = WWW.makeRpcUrl("getaddrs", size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as Addr[]; 
		}

		static async getrawtransaction(txid: string) 
		{
			var str = WWW.makeRpcUrl("getrawtransaction", txid);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0] as Tx;
		}

		static async getallnep5asset() {         
			var str = WWW.makeRpcUrl("getallnep5asset");
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r: nep5Asset[] = json["result"];
			return r;
		}

		static async api_getAllAssets()        
		{
			var str = WWW.makeRpcUrl("getallassets");
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getAllAppchains()        
		{
			var str = WWW.makeRpcUrl("getallappchains");
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		static async api_getAppchain(hash: string)        
		{
			var str = WWW.makeRpcUrl("getappchain" , hash);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getAppchainBlockcount(hash: string) {
			var str = WWW.makeRpcUrl("getappchainblockcount", hash);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0]["blockcount"] as number;
			
		}

		static async api_getAppchainAddrcount(hash: string) {
			var str = WWW.makeRpcUrl("getappchainaddrcount", hash);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r[0]["addrcount"] as number;

		}
		static async api_getUTXOCount(address: string) {
			var str = WWW.makeRpcUrl("getutxo", address);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getUTXO(address: string, size: number, page: number) {
			var str = WWW.makeRpcUrl("getutxo", address, 1, size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getbalances(address: string)   
		{
			var str = WWW.makeRpcUrl("getbalance", address);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getasset(asset: string) {   
			var str = WWW.makeRpcUrl("getasset", asset);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		static async api_getnep5(nep5: string) { 
			var str = WWW.makeRpcUrl("getnep5asset", nep5);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		static async api_getallnep5assetofaddress(nep5: string) {  
			var str = WWW.makeRpcUrl("getallnep5assetofaddress", nep5, 1);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		static async getaddrsesstxs(addr: string, size: number, page: number) { 
			var str = WWW.makeUrl("getaddresstxs", WWW.apiaggr, addr, size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			if (r) {
				r = json["result"][0];
				return r["list"] as TransOfAddress[];
			}
			return r
		}

		static async api_getaddrMsg(addr: string) {    
			var str = WWW.makeRpcUrl("getaddr", addr);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as AddressMsg[];
		}
		//资产排行
		static async getrankbyasset(nep5id: string, size: number, page: number) {
			var str = WWW.makeUrl("getrankbyasset", WWW.apiaggr, nep5id, size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		//资产排行总数
		static async api_getrankbyassetcount(id: string) {
			var str = WWW.makeUrl("getrankbyassetcount", WWW.apiaggr, id);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		static async api_getnep5transfersbyasset(nep5id: string, size: number, page: number) { 
			var str = WWW.makeRpcUrl("getnep5transfersbyasset", nep5id, size, page);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r as TransOfAsset[];
		}

		static async api_getnep5count(type: string, nep5id: string) {
			var str = WWW.makeRpcUrl("getnep5count", type, nep5id);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		//根据txid获取nep5
		static async api_getnep5transferbytxid(txid: string) { 
			var str = WWW.makeRpcUrl("getnep5transferbytxid", txid);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}
		//search asset list
		static async apiaggr_searchAsset(str: string) {
			var str = WWW.makeUrl("fuzzysearchasset", WWW.apiaggr, str);
			var result = await fetch(str, { "method": "get" });
			var json = await result.json();
			var r = json["result"];
			return r;
		}

		static async api_getAllAppChain(){
            var str = WWW.makeZoroRpcUrl(WWW.rpc, "getappchainhashlist");
            var result = await fetch(str, {"method":"get"});
            var json = await result.json();
            var r = json["result"]["hashlist"];
            return r;
		}
		
		static async api_getAppChainName(chainHash:string){
            var str = WWW.makeZoroRpcUrl(WWW.rpc, "getappchainstate", chainHash);
            var result = await fetch(str, {"method":"get"});
            var json = await result.json();
            var r = json["result"]["name"];
            return r;
		}
		
		static async api_getZoroHeight(chainHash:string)
        {
            var str = WWW.makeZoroRpcUrl(WWW.rpc, "getblockcount", chainHash);
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            var r = json["result"];
            var height = parseInt(r as string) - 1;
            return height;
		}
		
		static async rpc_invokeScript(params:any){
            var postdata = WWW.makeRpcPostBody("invokescript", params);
            var result = await fetch(WWW.rpc, {"method":"post", "body":JSON.stringify(postdata)});
            var json = await result.json();
            return json["result"];
		}
		
		static makeTran(address:string){
            var tran = new  ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.version = 1;           

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address);

            tran.attributes = [];
            tran.attributes[0] = new ThinNeo.Attribute();
            tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[0].data = scriptHash;
            tran.inputs = [];
            tran.outputs = [];
           
            return tran;
		}
		
		static async rpc_sendrawtransaction(params:any){
            var postdata = WWW.makeRpcPostBody("sendrawtransaction",params);
            var result = await fetch(WWW.rpc, {"method":"post", "body":JSON.stringify(postdata)});
            var json = await result.json();
            return json;
        }
	}
}