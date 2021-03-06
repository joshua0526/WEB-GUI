var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @private currentPage 当前页
 * @private pageSize 每页条数
 * @private totalCount 总记录数
 * @private currentPage 当前页
 */
var WebBrowser;
/**
 * @private currentPage 当前页
 * @private pageSize 每页条数
 * @private totalCount 总记录数
 * @private currentPage 当前页
 */
(function (WebBrowser) {
    class PageUtil {
        /**
         *
         * @param total 总记录数
         * @param pageSize 每页条数
         */
        constructor(total, pageSize) {
            this._currentPage = 1;
            this._totalCount = total;
            this._pageSize = pageSize;
            this._totalPage = total % pageSize == 0 ? total / pageSize : Math.ceil((total / pageSize));
        }
        ;
        /**
         * currentPage 返回当前页码
         */
        get currentPage() {
            this._totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : Math.ceil((this.totalCount / this.pageSize));
            return this._currentPage;
        }
        /**
         *
         */
        set currentPage(currentPage) {
            this._currentPage = currentPage;
        }
        /**
         * pageSize 每页条数
         */
        get pageSize() {
            return this._pageSize;
        }
        /**
         * set count
         */
        set pageSize(pageSize) {
            this._pageSize = pageSize;
        }
        /**
         * pageSize 每页条数
         */
        get totalCount() {
            return this._totalCount;
        }
        /**
         * set count
         */
        set totalCount(totalCount) {
            this._totalCount = totalCount;
        }
        /**
     * pageSize 总页数
     */
        get totalPage() {
            this._totalPage = this._totalCount % this._pageSize == 0 ? this._totalCount / this._pageSize : Math.ceil(this._totalCount / this._pageSize);
            return this._totalPage;
        }
    }
    WebBrowser.PageUtil = PageUtil;
    class Url {
        static href_blocks() {
            return WebBrowser.locationtool.getUrl() + '/blocks';
        }
        static href_appchains() {
            return WebBrowser.locationtool.getUrl() + '/appchains';
        }
        static href_appchain(appchain) {
            return WebBrowser.locationtool.getUrl() + '/asset' + appchain;
        }
        static href_transactions() {
            return WebBrowser.locationtool.getUrl() + '/transactions';
        }
        static href_addresses() {
            return WebBrowser.locationtool.getUrl() + '/addresses';
        }
        static href_assets() {
            return WebBrowser.locationtool.getUrl() + '/assets';
        }
        static href_gui() {
            return WebBrowser.locationtool.getUrl() + '/gui';
        }
        static href_nnsevent() {
            return WebBrowser.locationtool.getUrl() + '/nnsevent';
        }
        static href_block(block) {
            return WebBrowser.locationtool.getUrl() + "/block/" + block;
        }
        static href_blockh(block) {
            return WebBrowser.locationtool.getUrl() + '/block/' + block;
        }
        static href_transaction(tx) {
            return WebBrowser.locationtool.getUrl() + "/transaction/" + tx;
        }
        static href_address(addr) {
            return WebBrowser.locationtool.getUrl() + "/address/" + addr;
        }
        static href_asset(asset) {
            return WebBrowser.locationtool.getUrl() + '/asset/' + asset;
        }
        static href_nep5(nep5) {
            return WebBrowser.locationtool.getUrl() + '/nep5/' + nep5;
        }
        static href_nnsbeing() {
            return WebBrowser.locationtool.getUrl() + '/nnsauction/';
        }
        static href_nnsrank() {
            return WebBrowser.locationtool.getUrl() + '/nnsrank/';
        }
        static href_nns(domain) {
            return WebBrowser.locationtool.getUrl() + '/nns/' + domain;
        }
    }
    WebBrowser.Url = Url;
    class Nep5as {
    }
    WebBrowser.Nep5as = Nep5as;
    let AssetEnum;
    (function (AssetEnum) {
        AssetEnum["NEO"] = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
        AssetEnum["GAS"] = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    })(AssetEnum = WebBrowser.AssetEnum || (WebBrowser.AssetEnum = {}));
    class Detail {
        constructor(address, height, balances) {
            this.address = address;
            this.height = height;
            this.balances = balances;
        }
    }
    WebBrowser.Detail = Detail;
    WebBrowser.network = "mainnet";
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class Neotool {
        constructor() { }
        /**
         * verifyPublicKey 验证公钥
         * @param publicKey 公钥
         */
        static verifyPublicKey(publicKey) {
            var array = Neo.Cryptography.Base58.decode(publicKey);
            //var hexstr = array.toHexString();
            //var salt = array.subarray(0, 1);
            //var hash = array.subarray(1, 1 + 20);
            var check = array.subarray(21, 21 + 4); //
            var checkdata = array.subarray(0, 21); //
            var hashd = Neo.Cryptography.Sha256.computeHash(checkdata); //
            hashd = Neo.Cryptography.Sha256.computeHash(hashd); //
            var hashd = hashd.slice(0, 4); //
            var checked = new Uint8Array(hashd); //
            var error = false;
            for (var i = 0; i < 4; i++) {
                if (checked[i] != check[i]) {
                    error = true;
                    break;
                }
            }
            return !error;
        }
        /**
         * wifDecode wif解码
         * @param wif wif私钥
         */
        static wifDecode(wif) {
            let result = { err: false, result: { pubkey: "", prikey: "", address: "" } };
            var prikey;
            var pubkey;
            var address;
            try {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var hexstr = prikey.toHexString();
                result.result.prikey = hexstr;
            }
            catch (e) {
                result.err = true;
                result.result = e.message;
                return result;
            }
            try {
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                result.result.pubkey = hexstr;
            }
            catch (e) {
                result.err = true;
                result.result = e.message;
                return result;
            }
            try {
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                result.result.address = address;
            }
            catch (e) {
                result.err = true;
                result.result = e.message;
                return result;
            }
            return result;
        }
        /**
         * nep2FromWif
         */
        static nep2FromWif(wif, password) {
            var prikey;
            var pubkey;
            var address;
            let res = { err: false, result: { address: "", nep2: "" } };
            try {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var n = 16384;
                var r = 8;
                var p = 8;
                ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) => {
                    res.err = false;
                    res.result.nep2 = result;
                    pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                    var hexstr = pubkey.toHexString();
                    address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                    res.result.address = address;
                    return res;
                });
            }
            catch (e) {
                res.err = true;
                res.result = e.message;
                return res;
            }
        }
        /**
         * nep2TOWif
         */
        static nep2ToWif(nep2, password) {
            return __awaiter(this, void 0, void 0, function* () {
                var prikey;
                var pubkey;
                var address;
                let promise = new Promise((resolve, reject) => {
                    let n = 16384;
                    var r = 8;
                    var p = 8;
                    ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, (info, result) => {
                        //spanNep2.textContent = "info=" + info + " result=" + result;
                        prikey = result;
                        if (prikey != null) {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(prikey);
                            resolve({ err: false, result: { pubkey, address, prikey } });
                        }
                        else {
                            // spanWif.textContent = "result=" + "info=" + info + " result=" + result;
                            reject({ err: false, result: result });
                        }
                    });
                });
                return promise;
            });
        }
        /**
         * nep6Load
         */
        static nep6Load(wallet, password) {
            return __awaiter(this, void 0, void 0, function* () {
                // let promise:Promise<result> = new Promise((resolve,reject)=>{
                try {
                    //getPrivateKey 是异步方法，且同时只能执行一个
                    var istart = 0;
                    let res = new Array();
                    var getkey = null;
                    // getkey = async (keyindex: number) => {
                    for (let keyindex = 0; keyindex < wallet.accounts.length; keyindex++) {
                        let account = wallet.accounts[keyindex];
                        try {
                            let result = yield this.getPriKeyfromAccount(wallet.scrypt, password, account);
                            res.push(result.result);
                        }
                        catch (error) {
                            console.error(error);
                            return { err: true, result: error };
                        }
                    }
                    return { err: false, result: res };
                }
                catch (e) {
                }
                // });
                // return promise;
            });
        }
        /**
         * getPriKeyform
         */
        static getPriKeyfromAccount(scrypt, password, account) {
            return __awaiter(this, void 0, void 0, function* () {
                let promise = new Promise((resolve, reject) => {
                    account.getPrivateKey(scrypt, password, (info, result) => {
                        if (info == "finish") {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(result);
                            var hexkey = result.toHexString();
                            resolve({ err: false, result: { pubkey: pubkey, address: address, prikey: result } });
                        }
                        else {
                            // info2.textContent += info + "|" + result;
                            reject({ err: true, result: result });
                        }
                    });
                });
                return promise;
            });
        }
    }
    WebBrowser.Neotool = Neotool;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="./tools/neotool.ts" />
var WebBrowser;
/// <reference path="./tools/neotool.ts" />
(function (WebBrowser) {
    class Navbar {
        constructor(app) {
            this.indexBtn = document.getElementById("index-btn");
            this.indexa = document.getElementById("indexa");
            this.browBtn = document.getElementById("brow-btn");
            this.browsea = document.getElementById("browsea");
            this.blockBtn = document.getElementById("blocks-btn");
            this.blocka = document.getElementById("blocksa");
            this.txlistBtn = document.getElementById("txlist-btn");
            this.txlista = document.getElementById("txlista");
            this.addrsBtn = document.getElementById("addrs-btn");
            this.addrsa = document.getElementById("addrsa");
            this.assetBtn = document.getElementById("asset-btn");
            this.asseta = document.getElementById("assetsa");
            this.guiBtn = document.getElementById("gui-btn");
            this.guia = document.getElementById("guia");
            // walletBtn: HTMLLIElement = document.getElementById("wallet-btn") as HTMLLIElement;
            // walleta: HTMLAnchorElement = document.getElementById("walleta") as HTMLAnchorElement;
            // nnsBtn: HTMLLIElement = document.getElementById("nns-btn") as HTMLLIElement;
            // nnsa: HTMLAnchorElement = document.getElementById("nnssa") as HTMLAnchorElement;
            this.searchBtn = document.getElementById("searchBtn");
            this.searchText = document.getElementById("searchText");
            this.searchList = document.getElementById("seach_list");
            this.cpLock = false;
            this.currentLine = 0;
            this.app = app;
        }
        getLangs() {
            let page_lang = ["indexa", "browsea", "blocka", "txlista", "addrsa", "asseta", "guia"];
            page_lang.forEach(lang => {
                this[lang].textContent = this.app.langmgr.get("nav_" + lang);
            });
        }
        start() {
            this.getLangs();
            this.indexa.onclick = () => {
                this.skip("");
            };
            this.blocka.onclick = () => {
                this.skip("/blocks");
            };
            this.txlista.onclick = () => {
                this.skip("/transactions");
            };
            this.addrsa.onclick = () => {
                this.skip("/addresses");
            };
            this.asseta.onclick = () => {
                this.skip("/assets");
            };
            this.guia.onclick = () => {
                this.skip("/gui");
            };
            // this.nnsa.onclick = () => {
            //     this.skip("/nnsevent");
            // }
            this.searchBtn.onclick = () => {
                this.jump();
            };
            this.searchText.addEventListener('compositionstart', () => {
                this.cpLock = true;
            });
            this.searchText.addEventListener('compositionend', () => {
                this.cpLock = false;
                if (!this.cpLock)
                    this.fuzzyseach();
            });
            this.searchText.addEventListener('input', () => {
                if (!this.cpLock)
                    this.fuzzyseach();
            });
            this.searchText.onkeydown = (e) => {
                if (e.keyCode == 13) {
                    this.jump();
                }
                else if (e.keyCode == 38) {
                    this.changeItem();
                    this.currentLine--;
                }
                else if (e.keyCode == 40) {
                    this.changeItem();
                    this.currentLine++;
                }
            };
            this.searchList.onclick = (e) => {
                let event = e || window.event;
                let target = event.target || event.srcElement;
                if (target.nodeName.toLowerCase() == 'li') {
                    this.searchText.value = target.innerHTML;
                    let data = target.getAttribute("data");
                    window.open(WebBrowser.locationtool.getUrl() + '/asset/' + data);
                }
                $("#seach_list").empty();
            };
            // this.walletBtn.onclick = () =>
            // {
            //     if ( locationtool.getNetWork() == 'testnet' )
            //         window.open( "https://testwallet.nel.group/" );
            //     else
            //         window.open( "https://wallet.nel.group/" );
            // }
            document.onclick = (ev) => {
                let event = ev || window.event;
                let target = event.target || event.srcElement;
                if (target.nodeName.toLowerCase() != 'li') {
                    $("#seach_list").empty();
                }
            };
        }
        skip(page) {
            window.location.href = WebBrowser.locationtool.getUrl() + page;
        }
        jump() {
            let search = this.searchText.value;
            search = search.trim();
            if (search) {
                if (search.length == 34) {
                    if (WebBrowser.Neotool.verifyPublicKey(search)) {
                        window.open(WebBrowser.locationtool.getUrl() + '/address/' + search);
                    }
                    else {
                        $("#errContent").text(this.app.langmgr.get('nav_errContent'));
                        $('#errMsg').modal('show');
                        return false;
                    }
                    return;
                }
                else {
                    search = search.replace('0x', '');
                    if (search.length == 64) {
                        window.open(WebBrowser.locationtool.getUrl() + '/transaction/' + search);
                    }
                    else if (search.length == 40) {
                        window.open(WebBrowser.locationtool.getUrl() + '/nep5/' + search);
                    }
                    else if (!isNaN(Number(search))) {
                        window.open(WebBrowser.locationtool.getUrl() + '/block/' + search);
                    }
                    else if (search.length > 64) {
                        let length = this.searchList.children.length;
                        if (length) {
                            let data = this.searchList.children[this.currentLine - 1].getAttribute("data");
                            window.open(WebBrowser.locationtool.getUrl() + '/asset/' + data);
                            $("#seach_list").empty();
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        fuzzyseach() {
            return __awaiter(this, void 0, void 0, function* () {
                $("#seach_list").empty();
                this.currentLine = 0;
                let search = this.searchText.value;
                if (search) {
                    let list = yield WebBrowser.WWW.apiaggr_searchAsset(search);
                    if (list) {
                        let length = list.length;
                        for (let i = 0; i < length; i++) {
                            let oLi = '<li data="' + list[i]["assetid"] + '">' + list[i]["name"] + '(' + list[i]["assetid"] + ')' + '</li>';
                            $("#seach_list").append(oLi);
                        }
                    }
                }
            });
        }
        changeItem() {
            let length = this.searchList.children.length;
            if (length) {
                for (let i = 0; i < length; i++) {
                    this.searchList.children[i].className = "";
                }
                if (this.currentLine < 0 || this.currentLine == 0) {
                    this.currentLine = 0;
                }
                if (this.currentLine == length || this.currentLine > length) {
                    this.currentLine = length - 1;
                }
                //调试使用
                this.searchList.children[this.currentLine].className = "active";
                this.searchText.value = this.searchList.children[this.currentLine].innerHTML;
            }
        }
    }
    WebBrowser.Navbar = Navbar;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class NetWork {
        constructor(app) {
            this.title = document.getElementById("network");
            this.testbtn = document.getElementById("testnet-btn");
            this.testa = document.getElementById("testa");
            this.mainbtn = document.getElementById("mainnet-btn");
            this.maina = document.getElementById("maina");
            this.css = document.getElementById("netCss");
            this.langbtn = document.getElementById("lanuage-btn");
            this.app = app;
            this.getLangs();
        }
        getLangs() {
            this.testa.textContent = this.app.langmgr.get("net_testa");
            this.maina.textContent = this.app.langmgr.get("net_maina");
            this.langbtn.textContent = this.app.langmgr.get("net_" + this.app.langmgr.type);
            if (this.app.netmgr.type == 1) {
                this.title.innerText = this.app.langmgr.get("net_maina");
            }
            else if (this.app.netmgr.type == 2) {
                this.title.innerText = this.app.langmgr.get("net_testa");
            }
        }
        start() {
            this.testa.onclick = () => {
                window.location.hash = "#testnet";
                // var href: string[] = window.location.href.split("#");
                // var net: string = href[1].replace("mainnet", "");
                // net = net.replace("testnet", "");
                // net = "#testnet" + net;
                // window.location.href = href[0] + net;
            };
            this.maina.onclick = () => {
                window.location.hash = "#mainnet";
                // var href: string[] = window.location.href.split("#");
                // var net: string = href[1].replace("mainnet", "");
                // net = net.replace("testnet", "");
                // net = "#mainnet" + net;
                // window.location.href = href[0] + net;
            };
        }
        changeNetWork(net) {
            if (net == "testnet") {
                this.testbtn.classList.add("active");
                this.mainbtn.classList.remove("active");
                this.title.innerText = this.app.langmgr.get("net_testa");
                this.css.href = "./css/testnet.css";
            }
            else if (net == "mainnet") {
                this.mainbtn.classList.add("active");
                this.testbtn.classList.remove("active");
                this.title.innerText = this.app.langmgr.get("net_maina");
                this.css.href = "./css/mainnet.css";
            }
        }
    }
    WebBrowser.NetWork = NetWork;
})(WebBrowser || (WebBrowser = {}));
///<reference path="../lib/neo-ts.d.ts"/>
/// <reference types="jquery" />
var WebBrowser;
///<reference path="../lib/neo-ts.d.ts"/>
/// <reference types="jquery" />
(function (WebBrowser) {
    class Ajax {
        getUrlBase(netType) {
            switch (netType) {
                case "testnet":
                    return "http://localhost:59908/api/testnet/";
                case "mainnet":
                    return "http://localhost:59908/api/testnet/";
            }
        }
        /**
         * async post
         */
        post(method, params) {
            return __awaiter(this, void 0, void 0, function* () {
                var href = window.location.href.split("#");
                var arr = href[1].split("/");
                let promise = new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:59908/api/testnet/' + arr[0],
                        data: JSON.stringify({
                            "jsonrpc": "2.0",
                            "method": method,
                            "params": params,
                            "id": 1
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: (data, status) => {
                            if ('result' in data) {
                                // console.log(data['result']);              
                                resolve(data['result']);
                            }
                            else if ('error' in data) {
                                if (data['error']['code'] == -1) {
                                    resolve([]);
                                }
                                else {
                                    resolve([]);
                                    reject("参数出错 code:-100");
                                }
                            }
                        },
                        error: () => {
                            reject("请求失败");
                        }
                    });
                });
                return promise;
            });
        }
        /**
         * async post
         */
        get() {
            return __awaiter(this, void 0, void 0, function* () {
                var href = window.location.href.split("#");
                var arr = href[1].split("/");
                let promise = new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:59908/api/testnet/' + arr[0] + '?jsonrpc=2.0&method=getblock&params=%5b1000%5d&id=1001',
                        success: (data, status) => {
                            resolve(data['result']);
                        },
                        error: () => {
                            reject("请求失败");
                        }
                    });
                });
                return promise;
            });
        }
    }
    WebBrowser.Ajax = Ajax;
    // export class LocationUtil
    // {
    //     public LocString = String(location.href);
    //     constructor() { }
    //     GetQueryString(name: string): string
    //     {
    //         let rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(this.LocString), tmp;
    //         if (tmp = rs)
    //         {
    //             return decodeURI(tmp[2]);
    //         }
    //         // parameter cannot be found
    //         return "";
    //     }
    //     getRootPath_web()
    //     {
    //         //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    //         var curWwwPath = window.document.location.href;
    //         console.log(curWwwPath);
    //         //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    //         var pathName = window.document.location.pathname;
    //         console.log(pathName);
    //         var pos = curWwwPath.indexOf(pathName);
    //         //获取主机地址，如： http://localhost:8083
    //         console.log(pos);
    //         var localhostPaht = curWwwPath.substring(0, pos);
    //         //获取带"/"的项目名，如：/uimcardprj
    //         console.log(localhostPaht);
    //         var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    //         console.log(projectName);
    //         return (localhostPaht + projectName);
    //     }
    //     getRootPath()
    //     {
    //         var pathName = window.location.pathname.substring(1);
    //         var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    //         if (webName == "")
    //         {
    //             return window.location.protocol + '//' + window.location.host;
    //         }
    //         else
    //         {
    //             return window.location.protocol + '//' + window.location.host + '/' + webName;
    //         }
    //     }
    // }
    // export class NeoUtil
    // {
    //     constructor() { }
    //     /**
    //      * verifyPublicKey 验证公钥
    //      * @param publicKey 公钥
    //      */
    //     public verifyPublicKey(publicKey: string)
    //     {
    //         var array: Uint8Array = Neo.Cryptography.Base58.decode(publicKey);
    //         //var hexstr = array.toHexString();
    //         //var salt = array.subarray(0, 1);
    //         //var hash = array.subarray(1, 1 + 20);
    //         var check = array.subarray(21, 21 + 4); //
    //         var checkdata = array.subarray(0, 21);//
    //         var hashd = Neo.Cryptography.Sha256.computeHash(checkdata);//
    //         hashd = Neo.Cryptography.Sha256.computeHash(hashd);//
    //         var hashd = hashd.slice(0, 4);//
    //         var checked = new Uint8Array(hashd);//
    //         var error = false;
    //         for (var i = 0; i < 4; i++)
    //         {
    //             if (checked[i] != check[i])
    //             {
    //                 error = true;
    //                 break;
    //             }
    //         }
    //         return !error;
    //     }
    //     /**
    //      * wifDecode wif解码
    //      * @param wif wif私钥
    //      */
    //     public wifDecode(wif: string)
    //     {
    //         let result: result = { err: false, result: { pubkey: "", prikey: "", address: "" } };
    //         var prikey: Uint8Array;
    //         var pubkey: Uint8Array;
    //         var address: string;
    //         try
    //         {
    //             prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
    //             var hexstr = prikey.toHexString();
    //             result.result.prikey = hexstr;
    //         }
    //         catch (e)
    //         {
    //             result.err = true;
    //             result.result = e.message;
    //             return result
    //         }
    //         try
    //         {
    //             pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
    //             var hexstr = pubkey.toHexString();
    //             result.result.pubkey = hexstr;
    //         }
    //         catch (e)
    //         {
    //             result.err = true;
    //             result.result = e.message;
    //             return result
    //         }
    //         try
    //         {
    //             address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    //             result.result.address = address;
    //         }
    //         catch (e)
    //         {
    //             result.err = true;
    //             result.result = e.message;
    //             return result
    //         }
    //         return result;
    //     }
    //     /**
    //      * nep2FromWif
    //      */
    //     public nep2FromWif(wif: string, password: string): result
    //     {
    //         var prikey: Uint8Array;
    //         var pubkey: Uint8Array;
    //         var address: string;
    //         let res: result = { err: false, result: { address: "", nep2: "" } };
    //         try
    //         {
    //             prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
    //             var n = 16384;
    //             var r = 8;
    //             var p = 8
    //             ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) =>
    //             {
    //                 res.err = false;
    //                 res.result.nep2 = result;
    //                 pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
    //                 var hexstr = pubkey.toHexString();
    //                 address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    //                 res.result.address = address
    //                 return res;
    //             });
    //         }
    //         catch (e)
    //         {
    //             res.err = true;
    //             res.result = e.message;
    //             return res;
    //         }
    //     }
    //     /**
    //      * nep2TOWif
    //      */
    //     public async nep2ToWif(nep2: string, password: string): Promise<result>
    //     {
    //         var prikey: Uint8Array;
    //         var pubkey: Uint8Array;
    //         var address: string;
    //         let promise: Promise<result> = new Promise((resolve, reject) =>
    //         {
    //             let n: number = 16384;
    //             var r: number = 8;
    //             var p: number = 8
    //             ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, (info, result) =>
    //             {
    //                 //spanNep2.textContent = "info=" + info + " result=" + result;
    //                 console.log("result=" + "info=" + info + " result=" + result);
    //                 prikey = result as Uint8Array;
    //                 if (prikey != null)
    //                 {
    //                     var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
    //                     var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    //                     var wif = ThinNeo.Helper.GetWifFromPrivateKey(prikey);
    //                     console.log('1:' + address);
    //                     resolve({ err: false, result: { pubkey, address, prikey } });
    //                 }
    //                 else
    //                 {
    //                     // spanWif.textContent = "result=" + "info=" + info + " result=" + result;
    //                     reject({ err: false, result: result });
    //                 }
    //             });
    //         });
    //         return promise;
    //     }
    //     /**
    //      * nep6Load
    //      */
    //     public async nep6Load(wallet: ThinNeo.nep6wallet, password: string)
    //     {
    //         // let promise:Promise<result> = new Promise((resolve,reject)=>{
    //         try
    //         {
    //             //getPrivateKey 是异步方法，且同时只能执行一个
    //             var istart = 0;
    //             let res: any[] = new Array<any>();
    //             var getkey: (n: number) => void = null;
    //             // getkey = async (keyindex: number) => {
    //             for (let keyindex = 0; keyindex < wallet.accounts.length; keyindex++)
    //             {
    //                 let account = wallet.accounts[keyindex];
    //                 try
    //                 {
    //                     let result: result = await this.getPriKeyfromAccount(wallet.scrypt, password, account);
    //                     res.push(result.result);
    //                 } catch (error)
    //                 {
    //                     console.error(error);
    //                     return { err: true, result: error }
    //                 }
    //             }
    //             return { err: false, result: res }
    //         }
    //         catch (e)
    //         {
    //         }
    //         // });
    //         // return promise;
    //     }
    //     /**
    //      * getPriKeyform
    //      */
    //     public async getPriKeyfromAccount(scrypt: ThinNeo.nep6ScryptParameters, password: string, account: ThinNeo.nep6account): Promise<result>
    //     {
    //         let promise: Promise<result> =
    //             new Promise((resolve, reject) =>
    //             {
    //                 account.getPrivateKey(scrypt, password, (info, result) =>
    //                 {
    //                     if (info == "finish")
    //                     {
    //                         var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result as Uint8Array);
    //                         var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    //                         var wif = ThinNeo.Helper.GetWifFromPrivateKey(result as Uint8Array);
    //                         var hexkey = (result as Uint8Array).toHexString();
    //                         console.log(info + "|" + address + " wif=" + wif);
    //                         resolve({ err: false, result: { pubkey: pubkey, address: address, prikey: result as Uint8Array } });
    //                     }
    //                     else
    //                     {
    //                         // info2.textContent += info + "|" + result;
    //                         reject({ err: true, result: result });
    //                     }
    //                 });
    //             })
    //         return promise;
    //     }
    // }
    // export function pageCut(pageUtil: PageUtil)
    // {
    //     if (pageUtil.totalPage - pageUtil.currentPage)
    //     {
    //         $("#next").removeClass('disabled');
    //     } else
    //     {
    //         $("#next").addClass('disabled');
    //     }
    //     if (pageUtil.currentPage - 1)
    //     {
    //         $("#previous").removeClass('disabled');
    //     } else
    //     {
    //         $("#previous").addClass('disabled');
    //     }
    // }
    // export class walletStorage
    // {
    //     public wallets = localStorage.getItem("Nel_wallets");
    //     /**
    //      * setWallet
    //      */
    //     public setWallet(address, nep2)
    //     {
    //         let json = { address, nep2 };
    //         let wallets: any[] = JSON.parse(this.wallets);
    //     }
    // }
    // export class GetNep5Info
    // {
    //     constructor()
    //     {
    //     }
    //     //http://47.96.168.8:20332/?jsonrpc=2.0&id=1&method=invokescript&params=[%2200c1046e616d6567056bd94ecab6fe9607014624ef66bbc991dbcc3f%22]
    //     makeRpcUrl(url: string, method: string, ..._params: any[])
    //     {
    //         if (url[url.length - 1] != '/')
    //             url = url + "/";
    //         var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
    //         for (var i = 0; i < _params.length; i++)
    //         {
    //             urlout += JSON.stringify(_params[i]);
    //             if (i != _params.length - 1)
    //                 urlout += ",";
    //         }
    //         urlout += "]";
    //         return urlout;
    //     }
    //     nep5decimals: number = 0;
    //     async getInfo(sid: string): Promise<result>
    //     {
    //         let res: result = { err: false, result: { name: "", symbol: "", decimals: 0, totalsupply: 0 } };
    //         try
    //         {
    //             //拼接三次调用
    //             var sb = new ThinNeo.ScriptBuilder();
    //             sb.EmitParamJson(JSON.parse("[]"));//参数倒序入
    //             sb.EmitParamJson("(str)name");//参数倒序入
    //             var shash = sid.hexToBytes();
    //             sb.EmitAppCall(shash.reverse());//nep5脚本
    //             sb.EmitParamJson(JSON.parse("[]"));
    //             sb.EmitParamJson("(str)symbol");
    //             var shash = sid.hexToBytes();
    //             sb.EmitAppCall(shash.reverse());
    //             sb.EmitParamJson(JSON.parse("[]"));
    //             sb.EmitParamJson("(str)decimals");
    //             var shash = sid.hexToBytes();
    //             sb.EmitAppCall(shash.reverse());
    //             sb.EmitParamJson(JSON.parse("[]"));
    //             sb.EmitParamJson("(str)totalSupply");
    //             var shash = sid.hexToBytes();
    //             sb.EmitAppCall(shash.reverse());
    //             var data = sb.ToArray();
    //             var url = this.makeRpcUrl("http://47.96.168.8:20332", "invokescript", data.toHexString());
    //             let response = await fetch(url, { "method": "get" });
    //             let json = await response.json();
    //             // info1.textContent = JSON.stringify(r);
    //             try
    //             {
    //                 var state = json.result.state as string;
    //                 // info2.textContent = "";
    //                 if (state.includes("HALT"))
    //                 {
    //                     // info2.textContent += "Succ\n";
    //                     res.err = false;
    //                 }
    //                 var stack = json.result.stack as any[];
    //                 //find name 他的type 有可能是string 或者ByteArray
    //                 if (stack[0].type == "String")
    //                 {
    //                     // info2.textContent += "name=" + stack[0].value + "\n";
    //                     res.result.name = stack[0].value;
    //                 }
    //                 else if (stack[0].type == "ByteArray")
    //                 {
    //                     var bs = (stack[0].value as string).hexToBytes();
    //                     var str = ThinNeo.Helper.Bytes2String(bs);
    //                     // info2.textContent += "name=" + str + "\n";
    //                     res.result.name = str
    //                 }
    //                 //find symbol 他的type 有可能是string 或者ByteArray
    //                 if (stack[1].type == "String")
    //                 {
    //                     // info2.textContent += "symbol=" + stack[1].value + "\n";
    //                     res.result.symbol = stack[1].value;
    //                 }
    //                 else if (stack[1].type == "ByteArray")
    //                 {
    //                     var bs = (stack[1].value as string).hexToBytes();
    //                     var str = ThinNeo.Helper.Bytes2String(bs);
    //                     // info2.textContent += "symbol=" + str + "\n";
    //                     res.result.symbol = str;
    //                 }
    //                 //find decimals 他的type 有可能是 Integer 或者ByteArray
    //                 if (stack[2].type == "Integer")
    //                 {
    //                     this.nep5decimals = (new Neo.BigInteger(stack[2].value as string)).toInt32();
    //                 }
    //                 else if (stack[2].type == "ByteArray")
    //                 {
    //                     var bs = (stack[2].value as string).hexToBytes();
    //                     var num = new Neo.BigInteger(bs);
    //                     this.nep5decimals = num.toInt32();
    //                 }
    //                 //find decimals 他的type 有可能是 Integer 或者ByteArray
    //                 if (stack[3].type == "Integer")
    //                 {
    //                     var totalsupply = (new Neo.BigInteger(stack[3].value as string)).toInt32();
    //                 }
    //                 else if (stack[3].type == "ByteArray")
    //                 {
    //                     var bs = (stack[3].value as string).hexToBytes();
    //                     var num = new Neo.BigInteger(bs);
    //                     totalsupply = num.toInt32();
    //                 }
    //                 // info2.textContent += "decimals=" + this.nep5decimals + "\n";
    //                 res.result.totalsupply = totalsupply;
    //                 res.result.decimals = this.nep5decimals;
    //                 return res;
    //             }
    //             catch (e)
    //             {
    //                 return e.message;
    //             }
    //         }
    //         catch (e)
    //         {
    //             return e.message;
    //         }
    //     }
    //     async getBalance(sid: string, addr: string): Promise<result>
    //     {
    //         let res: result = { err: false, result: 0 };
    //         var sb = new ThinNeo.ScriptBuilder();
    //         sb.EmitParamJson(["(addr)" + addr]);//参数倒序入
    //         sb.EmitParamJson("(str)balanceOf");//参数倒序入 //name//totalSupply//symbol//decimals
    //         var shash = sid.hexToBytes();
    //         sb.EmitAppCall(shash.reverse());//nep5脚本
    //         var data = sb.ToArray();
    //         // info1.textContent = data.toHexString();        
    //         try
    //         {
    //             var url = this.makeRpcUrl("http://47.96.168.8:20332", "invokescript", data.toHexString());
    //             let response = await fetch(url, { "method": "get" })
    //             let json = await response.json();
    //             var state = json.result.state as string;
    //             // info2.textContent = "";
    //             if (state.includes("HALT"))
    //             {
    //                 // info2.textContent += "Succ\n";
    //             }
    //             var stack = json.result.stack as any[];
    //             var bnum = new Neo.BigInteger(0);
    //             //find decimals 他的type 有可能是 Integer 或者ByteArray
    //             if (stack[0].type == "Integer")
    //             {
    //                 bnum = new Neo.BigInteger(stack[0].value);
    //             }
    //             else if (stack[0].type == "ByteArray")
    //             {
    //                 var bs = (stack[0].value as string).hexToBytes();
    //                 bnum = new Neo.BigInteger(bs);
    //             }
    //             var v = 1;
    //             for (var i = 0; i < this.nep5decimals; i++)
    //             {
    //                 v *= 10;
    //             }
    //             var intv = bnum.divide(v).toInt32();
    //             var smallv = bnum.mod(v).toInt32() / v;
    //             // info2.textContent += "count=" + (intv + smallv);
    //             res.result = intv + smallv;
    //             return res;
    //         }
    //         catch (e)
    //         {
    //             return { err: true, result: "^_^ 请尝试输入正确的地址" };
    //         }
    //     }
    // }
    // export class StorageUtil
    // {
    //     /**
    //      * setStorage
    //      */
    //     public setStorage(name: string, str: string)
    //     {
    //         localStorage.setItem(name, str);
    //     }
    //     /**
    //      * getStorage
    //      */
    //     public getStorage(name: string, decoder: string): any
    //     {
    //         let res = localStorage.getItem(name)
    //         if (!res)
    //         {
    //             localStorage.setItem(name, "");
    //         }
    //         if (decoder)
    //         {
    //             if (!res)
    //             {
    //                 return [];
    //             }
    //             let item = localStorage.getItem(name).split(decoder);
    //             return item;
    //         } else
    //         {
    //             let item = JSON.parse(localStorage.getItem(name));
    //             return item;
    //         }
    //     }
    // }
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class Block {
        constructor(app) {
            this.div = document.getElementById("block-info");
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "block_info_title",
                    "block_info_block",
                    // "block_info_chainhash",
                    "block_info_hash",
                    "block_info_time",
                    "block_info_size",
                    "block_info_pre",
                    "block_info_next",
                    "block_info_tran", "block_info_txid", "block_info_type", "block_info_txsize", "block_info_ver"
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        start() {
            this.getLangs();
            //this.div.innerHTML = pages.block;
            this.queryBlock(WebBrowser.locationtool.getParam());
            let href = WebBrowser.locationtool.getUrl() + "/blocks";
            let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get("block_goallblock") + '</a>';
            $("#goallblock").empty();
            $("#goallblock").append(html);
            $("#block-tran-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                }
                else {
                    this.pageUtil.currentPage += 1;
                    this.updateBlockTrans(this.pageUtil);
                }
            });
            $("#block-tran-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                }
                else {
                    this.pageUtil.currentPage -= 1;
                    this.updateBlockTrans(this.pageUtil);
                }
            });
            this.div.hidden = false;
            this.footer.hidden = false;
        }
        queryBlock(index) {
            return __awaiter(this, void 0, void 0, function* () {
                let ajax = new WebBrowser.Ajax();
                let blocks = yield WebBrowser.WWW.getblock(index);
                let block = blocks[0];
                let time = WebBrowser.DateTool.getTime(block.time);
                var id = block.hash;
                id = id.replace('0x', '');
                //id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                //$("#chainhash").text(block.chainhash);
                $("#hash").text(id);
                $("#size").text(block.size + ' bytes');
                $("#time").text(time);
                $("#version").text(block.version);
                $("#index").text(block.index);
                //`<a href="`+ Url.href_block(item.index) + `" target="_self">`
                $("#previos-block").html(`<a href="` + WebBrowser.Url.href_block(block.index - 1) + `" target="_self">` + (block.index - 1) + `</a>`);
                $("#next-block").html(`<a href="` + WebBrowser.Url.href_block(block.index + 1) + `" target="_self">` + (Number(block.index) + 1) + `</a>`);
                this.txs = block.tx;
                let txsLength = this.txs.length;
                this.pageUtil = new WebBrowser.PageUtil(this.txs.length, 10);
                if (txsLength > this.pageUtil.pageSize) {
                    $(".block-tran-page").show();
                }
                else {
                    $(".block-tran-page").hide();
                }
                this.updateBlockTrans(this.pageUtil);
            });
        }
        updateBlockTrans(pageUtil) {
            $("#txs").empty();
            let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
            let maxNum = pageUtil.totalCount;
            let diffNum = maxNum - minNum;
            if (diffNum > pageUtil.pageSize) {
                maxNum = pageUtil.currentPage * pageUtil.pageSize;
            }
            else {
                maxNum = pageUtil.totalCount;
            }
            let arrtxs = new Array();
            for (let i = minNum; i < maxNum; i++) {
                arrtxs.push(this.txs[i]);
            }
            arrtxs.forEach(tx => {
                var id = tx.txid.replace('0x', '');
                id = id.substring(0, 6) + '...' + id.substring(id.length - 6);
                this.loadBlockTransView(tx.txid, id, tx.type, tx.size, tx.version);
            });
            let pageMsg = "Transactions " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
            $("#block-tran-msg").html(pageMsg);
            if (pageUtil.totalPage - this.pageUtil.currentPage) {
                $("#block-tran-next").removeClass('disabled');
            }
            else {
                $("#block-tran-next").addClass('disabled');
            }
            if (pageUtil.currentPage - 1) {
                $("#block-tran-previous").removeClass('disabled');
            }
            else {
                $("#block-tran-previous").addClass('disabled');
            }
        }
        loadBlockTransView(txid, id, type, size, version) {
            let html = `
                    <tr>
                        <td><a href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + id + `</a></td>
                        <td>` + type.replace("Transaction", "") + `</td>
                        <td>` + size + ` bytes</td>
                        <td>` + version + `</td>
                    </tr>`;
            $("#txs").append(html);
        }
    }
    WebBrowser.Block = Block;
})(WebBrowser || (WebBrowser = {}));
/// <reference types="jquery" />
var WebBrowser;
/// <reference types="jquery" />
(function (WebBrowser) {
    class Blocks {
        constructor(app) {
            this.div = document.getElementById('blocks-page');
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "blocks_title", "blocks_appchain", "blocks_height", "blocks_size", "blocks_time", "blocks_txcount"
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                var count = yield WebBrowser.WWW.api_getHeight();
                this.pageUtil = new WebBrowser.PageUtil(count, 15);
                yield this.updateBlocks(this.pageUtil);
                this.div.hidden = false;
                this.footer.hidden = false;
                $("#blocks-page-next").off("click").click(() => {
                    if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                        this.pageUtil.currentPage = this.pageUtil.totalPage;
                    }
                    else {
                        this.pageUtil.currentPage += 1;
                        this.updateBlocks(this.pageUtil);
                    }
                });
                $("#blocks-page-previous").off("click").click(() => {
                    if (this.pageUtil.currentPage <= 1) {
                        this.pageUtil.currentPage = 1;
                    }
                    else {
                        this.pageUtil.currentPage -= 1;
                        this.updateBlocks(this.pageUtil);
                    }
                });
            });
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        updateBlocks(pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                let blocks = yield WebBrowser.WWW.getblocks(pageUtil.pageSize, pageUtil.currentPage); // the limit for data display here is 15 after each 15
                $("#blocks-page").children("table").children("tbody").empty();
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#blocks-page-next").removeClass('disabled');
                }
                else {
                    $("#blocks-page-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#blocks-page-previous").removeClass('disabled');
                }
                else {
                    $("#blocks-page-previous").addClass('disabled');
                }
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let pageMsg = "Blocks " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#blocks-page-msg").html(pageMsg);
                //let newDate = new Date();
                blocks.forEach((item, index, input) => {
                    //newDate.setTime(item.time * 1000);
                    let time = WebBrowser.DateTool.getTime(item.time);
                    let txcounts = item.tx.length;
                    var id = item.hash;
                    id = id.replace('0x', '');
                    id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                    let html = `
                <tr>
                <td><a href="` + WebBrowser.Url.href_asset(id) + `" target="_self">` + id + `</a></td>
                <td>` + item.size + ` bytes</td><td>` + time + `</td><td><a href="` + WebBrowser.Url.href_block(item.index) + `" target="_self">` + item.index + `</a></td>
                <td>` + txcounts + `</td>
                </tr>`;
                    $("#blocks-page").find("tbody").append(html);
                });
            });
        }
    }
    WebBrowser.Blocks = Blocks;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class WWW {
        static makeZoroRpcUrl(url, method, ..._params) {
            if (url[url.length - 1] != '/')
                url = url + "/";
            var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
            for (var i = 0; i < _params.length; i++) {
                urlout += JSON.stringify(_params[i]);
                if (i != _params.length - 1)
                    urlout += ",";
            }
            urlout += "]";
            return urlout;
        }
        static makeRpcUrl(method, ..._params) {
            var url = WWW.api;
            var urlout = WWW.makeUrl(method, url, ..._params);
            return urlout;
        }
        static makeUrl(method, url, ..._params) {
            var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
            for (var i = 0; i < _params.length; i++) {
                urlout += JSON.stringify(_params[i]);
                if (i != _params.length - 1)
                    urlout += ",";
            }
            urlout += "]";
            return urlout;
        }
        static makeRpcPostBody(method, ..._params) {
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
        static api_getHeight() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getblockcount");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                var height = parseInt(r[0]["indexx"]) - 1;
                return height;
            });
        }
        //获得交易总数
        static gettxcount(type) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("gettxcount", type);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0]['txcount'];
            });
        }
        static getappchaintxcount(appchain) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchaintxcount", appchain);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0]['txcount'];
            });
        }
        //地址总数
        static getaddrcount() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getaddrcount");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0]['addrcount'];
            });
        }
        /**
         * 获取区块列表
         * @param size 记录条数
         * @param page 页码
         */
        static getblocks(size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getblocks", size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static getappchainblocks(appchain, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchainblocks", appchain, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static getblock(index) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getblock", index);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        //查询交易列表
        static getrawtransactions(size, page, txtype) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getrawtransactions", size, page, txtype);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r; // needs most recent 10 txs returned, needs a sorting by txtype
            });
        }
        static getappchainrawtransactions(appchain, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchainrawtransactions", appchain, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r; // needs most recent 10 txs returned, needs a sorting by txtype
            });
        }
        static getaddrs(size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getaddrs", size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static getrawtransaction(txid) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getrawtransaction", txid);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0];
            });
        }
        static getallnep5asset() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getallnep5asset");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getAllAssets() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getallassets");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getAllAppchains() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getallappchains");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getAppchain(hash) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchain", hash);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getAppchainBlockcount(hash) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchainblockcount", hash);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0]["blockcount"];
            });
        }
        static api_getAppchainAddrcount(hash) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getappchainaddrcount", hash);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r[0]["addrcount"];
            });
        }
        static api_getUTXOCount(address) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getutxo", address);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getUTXO(address, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getutxo", address, 1, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getbalances(address) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getbalance", address);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getasset(asset) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getasset", asset);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getnep5(nep5) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getnep5asset", nep5);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getallnep5assetofaddress(nep5) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getallnep5assetofaddress", nep5, 1);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static getaddrsesstxs(addr, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeUrl("getaddresstxs", WWW.apiaggr, addr, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                if (r) {
                    r = json["result"][0];
                    return r["list"];
                }
                return r;
            });
        }
        static api_getaddrMsg(addr) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getaddr", addr);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        //资产排行
        static getrankbyasset(nep5id, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeUrl("getrankbyasset", WWW.apiaggr, nep5id, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        //资产排行总数
        static api_getrankbyassetcount(id) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeUrl("getrankbyassetcount", WWW.apiaggr, id);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getnep5transfersbyasset(nep5id, size, page) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getnep5transfersbyasset", nep5id, size, page);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getnep5count(type, nep5id) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getnep5count", type, nep5id);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        //根据txid获取nep5
        static api_getnep5transferbytxid(txid) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeRpcUrl("getnep5transferbytxid", txid);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        //search asset list
        static apiaggr_searchAsset(str) {
            var str;
            return __awaiter(this, void 0, void 0, function* () {
                str = WWW.makeUrl("fuzzysearchasset", WWW.apiaggr, str);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                return r;
            });
        }
        static api_getAllAppChain() {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeZoroRpcUrl(WWW.rpc, "getappchainhashlist");
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"]["hashlist"];
                return r;
            });
        }
        static api_getAppChainName(chainHash) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeZoroRpcUrl(WWW.rpc, "getappchainstate", chainHash);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"]["name"];
                return r;
            });
        }
        static api_getZoroHeight(chainHash) {
            return __awaiter(this, void 0, void 0, function* () {
                var str = WWW.makeZoroRpcUrl(WWW.rpc, "getblockcount", chainHash);
                var result = yield fetch(str, { "method": "get" });
                var json = yield result.json();
                var r = json["result"];
                var height = parseInt(r) - 1;
                return height;
            });
        }
        static rpc_invokeScript(params) {
            return __awaiter(this, void 0, void 0, function* () {
                var postdata = WWW.makeRpcPostBody("invokescript", params);
                var result = yield fetch(WWW.rpc, { "method": "post", "body": JSON.stringify(postdata) });
                var json = yield result.json();
                return json["result"];
            });
        }
        static makeTran(address) {
            var tran = new ThinNeo.Transaction();
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
        static rpc_sendrawtransaction(params) {
            return __awaiter(this, void 0, void 0, function* () {
                var postdata = WWW.makeRpcPostBody("sendrawtransaction", params);
                var result = yield fetch(WWW.rpc, { "method": "post", "body": JSON.stringify(postdata) });
                var json = yield result.json();
                return json;
            });
        }
    }
    WWW.api = "http://localhost:59908/api/testnet/";
    WWW.apiaggr = "http://localhost:59999/api/testnet/";
    WWW.rpc = "http://127.0.0.1:20332/";
    WWW.rpcName = "";
    WWW.blockHeight = 0;
    WWW.chainHashLength = 1;
    WWW.ContractHash = "c4108917282bff79b156d4d01315df811790c0e8";
    WebBrowser.WWW = WWW;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class UTXO {
    }
    WebBrowser.UTXO = UTXO;
    class CoinTool {
        static initAllAsset() {
            return __awaiter(this, void 0, void 0, function* () {
                var allassets = yield WebBrowser.WWW.api_getAllAssets();
                for (var a in allassets) {
                    var asset = allassets[a];
                    var names = asset.name;
                    var id = asset.id;
                    var name = "";
                    if (id == CoinTool.id_GAS) {
                        name = "GAS";
                    }
                    else if (id == CoinTool.id_NEO) {
                        name = "NEO";
                    }
                    else {
                        for (var i in names) {
                            name = names[i].name;
                            if (names[i].lang == "en")
                                break;
                        }
                    }
                    CoinTool.assetID2name[id] = name;
                    CoinTool.name2assetID[name] = id;
                }
            });
        }
        static ZoroFunction() {
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
        static ZoroAsset() {
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
        static makeZoroTran(address, targetaddr, sendcount, assetid, chainHash) {
            if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
                throw new Error("can not send zero.");
            var array = [];
            var sb = new ThinNeo.ScriptBuilder();
            var randomBytes = new Uint8Array(32);
            var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues(randomBytes);
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
            var tran = new ThinNeo.Transaction();
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
        static makeTran(utxos, targetaddr, assetid, sendcount) {
            if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
                throw new Error("can not send zero.");
            var tran = new ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.ContractTransaction;
            tran.version = 0; //0 or 1
            tran.extdata = null;
            tran.attributes = [];
            tran.inputs = [];
            var scraddr = "";
            utxos[assetid].sort((a, b) => {
                return a.count.compareTo(b.count);
            });
            var us = utxos[assetid];
            var count = Neo.Fixed8.Zero;
            for (var i = 0; i < us.length; i++) {
                var input = new ThinNeo.TransactionInput();
                input.hash = us[i].txid.hexToBytes().reverse();
                input.index = us[i].n;
                input["_addr"] = us[i].addr; //利用js的隨意性，臨時傳個值
                tran.inputs.push(input);
                count = count.add(us[i].count);
                scraddr = us[i].addr;
                if (count.compareTo(sendcount) > 0) {
                    break;
                }
            }
            if (count.compareTo(sendcount) >= 0) //输入大于0
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
                if (change.compareTo(Neo.Fixed8.Zero) > 0) {
                    var outputchange = new ThinNeo.TransactionOutput();
                    outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
                    outputchange.value = change;
                    outputchange.assetId = assetid.hexToBytes().reverse();
                    tran.outputs.push(outputchange);
                }
            }
            else {
                throw new Error("no enough money.");
            }
            return tran;
        }
    }
    CoinTool.id_GAS = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    CoinTool.id_NEO = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    CoinTool.assetID2name = {};
    CoinTool.name2assetID = {};
    WebBrowser.CoinTool = CoinTool;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class DateTool {
        /**************************************时间格式化处理************************************/
        static dateFtt(fmt, date) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        static getTime(date) {
            date = date.toString().length == 10 ? date * 1000 : date;
            let time = new Date(date);
            // if (sessionStorage.getItem("language") != "cn") {
            //     return new Date(time).toUTCString();
            // } else {
            return this.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(time));
            // }
        }
    }
    WebBrowser.DateTool = DateTool;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../tools/wwwtool.ts" />
/// <reference path="../tools/cointool.ts" />
/// <reference path="../tools/timetool.ts" />
var WebBrowser;
/// <reference path="../tools/wwwtool.ts" />
/// <reference path="../tools/cointool.ts" />
/// <reference path="../tools/timetool.ts" />
(function (WebBrowser) {
    class Address {
        constructor(app) {
            this.div = document.getElementById("address-info");
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "addr_title",
                    "addr_ctm",
                    "addr_tran",
                    "addr_title2",
                    "addr_title3",
                    "addr_txid",
                    "addr_type",
                    "addr_time",
                    "addr_utxo_asset",
                    "addr_utxo_number",
                    "addr_utxo_txid",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                //this.div.innerHTML = pages.addres;
                var address = WebBrowser.locationtool.getParam();
                let href = WebBrowser.locationtool.getUrl() + "/addresses";
                let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get("addr_goalladress") + '</a>';
                $("#goalladress").empty();
                $("#goalladress").append(html);
                var addrMsg = yield WebBrowser.WWW.api_getaddrMsg(address);
                var utxos = yield WebBrowser.WWW.api_getUTXOCount(address);
                var balances = yield WebBrowser.WWW.api_getbalances(address);
                var nep5ofAddress = yield WebBrowser.WWW.api_getallnep5assetofaddress(address);
                if (addrMsg) {
                    this.loadAddressInfo(address, addrMsg);
                    this.pageUtil = new WebBrowser.PageUtil(addrMsg[0].txcount, 10);
                    this.initTranPage(addrMsg[0].txcount, address);
                    this.updateAddrTrasctions(address, this.pageUtil);
                }
                else {
                    $("#address").text("-");
                    $("#created").text("-");
                    $("#totalTran").text("-");
                    let html = '<div class="line" style="text-align:center;padding:16px;font-size:16px;">' + this.app.langmgr.get('no_data') + '</div>';
                    $("#addr-trans").append(html);
                }
                this.loadView(balances, nep5ofAddress);
                if (utxos) {
                    this.pageUtilUtxo = new WebBrowser.PageUtil(utxos.length, 10);
                    this.initUTXOPage(utxos.length, address);
                    this.updateAddrUTXO(address, this.pageUtilUtxo);
                }
                else {
                    let html = '<tr><td colspan="3" >' + this.app.langmgr.get('no_data') + '</td></tr>';
                    $("#add-utxos").append(html);
                }
                //this.loadUTXOView(utxos);
                this.div.hidden = false;
                this.footer.hidden = false;
            });
        }
        //AddressInfo视图
        loadAddressInfo(address, addrMsg) {
            let createdTime = WebBrowser.DateTool.getTime(addrMsg[0].firstuse.blocktime.$date);
            let totalTran = addrMsg[0].txcount;
            $("#address").text(address);
            $("#created").text(createdTime);
            $("#totalTran").text(totalTran);
        }
        loadView(balances, nep5ofAddress) {
            $("#balance").empty();
            if (balances) {
                balances.forEach((balance) => {
                    var name = WebBrowser.CoinTool.assetID2name[balance.asset];
                    let html = `
                <div class="line" > <div class="title-nel" > <span>` + name + ` </span></div >
                <div class="content-nel" > <span> ` + balance.balance + ` </span></div > </div>`;
                    $("#balance").append(html);
                });
            }
            if (nep5ofAddress) {
                nep5ofAddress.forEach((nep5ofAddress) => {
                    let html = `
                <div class="line" > <div class="title-nel" > <span>` + nep5ofAddress.symbol + ` </span></div >
                <div class="content-nel" > <span> ` + nep5ofAddress.balance + ` </span></div > </div>`;
                    $("#balance").append(html);
                });
            }
            if (!balances && !nep5ofAddress) {
                let html = '<div class="line"><div class="title-nel" style="width:100%;text-align:center;display: block;line-height: 56px;"><span>' + this.app.langmgr.get('no_data') + '</span></div> </div>';
                $("#balance").append(html);
            }
        }
        loadUTXOView(utxos) {
            $("#add-utxos").empty();
            if (utxos) {
                utxos.forEach((utxo) => {
                    let html = `
                <tr>
                <td class='code'>` + WebBrowser.CoinTool.assetID2name[utxo.asset] + `
                </td>
                <td>` + utxo.value + `
                </td>
                <td><a class='code' target='_self' href='` + WebBrowser.Url.href_transaction(utxo.txid) + `'>` + utxo.txid + `
                </a>[` + utxo.n + `]</td>
                </tr>`;
                    $("#add-utxos").append(html);
                });
            }
        }
        initTranPage(transtotal, address) {
            if (transtotal > 10) {
                $("#trans-page-msg").show();
                $("#addr-trans-page").show();
            }
            else {
                $("#trans-page-msg").hide();
                $("#addr-trans-page").hide();
            }
            $("#trans-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                    $('#errMsg').modal('show');
                }
                else {
                    this.pageUtil.currentPage += 1;
                    this.updateAddrTrasctions(address, this.pageUtil);
                }
            });
            $("#trans-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                }
                else {
                    this.pageUtil.currentPage -= 1;
                    this.updateAddrTrasctions(address, this.pageUtil);
                }
            });
        }
        initUTXOPage(utxototal, address) {
            if (utxototal > 10) {
                $("#utxo-page-msg").show();
                $("#addr-utxo-page").show();
            }
            else {
                $("#utxo-page-msg").hide();
                $("#addr-utxo-page").hide();
            }
            $("#utxo-next").off("click").click(() => {
                if (this.pageUtilUtxo.currentPage == this.pageUtilUtxo.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                }
                else {
                    this.pageUtilUtxo.currentPage += 1;
                    this.updateAddrUTXO(address, this.pageUtilUtxo);
                }
            });
            $("#utxo-previous").off("click").click(() => {
                if (this.pageUtilUtxo.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                }
                else {
                    this.pageUtilUtxo.currentPage -= 1;
                    this.updateAddrUTXO(address, this.pageUtilUtxo);
                }
            });
        }
        //更新交易记录
        updateAddrTrasctions(address, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                $("#addr-trans").empty();
                //分页查询交易记录
                let txlist = yield WebBrowser.WWW.getaddrsesstxs(address, pageUtil.pageSize, pageUtil.currentPage);
                let listLength = 0;
                if (txlist) {
                    if (txlist.length < 10) {
                        listLength = txlist.length;
                    }
                    else {
                        listLength = pageUtil.pageSize;
                    }
                    for (var n = 0; n < listLength; n++) {
                        let txid = txlist[n].txid;
                        let time = WebBrowser.DateTool.getTime(txlist[n].blocktime.$date);
                        let html = yield this.getAddrTransLine(txid, txlist[n].type, time, txlist[n].vin, txlist[n].vout);
                        $("#addr-trans").append(html);
                    }
                }
                else {
                    let html = '<div class="line" style="text-align:center;padding:16px;font-size:16px;">' + this.app.langmgr.get('no_data') + '</div>';
                    $("#addr-trans").append(html);
                }
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 10) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let pageMsg = "Transactions " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#trans-page-msg").html(pageMsg);
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#trans-next").removeClass('disabled');
                }
                else {
                    $("#trans-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#trans-previous").removeClass('disabled');
                }
                else {
                    $("#trans-previous").addClass('disabled');
                }
            });
        }
        //更新UTXO记录
        updateAddrUTXO(address, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                $("#add-utxos").empty();
                //分页查询交易记录
                let utxolist = yield WebBrowser.WWW.api_getUTXO(address, pageUtil.pageSize, pageUtil.currentPage);
                let listLength = 0;
                if (utxolist) {
                    if (utxolist.length < 10) {
                        listLength = utxolist.length;
                    }
                    else {
                        listLength = pageUtil.pageSize;
                    }
                    this.loadUTXOView(utxolist);
                }
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 10) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let pageMsg = "UTXO " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#utxo-page-msg").html(pageMsg);
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#utxo-next").removeClass('disabled');
                }
                else {
                    $("#utxo-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#utxo-previous").removeClass('disabled');
                }
                else {
                    $("#utxo-previous").addClass('disabled');
                }
            });
        }
        getAddrTransLine(txid, type, time, vins, vouts) {
            return __awaiter(this, void 0, void 0, function* () {
                var id = txid.replace('0x', '');
                id = id.substring(0, 6) + '...' + id.substring(id.length - 6);
                return `
            <div class="line">
                <div class="line-general">
                    <div class="content-nel"><span><a href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + id + `</a></span></div>
                    <div class="content-nel"><span>` + type.replace("Transaction", "") + `</span></div>
                    <div class="content-nel"><span>` + time + `</a></span></div>
                </div>
                <a onclick="txgMsg(this)" class="end" id="genbtn"><img src="./img/open.svg" /></a>
                <div class="transaction" style="width:100%;display: none;" vins='` + JSON.stringify(vins) + `' vouts='` + JSON.stringify(vouts) + `'>
                </div>
            </div>
            `;
            });
        }
        static getTxMsg(vins, vouts, div) {
            return __awaiter(this, void 0, void 0, function* () {
                vins = JSON.parse(vins);
                vouts = JSON.parse(vouts);
                let myAddress = $("#address").text();
                let form = "";
                vins.forEach(vins => {
                    let name = WebBrowser.CoinTool.assetID2name[vins.asset];
                    let href = WebBrowser.Url.href_address(vins.address);
                    let addrStr = '';
                    if (vins.address == myAddress) {
                        addrStr = `<div class="address"><a class="color-FDBA27">` + vins.address + `</a></div>`;
                    }
                    else {
                        addrStr = `<div class="address"><a href="` + href + `" target="_self">` + vins.address + `</a></div>`;
                    }
                    form +=
                        `
                <div class="item">` + addrStr + `
                    <ul class="amount"><li>` + vins.value + ` ` + name + `</li></ul>
                </div>
                `;
                });
                let tostr = "";
                vouts.forEach(vout => {
                    let name = WebBrowser.CoinTool.assetID2name[vout.asset];
                    let href = WebBrowser.Url.href_address(vout.address);
                    let addrStr = '';
                    if (vout.address == myAddress) {
                        addrStr = `<div class="address"><a class="color-FDBA27">` + vout.address + `</a></div>`;
                    }
                    else {
                        addrStr = `<div class="address"><a href="` + href + `" target="_self">` + vout.address + `</a></div>`;
                    }
                    tostr +=
                        `
                <div class="item">` + addrStr + `
                    <ul class="amount"><li>` + vout.value + ` ` + name + `</li></ul>
                </div>
                `;
                });
                var res = `
            <div class="formaddr">
                ` + form + `
            </div>
            <div class="turnto"><img src="./img/turnto.svg" /></div>
            <div class="toaddr">
                ` + tostr + `
            </div>
            `;
                div.innerHTML = res;
            });
        }
    }
    WebBrowser.Address = Address;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    //地址列表
    class Addresses {
        constructor(app) {
            this.div = document.getElementById('addrs-page');
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "addrs_title",
                    "addrs_addr",
                    "addrs_first",
                    "addrs_last",
                    "addrs_txcount",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        /**
         * addrlistInit
         */
        addrlistInit() {
            return __awaiter(this, void 0, void 0, function* () {
                let addrlist = yield WebBrowser.WWW.getaddrs(this.pageUtil.pageSize, this.pageUtil.currentPage);
                //let newDate: Date = new Date();
                addrlist.map((item) => {
                    let firstTime = WebBrowser.DateTool.getTime(item.firstuse.blocktime.$date);
                    item.firstDate = firstTime;
                    let lastTime = WebBrowser.DateTool.getTime(item.lastuse.blocktime.$date);
                    item.lastDate = lastTime;
                });
                this.loadView(addrlist);
                let minNum = this.pageUtil.currentPage * this.pageUtil.pageSize - this.pageUtil.pageSize;
                let maxNum = this.pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = this.pageUtil.currentPage * this.pageUtil.pageSize;
                }
                let pageMsg = "Addresses " + (minNum + 1) + " to " + maxNum + " of " + this.pageUtil.totalCount;
                $("#addrs-page").find("#addrs-page-msg").html(pageMsg);
                if (this.pageUtil.totalPage - this.pageUtil.currentPage) {
                    $("#addrs-page-next").removeClass('disabled');
                }
                else {
                    $("#addrs-page-next").addClass('disabled');
                }
                if (this.pageUtil.currentPage - 1) {
                    $("#addrs-page-previous").removeClass('disabled');
                }
                else {
                    $("#addrs-page-previous").addClass('disabled');
                }
            });
        }
        /**
         * start
         */
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                this.div.hidden = false;
                let prom = yield WebBrowser.WWW.getaddrcount();
                this.pageUtil = new WebBrowser.PageUtil(prom, 15);
                yield this.addrlistInit();
                //this.addrlistInit();
                $("#addrs-page-next").off("click").click(() => {
                    if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                        this.pageUtil.currentPage = this.pageUtil.totalPage;
                    }
                    else {
                        this.pageUtil.currentPage += 1;
                        this.addrlistInit();
                    }
                });
                $("#addrs-page-previous").off("click").click(() => {
                    if (this.pageUtil.currentPage <= 1) {
                        this.pageUtil.currentPage = 1;
                    }
                    else {
                        this.pageUtil.currentPage -= 1;
                        this.addrlistInit();
                    }
                });
                this.footer.hidden = false;
            });
        }
        /**
         * loadView
         */
        loadView(addrlist) {
            $("#addrlist").empty();
            addrlist.forEach(item => {
                let href = WebBrowser.Url.href_address(item.addr);
                let html = `
                <tr>
                <td><a class="code" target="_self" href="` + href + `">` + item.addr + `</a></td>
                <td>` + item.firstDate + `</td>
                <td>` + item.lastDate + `</td>
                <td>` + item.txcount + `</td></tr>`;
                $('#addrlist').append(html);
            });
        }
    }
    WebBrowser.Addresses = Addresses;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class AssetInfo {
        constructor(app) {
            this.div = document.getElementById("asset-info");
            this.footer = document.getElementById('footer-box');
            this.actxcount = 0;
            this.acblockcount = 0;
            this.acaddcount = 0;
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "asset_title",
                    "asset_id",
                    "asset_asset",
                    "asset_type",
                    "asset_ava",
                    "asset_pre",
                    "asset_adm",
                    "asset_title2",
                    "asset_rank",
                    "asset_addr",
                    "asset_balance",
                    "asset_title3",
                    "asset_txid",
                    "asset_from",
                    "asset_to",
                    "asset_height",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                var appchain = WebBrowser.locationtool.getParam();
                appchain = appchain.replace('0x', '');
                let href = WebBrowser.locationtool.getUrl() + "/assets";
                let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get('asset_goallasset') + '</a>';
                $("#goallasset").empty();
                $("#goallasset").append(html);
                this.loadAssetInfoView(appchain);
                this.acaddcount = (yield WebBrowser.WWW.api_getAppchainAddrcount(appchain));
                this.acblockcount = (yield WebBrowser.WWW.api_getAppchainBlockcount(appchain));
                this.pageUtil = new WebBrowser.PageUtil(this.acblockcount, 15);
                yield this.updateBlocks(appchain, this.pageUtil);
                this.actxcount = (yield WebBrowser.WWW.getappchaintxcount(appchain));
                this.transpageUtil = new WebBrowser.PageUtil(this.actxcount, 15);
                this.updateNep5TransView(appchain, this.transpageUtil);
                $("#acblockHeight").text(this.acblockcount); //$("#blockHeight").text(NumberTool.toThousands(this.acblockcount));
                $("#actxcount").text(this.actxcount); //$("#txcount").text(NumberTool.toThousands(this.actxcount));
                $("#acaddrCount").text(this.acaddcount); //$("#addrCount").text(NumberTool.toThousands(this.acaddcount));
                this.div.hidden = false;
                this.footer.hidden = false;
                $("#assets-balance-next").off("click").click(() => {
                    if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                        this.pageUtil.currentPage = this.pageUtil.totalPage;
                    }
                    else {
                        this.pageUtil.currentPage += 1;
                        this.updateBlocks(appchain, this.pageUtil);
                    }
                });
                $("#assets-balance-previous").off("click").click(() => {
                    if (this.pageUtil.currentPage <= 1) {
                        this.pageUtil.currentPage = 1;
                    }
                    else {
                        this.pageUtil.currentPage -= 1;
                        this.updateBlocks(appchain, this.pageUtil);
                    }
                });
                this.chaintxlist = $("#assets-tran-list");
                //监听交易列表选择框
                $("#TxType").change(() => {
                    this.pageUtil.currentPage = 1;
                    this.updateNep5TransView(appchain, this.pageUtil);
                });
                $("#assets-tran-next").off("click").click(() => {
                    if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                        this.pageUtil.currentPage = this.pageUtil.totalPage;
                    }
                    else {
                        this.pageUtil.currentPage += 1;
                        this.updateNep5TransView(appchain, this.pageUtil);
                    }
                });
                $("#assets-tran-previous").off("click").click(() => {
                    if (this.pageUtil.currentPage <= 1) {
                        this.pageUtil.currentPage = 1;
                    }
                    else {
                        this.pageUtil.currentPage -= 1;
                        this.updateNep5TransView(appchain, this.pageUtil);
                    }
                });
                this.div.hidden = false;
                this.footer.hidden = false;
            });
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        loadAssetInfoView(appchain) {
            //this.div.innerHTML = pages.asset;
            WebBrowser.WWW.api_getAppchain(appchain).then((data) => {
                var appchain = data[0];
                let time = WebBrowser.DateTool.getTime(appchain.timestamp);
                $("#name").text(appchain.name);
                $("#type").text(time);
                $("#id").text(appchain.hash);
                $("#available").text(appchain.seedlist);
                $("#precision").text(appchain.validators);
                $("#admin").text(appchain.owner);
            });
        }
        updateBlocks(appchain, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                let blocks = yield WebBrowser.WWW.getappchainblocks(appchain, pageUtil.pageSize, pageUtil.currentPage);
                $("#assets-balance-list").empty();
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#assets-balance-next").removeClass('disabled');
                }
                else {
                    $("#assets-balance-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#assets-balance-previous").removeClass('disabled');
                }
                else {
                    $("#assets-balance-previous").addClass('disabled');
                }
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let pageMsg = "Blocks " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#assets-balance-msg").html(pageMsg);
                //let newDate = new Date();
                blocks.forEach((item, index, input) => {
                    //newDate.setTime(item.time * 1000);
                    let time = WebBrowser.DateTool.getTime(item.time);
                    let txcounts = item.tx.length;
                    var id = item.hash;
                    id = id.replace('0x', '');
                    //id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                    let html = `
                <tr>
                <td><a href="` + WebBrowser.Url.href_appchain(id) + `" target="_self">` + id + `</a></td>
                <td>` + item.size + ` bytes</td><td>` + time + `</td><td><a href="` + WebBrowser.Url.href_block(item.index) + `" target="_self">` + item.index + `</a></td>
                <td>` + txcounts + `</td>
                </tr>`;
                    $("#assets-balance-list").append(html);
                });
            });
        }
        updateNep5TransView(nep5id, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                let tranList = yield WebBrowser.WWW.getappchainrawtransactions(nep5id, pageUtil.pageSize, pageUtil.currentPage);
                $("#assets-tran-list").empty();
                if (tranList) {
                    tranList.forEach((item) => {
                        if (!item.vin) {
                            item.type = '-';
                        }
                        if (!item.size) {
                            item.type = '-';
                        }
                        this.loadAssetTranView(item.txid, item.type, item.size, item.blockindex);
                    });
                }
                else {
                    let html = '<tr><td colspan="4" >' + this.app.langmgr.get('no_data') + '</td></tr>';
                    $("#assets-tran-list").append(html);
                    if (pageUtil.currentPage == 1) {
                        $(".asset-tran-page").hide();
                    }
                    else {
                        $(".asset-tran-page").show();
                    }
                }
                if (pageUtil.totalCount > 10) {
                    if (pageUtil.totalPage - pageUtil.currentPage) {
                        $("#assets-tran-next").removeClass('disabled');
                    }
                    else {
                        $("#assets-tran-next").addClass('disabled');
                    }
                    if (pageUtil.currentPage - 1) {
                        $("#assets-tran-previous").removeClass('disabled');
                    }
                    else {
                        $("#assets-tran-previous").addClass('disabled');
                    }
                    let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                    let maxNum = pageUtil.totalCount;
                    let diffNum = maxNum - minNum;
                    if (diffNum > 10) {
                        maxNum = pageUtil.currentPage * pageUtil.pageSize;
                    }
                    let pageMsg = "Transactions " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                    $("#assets-tran-msg").html(pageMsg);
                    $(".asset-tran-page").show();
                }
                else {
                    $(".asset-tran-page").hide();
                }
            });
        }
        loadAssetTranView(txid, from, to, blockindex) {
            let html = `
                    <tr>
                    <td><a class="code omit" href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + txid.replace('0x', '') + `
                    </a></td>
                    <td>` + from + `
                    </td>
                    <td>` + to + `
                    </td>
                    <td>` + blockindex + `</td>
                    </tr>`;
            $("#assets-tran-list").append(html);
        }
    }
    WebBrowser.AssetInfo = AssetInfo;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    //资产页面管理器
    class Appchains {
        constructor(app) {
            this.div = document.getElementById("asset-page");
            this.footer = document.getElementById('footer-box');
            this.app = app;
            this.assetlist = $("#asset-page");
            //监听交易列表选择框
            $("#asset-TxType").change(() => {
                this.pageUtil.currentPage = 1;
                this.assetType = $("#asset-TxType").val();
                if (this.assetType == "Assets") {
                    this.pageUtil = new WebBrowser.PageUtil(this.appchains.length, 15);
                    this.pageUtil.currentPage = 1;
                    if (this.appchains.length > 15) {
                        this.updateAssets(this.pageUtil);
                        this.assetlist.find(".page").show();
                    }
                    else {
                        this.loadAssetView(this.appchains);
                        let pageMsg = "Assets 1 to " + this.pageUtil.totalCount + " of " + this.pageUtil.totalCount;
                        $("#asset-page").find("#asset-page-msg").html(pageMsg);
                        this.assetlist.find(".page").hide();
                    }
                }
                else if (this.assetType == "Nep5") {
                    this.pageUtil = new WebBrowser.PageUtil(this.nep5s.length, 15);
                    this.pageUtil.currentPage = 1;
                    if (this.nep5s.length > 15) {
                        this.updateNep5s(this.pageUtil);
                        this.assetlist.find(".page").show();
                    }
                    else {
                        this.loadNep5View(this.nep5s);
                        let pageMsg = "Assets 1 to " + this.pageUtil.totalCount + " of " + this.pageUtil.totalCount;
                        $("#asset-page").find("#asset-page-msg").html(pageMsg);
                        this.assetlist.find(".page").hide();
                    }
                }
            });
            $("#asset-page-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                }
                else {
                    this.pageUtil.currentPage += 1;
                    if (this.assetType == "Assets") {
                        this.updateAssets(this.pageUtil);
                    }
                    else if (this.assetType == "Nep5") {
                        this.updateNep5s(this.pageUtil);
                    }
                }
            });
            $("#asset-page-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                }
                else {
                    this.pageUtil.currentPage -= 1;
                    if (this.assetType == "Assets") {
                        this.updateAssets(this.pageUtil);
                    }
                    else if (this.assetType == "Nep5") {
                        this.updateNep5s(this.pageUtil);
                    }
                }
            });
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "assets_title",
                    "assets_asset",
                    "assets_id",
                    "assets_type",
                    "assets_ava",
                    "assets_pre",
                    "assets_val",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        //更新asset表格
        updateAssets(pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                $("#asset-page").find("#asset-page-msg").html("");
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let arrAsset = new Array();
                for (let i = minNum; i < maxNum; i++) {
                    arrAsset.push(this.appchains[i]);
                }
                this.loadAssetView(arrAsset);
                let pageMsg = "Assets " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#asset-page").find("#asset-page-msg").html(pageMsg);
            });
        }
        //更新asset表格
        updateNep5s(pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                $("#asset-page").find("#asset-page-msg").html("");
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                else {
                    maxNum = pageUtil.totalCount;
                }
                let arrNep5s = new Array();
                for (let i = minNum; i < maxNum; i++) {
                    arrNep5s.push(this.nep5s[i]);
                }
                this.loadNep5View(arrNep5s);
                let pageMsg = "Assets " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#asset-page").find("#asset-page-msg").html(pageMsg);
                if (this.pageUtil.totalPage - this.pageUtil.currentPage) {
                    $("#asset-page-next").removeClass('disabled');
                }
                else {
                    $("#asset-page-next").addClass('disabled');
                }
                if (this.pageUtil.currentPage - 1) {
                    $("#asset-page-previous").removeClass('disabled');
                }
                else {
                    $("#asset-page-previous").addClass('disabled');
                }
            });
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                $("#asset-TxType").val("Assets");
                this.assetType = $("#asset-TxType").val();
                this.appchains = yield WebBrowser.WWW.api_getAllAppchains();
                this.pageUtil = new WebBrowser.PageUtil(this.appchains.length, 15);
                if (this.appchains.length > 15) {
                    this.updateAssets(this.pageUtil);
                    this.assetlist.find(".page").show();
                }
                else {
                    this.loadAssetView(this.appchains);
                    let pageMsg = "App Chains 1 to " + this.pageUtil.totalCount + " of " + this.pageUtil.totalCount;
                    $("#asset-page").find("#asset-page-msg").html(pageMsg);
                    this.assetlist.find(".page").hide();
                }
                this.nep5s = yield WebBrowser.WWW.getallnep5asset();
                this.div.hidden = false;
                this.footer.hidden = false;
            });
        }
        /**
         * loadView 页面展现
         */
        loadAssetView(appchains) {
            $("#assets").empty();
            appchains.forEach((appchain) => {
                var id = appchain.hash;
                id = id.replace('0x', '');
                let href = WebBrowser.Url.href_asset(id);
                id = appchain.hash.substring(0, 4) + '...' + appchain.hash.substring(appchain.hash.length - 4);
                let chainowner = appchain.owner.substring(2, 6) + '...' + appchain.owner.substring(appchain.owner.length - 4);
                let time = WebBrowser.DateTool.getTime(appchain.timestamp);
                let html = `
                    <tr>
                    <td> <a href="` + href + `" target="_self">` + appchain.name + `</a></td>
                    <td> <a href="` + href + `" target="_self">` + id + `</a></td>
                    <td>` + chainowner + `</td>
                    <td>` + time + `</td>
                    <td>` + appchain.version + `</td>
         
                    </tr>`;
                $("#assets").append(html);
            });
        }
        loadNep5View(nep5s) {
            $("#assets").empty();
            nep5s.forEach((nep5s) => {
                let href = WebBrowser.Url.href_nep5(nep5s.assetid);
                let assetId = nep5s.assetid.substring(2, 6) + '...' + nep5s.assetid.substring(nep5s.assetid.length - 4);
                let html = `
                    <tr>
                    <td> <a href="` + href + `" target="_self">` + nep5s.name + `</a></td>
                    <td> <a href="` + href + `" target="_self">` + assetId + `</a></td>
                    <td> Nep5 </td>
                    <td>` + nep5s.totalsupply + `</td>
                    <td>` + nep5s.decimals + `</td>
                    </tr>`;
                $("#assets").append(html);
            });
        }
    }
    WebBrowser.Appchains = Appchains;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../tools/wwwtool.ts"/>
/// <reference path="../../lib/neo-ts.d.ts"/>
var WebBrowser;
/// <reference path="../tools/wwwtool.ts"/>
/// <reference path="../../lib/neo-ts.d.ts"/>
(function (WebBrowser) {
    class AppChainTool {
        static initAllAppChain() {
            return __awaiter(this, void 0, void 0, function* () {
                var allChainHash = yield WebBrowser.WWW.api_getAllAppChain();
                this.chainName2Hash["AppRoot"] = "0000000000000000000000000000000000000000";
                this.appChainLength = 1;
                for (var a in allChainHash) {
                    var chainHash = allChainHash[a];
                    var chainName = yield WebBrowser.WWW.api_getAppChainName(chainHash);
                    this.chainName2Hash[chainName] = chainHash;
                    this.appChainLength++;
                }
                WebBrowser.WWW.chainHashLength = this.appChainLength;
                return this.chainName2Hash;
            });
        }
        static updateAllAppChain() {
            return __awaiter(this, void 0, void 0, function* () {
                var allChainHash = yield WebBrowser.WWW.api_getAllAppChain();
                this.chainName2Hash["AppRoot"] = "0000000000000000000000000000000000000000";
                this.appChainLength = 1;
                for (var a in allChainHash) {
                    var chainHash = allChainHash[a];
                    var chainName = yield WebBrowser.WWW.api_getAppChainName(chainHash);
                    this.chainName2Hash[chainName] = chainHash;
                    this.appChainLength++;
                }
                return this.chainName2Hash;
            });
        }
        static makeTran(name, pubkey, validators, seedList, out) {
            var array = [];
            var sb = new ThinNeo.ScriptBuilder();
            for (var i = 0; i < validators.length; i++) {
                sb.EmitPushString(validators[i]);
            }
            sb.EmitPushNumber(new Neo.BigInteger(validators.length));
            for (var i = 0; i < seedList.length; i++) {
                sb.EmitPushString(seedList[i]);
            }
            sb.EmitPushNumber(new Neo.BigInteger(seedList.length));
            var time = Math.floor(Date.now() / 1000);
            sb.EmitPushNumber(new Neo.BigInteger(time));
            sb.EmitPushBytes(Neo.Cryptography.ECPoint.fromUint8Array(pubkey, Neo.Cryptography.ECCurve.secp256r1).encodePoint(true));
            sb.EmitPushString(name);
            var chainHash = new Neo.Uint160(Neo.Cryptography.RIPEMD160.computeHash(Neo.Cryptography.Sha256.computeHash(sb.ToArray())));
            sb.EmitPushBytes(chainHash.toArray());
            sb.EmitSysCall("Zoro.AppChain.Create");
            out["ChainHash"] = chainHash;
            var extdata = new ThinNeo.InvokeTransData();
            extdata.script = sb.ToArray();
            extdata.gas = Neo.Fixed8.Zero;
            var tran = new ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.version = 1;
            tran.extdata = extdata;
            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHashFromPublicKey(pubkey);
            tran.attributes = [];
            tran.attributes[0] = new ThinNeo.Attribute();
            tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[0].data = scriptHash;
            tran.inputs = [];
            tran.outputs = [];
            return tran;
        }
        static initAppChainSelectList() {
            for (var i = 0; i < 9; i++) {
                this.pubKey_List["pubKey" + (i + 1)] = this.Node_List["node" + (i + 1)]["pubkey"];
                this.ip_List["ip" + (i + 1)] = this.Node_List["node" + (i + 1)]["ip"];
            }
        }
        static createSelect(panel, type, num) {
            var select = document.createElement("select");
            panel.appendChild(select);
            switch (type) {
                case "pubkey":
                    for (var name in AppChainTool.pubKey_List) {
                        var sitem = document.createElement("option");
                        sitem.text = name;
                        sitem.value = AppChainTool.pubKey_List[name];
                        select.appendChild(sitem);
                    }
                    break;
                case "ip":
                    for (var name in AppChainTool.ip_List) {
                        var sitem = document.createElement("option");
                        sitem.text = name;
                        sitem.value = AppChainTool.ip_List[name];
                        select.appendChild(sitem);
                    }
                    break;
            }
            select.selectedIndex = num - 1;
            return select;
        }
    }
    AppChainTool.chainName2Hash = {};
    AppChainTool.appChainLength = 1;
    AppChainTool.pubKey_List = {};
    AppChainTool.ip_List = {};
    AppChainTool.Node_List = {
        "node1": {
            "ip": "182.254.221.14",
            "wallet": "1.json",
            "address": "AbE6cCQGstikD1QvwTnkrD3Jid6JGPY4oq",
            "pubkey": "025178aa02ccb9a30c74c0e9771ed60d771710625e41d1ae37a192a6db2c00e7d6"
        },
        "node2": {
            "ip": "123.207.183.55",
            "wallet": "2.json",
            "address": "ANULCFJSek2qmaomk3x9KD4zR89rftsTKU",
            "pubkey": "02ade1a21bd7d90b88299e7e1fef91c12fdc9988ad9100816d3b50cb6090fd88a2"
        },
        "node3": {
            "ip": "182.254.219.170",
            "wallet": "3.json",
            "address": "ASzuDdnb2Uzkk7XoXxsJ52Wx22er6VXWYt",
            "pubkey": "02f0a7538d3aa6fc6a91315c5842733820df5b4ec1e4f273adc5d36eebd0f7463a"
        },
        "node4": {
            "ip": "115.159.68.43",
            "wallet": "4.json",
            "address": "AXBnQ5itNMYnNTW6YNvfR668AeYZ893hDR",
            "pubkey": "03f35c16c5e8837697b9263f44f62be58c058562e76b033ed29a2223792901f6b1"
        },
        "node5": {
            "ip": "115.159.53.39",
            "wallet": "5.json",
            "address": "AeTshMKrTFtmowwtHH2Da4bW19HbASmyQN",
            "pubkey": "0394f2618478474d3d5744ddd0628cf22fff4deaed4264f468f55a34758a64ac72"
        },
        "node6": {
            "ip": "115.159.85.92",
            "wallet": "6.json",
            "address": "AG6AMhWAPNk9ZAzRccb4ca1z9PmNz6JpnC",
            "pubkey": "03b7034750ff07afe1d122602fe1581672d3741bf4a729118e6fb3169237146120"
        },
        "node7": {
            "ip": "123.206.197.174",
            "wallet": "7.json",
            "address": "AWEyVxBus6NADVHpkABxoN9hyasmqLKpnt",
            "pubkey": "036fd67a326378779db32574c5610f9537411376834a1c9a50aaecae74f733b8ae"
        },
        "node8": {
            "ip": "115.159.161.150",
            "wallet": "8.json",
            "address": "AeFt22JgXDRyxuMR326xdH5FrGVNtN7ju9",
            "pubkey": "039ae33d9489d15936a9a4197d9ad029bc60469afd2482150af8ec7e7b3b81bfa1"
        },
        "node9": {
            "ip": "115.159.183.238",
            "wallet": "9.json",
            "address": "AUHxthEAYQG47E5TLBevDyhVaSkex7sQzR",
            "pubkey": "021421f6b70a410ff14521d699343f136fe58857fab45a0984bee8e73670fd2512"
        }
    };
    WebBrowser.AppChainTool = AppChainTool;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
/// <reference path="../tools/AppChainTool.ts"/> 
/// <reference path="../tools/wwwtool.ts"/> 
var WebBrowser;
/// <reference path="../app.ts"/>
/// <reference path="../tools/AppChainTool.ts"/> 
/// <reference path="../tools/wwwtool.ts"/> 
(function (WebBrowser) {
    class GUI {
        constructor(app) {
            this.div = document.getElementById('gui-info');
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                this.langType = this.app.langmgr.type;
            }
        }
        login() {
            this.div.removeChild(this.div.firstChild);
            var loginbackground = document.createElement('div');
            this.div.appendChild(loginbackground);
            var name = document.createElement('h3');
            name.textContent = "登陆你的钱包";
            name.style.color = "#ffffff";
            loginbackground.appendChild(name);
            var file = document.createElement("input");
            loginbackground.appendChild(file);
            file.type = "file";
            var password = document.createElement("input");
            loginbackground.appendChild(password);
            password.type = "password";
            password.title = "输入密码";
            var btn = document.createElement("button");
            loginbackground.appendChild(btn);
            btn.textContent = "登陆";
            btn.onclick = () => {
                if (wallet.accounts.length > 0 && wallet.accounts[0].nep2key != null) {
                    let nepkey = wallet.accounts[0].nep2key;
                    var s = wallet.scrypt;
                    ThinNeo.Helper.GetPrivateKeyFromNep2(nepkey, password.value, s.N, s.r, s.p, (info, result) => {
                        if (info == "finish") {
                            this.prikey = result;
                            this.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(this.prikey);
                            this.address = ThinNeo.Helper.GetAddressFromPublicKey(this.pubkey);
                            this.mainMenu();
                        }
                    });
                }
            };
            var createWallet = document.createElement("button");
            loginbackground.appendChild(createWallet);
            createWallet.textContent = "创建钱包";
            createWallet.onclick = () => {
                this.createWallet();
            };
            var wallet;
            var reader = new FileReader();
            reader.onload = (e) => {
                var walletstr = reader.result;
                wallet = new ThinNeo.nep6wallet();
                wallet.fromJsonStr(walletstr);
            };
            file.onchange = (ev) => {
                if (file.files[0].name.includes(".json")) {
                    reader.readAsText(file.files[0]);
                }
            };
        }
        createWallet() {
            this.div.removeChild(this.div.firstChild);
            Neo.Cryptography.RandomNumberGenerator.startCollectors();
            var loginbackground = document.createElement('div');
            this.div.appendChild(loginbackground);
            var name = document.createElement('h3');
            name.textContent = "创建您的钱包";
            name.style.color = "#ffffff";
            loginbackground.appendChild(name);
            var walletName = document.createElement("input");
            loginbackground.appendChild(walletName);
            walletName.type = "text";
            walletName.title = "输入钱包名";
            var password = document.createElement("input");
            loginbackground.appendChild(password);
            password.type = "password";
            password.title = "输入密码";
            var repassword = document.createElement("input");
            loginbackground.appendChild(repassword);
            repassword.type = "password";
            repassword.title = "重复密码";
            var create = document.createElement('button');
            loginbackground.appendChild(create);
            create.textContent = "新建";
            create.onclick = () => {
                try {
                    var array = new Uint8Array(32);
                    var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues(array);
                    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
                    var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                    var wallet = new ThinNeo.nep6wallet();
                    wallet.scrypt = new ThinNeo.nep6ScryptParameters();
                    wallet.scrypt.N = 16384;
                    wallet.scrypt.r = 8;
                    wallet.scrypt.p = 8;
                    wallet.accounts = [];
                    wallet.accounts[0] = new ThinNeo.nep6account();
                    wallet.accounts[0].address = addr;
                    ThinNeo.Helper.GetNep2FromPrivateKey(key, repassword.value, wallet.scrypt.N, wallet.scrypt.r, wallet.scrypt.p, (info, result) => {
                        if (info == "finish") {
                            wallet.accounts[0].nep2key = result;
                            wallet.accounts[0].contract = new ThinNeo.contract();
                            this.prikey = key;
                            this.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
                            this.address = ThinNeo.Helper.GetAddressFromPublicKey(this.pubkey);
                            wallet.accounts[0].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(pubkey).toHexString();
                            var jsonstr = JSON.stringify(wallet.toJson());
                            var blob = new Blob([ThinNeo.Helper.String2Bytes(jsonstr)]);
                            var downLoadUrl = URL.createObjectURL(blob);
                            this.downloadWallet(downLoadUrl, walletName.value);
                        }
                    });
                }
                catch (e) {
                }
            };
            var returnLogin = document.createElement('a');
            loginbackground.appendChild(returnLogin);
            returnLogin.textContent = "返回登录>>";
            returnLogin.onclick = () => {
                this.login();
            };
        }
        downloadWallet(url, walletName) {
            this.div.removeChild(this.div.firstChild);
            var loginbackground = document.createElement('div');
            this.div.appendChild(loginbackground);
            var name = document.createElement('h3');
            name.textContent = "您的钱包文件已创建";
            name.style.color = "#ffffff";
            loginbackground.appendChild(name);
            var text1 = document.createElement('h5');
            text1.textContent = "点击“下载”来保存您的文件";
            text1.style.color = "#eeeeee";
            loginbackground.appendChild(text1);
            var text2 = document.createElement('h5');
            text2.textContent = "不要丢失！如果丢失，将无法恢复";
            text2.style.color = "#eeeeee";
            loginbackground.appendChild(text2);
            var downLoad = document.createElement('button');
            loginbackground.appendChild(downLoad);
            downLoad.textContent = "下载文件";
            downLoad.onclick = () => {
                var downurl = document.createElement("a");
                downLoad.appendChild(downurl);
                downurl.download = walletName + ".json";
                downurl.href = url;
                downurl.click();
                this.mainMenu();
            };
            var returnLogin = document.createElement('a');
            loginbackground.appendChild(returnLogin);
            returnLogin.textContent = "返回登录>>";
            returnLogin.onclick = () => {
                this.login();
            };
        }
        mainMenu() {
            this.div.removeChild(this.div.firstChild);
            var background = document.createElement('div');
            this.div.appendChild(background);
            this.title(background);
        }
        title(div) {
            var title = document.createElement('div');
            title.style.width = "100%";
            div.appendChild(title);
            var mainValueBackGround = document.createElement('div');
            mainValueBackGround.style.width = "100%";
            div.appendChild(mainValueBackGround);
            this.initAppChain(title);
            this.update();
            var asset = document.createElement("button");
            title.appendChild(asset);
            asset.style.cssFloat = "left";
            asset.style.width = "10%";
            asset.textContent = "资产";
            asset.onclick = () => {
                this.mainAsset(mainValueBackGround);
            };
            asset.click();
            var charge = document.createElement("button");
            title.appendChild(charge);
            charge.style.cssFloat = "left";
            charge.style.width = "10%";
            charge.textContent = "转账";
            charge.onclick = () => {
                this.mainCharge(mainValueBackGround);
            };
            var appChain = document.createElement("button");
            title.appendChild(appChain);
            appChain.style.cssFloat = "left";
            appChain.style.width = "10%";
            appChain.textContent = "应用链";
            appChain.onclick = () => {
                this.mainAppChain(mainValueBackGround);
            };
            var contract = document.createElement("button");
            title.appendChild(contract);
            contract.style.cssFloat = "left";
            contract.style.width = "10%";
            contract.textContent = "发布合约";
            contract.onclick = () => {
            };
            var transaction = document.createElement("button");
            title.appendChild(transaction);
            transaction.style.cssFloat = "left";
            transaction.style.width = "10%";
            transaction.textContent = "交易记录";
            transaction.onclick = () => {
            };
            var message = document.createElement("button");
            title.appendChild(message);
            message.style.cssFloat = "left";
            message.style.width = "10%";
            message.textContent = "信息";
            message.onclick = () => {
            };
            this.selectAppChain = document.createElement("select");
            this.selectAppChain.style.cssFloat = "right";
            this.selectAppChain.style.width = "15%";
            title.appendChild(this.selectAppChain);
            this.height = document.createElement("span");
            title.appendChild(this.height);
            this.height.style.cssFloat = "right";
            this.height.style.width = "6%";
            this.height.textContent = "0";
        }
        mainAsset(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var zoroChainBackGround = document.createElement('div');
            zoroChainBackGround.style.width = "100%";
            zoroChainBackGround.style.cssFloat = "left";
            div.appendChild(zoroChainBackGround);
            //zoro
            var zoroChain = document.createElement('div');
            zoroChain.style.width = "30%";
            zoroChain.style.cssFloat = "left";
            zoroChainBackGround.appendChild(zoroChain);
            var name = document.createElement('span');
            name.style.width = "100%";
            name.style.cssFloat = "left";
            name.textContent = 'ZORO CHAIN';
            zoroChain.appendChild(name);
            var BCP = document.createElement('span');
            BCP.style.width = "100%";
            BCP.style.cssFloat = "left";
            BCP.textContent = 'BCP = ' + 13;
            zoroChain.appendChild(BCP);
            //neo
            var neoChain = document.createElement('div');
            neoChain.style.width = "30%";
            neoChain.style.cssFloat = "left";
            zoroChainBackGround.appendChild(neoChain);
            var name = document.createElement('span');
            name.style.width = "100%";
            name.style.cssFloat = "left";
            name.textContent = 'NEO CHAIN';
            neoChain.appendChild(name);
            var GAS = document.createElement('span');
            GAS.style.width = "100%";
            GAS.style.cssFloat = "left";
            GAS.textContent = 'GAS = ' + 13;
            neoChain.appendChild(GAS);
            var CGAS = document.createElement('span');
            CGAS.style.width = "100%";
            CGAS.style.cssFloat = "left";
            CGAS.textContent = 'GAS = ' + 13;
            neoChain.appendChild(CGAS);
            var NEO = document.createElement('span');
            NEO.style.width = "100%";
            NEO.style.cssFloat = "left";
            NEO.textContent = 'NEO = ' + 13;
            neoChain.appendChild(NEO);
            var CNEO = document.createElement('span');
            CNEO.style.width = "100%";
            CNEO.style.cssFloat = "left";
            CNEO.textContent = 'CNEO = ' + 13;
            neoChain.appendChild(CNEO);
            //appchain
            var appChain = document.createElement('div');
            appChain.style.width = "30%";
            appChain.style.cssFloat = "left";
            zoroChainBackGround.appendChild(appChain);
            var name = document.createElement('span');
            name.style.width = "100%";
            name.style.cssFloat = "left";
            name.textContent = 'APP CHAIN';
            appChain.appendChild(name);
            var BCP = document.createElement('span');
            BCP.style.width = "100%";
            BCP.style.cssFloat = "left";
            BCP.textContent = 'BCP = ' + 13;
            appChain.appendChild(BCP);
        }
        mainCharge(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var chargeBackGround = document.createElement('div');
            chargeBackGround.style.width = "100%";
            chargeBackGround.style.cssFloat = "left";
            div.appendChild(chargeBackGround);
            var upBackGround = document.createElement('div');
            upBackGround.style.width = "100%";
            upBackGround.style.cssFloat = "left";
            chargeBackGround.appendChild(upBackGround);
            var downBackGround = document.createElement('div');
            downBackGround.style.width = "100%";
            downBackGround.style.cssFloat = "left";
            chargeBackGround.appendChild(downBackGround);
            var normalcharge = document.createElement("button");
            upBackGround.appendChild(normalcharge);
            normalcharge.style.cssFloat = "left";
            normalcharge.style.width = "50%";
            normalcharge.textContent = "普通转账";
            normalcharge.onclick = () => {
                this.normalCharge(downBackGround);
            };
            normalcharge.click();
            var chainCharge = document.createElement("button");
            upBackGround.appendChild(chainCharge);
            chainCharge.style.cssFloat = "left";
            chainCharge.style.width = "50%";
            chainCharge.textContent = "跨链转账";
            chainCharge.onclick = () => {
                this.chainCharge(downBackGround);
            };
        }
        mainAppChain(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var appChainBackGround = document.createElement('div');
            appChainBackGround.style.width = "100%";
            appChainBackGround.style.cssFloat = "left";
            div.appendChild(appChainBackGround);
            var appChainText = document.createElement('span');
            appChainText.textContent = "应用链";
            appChainBackGround.appendChild(appChainText);
            var appChainName = document.createElement('span');
            appChainName.textContent = "应用链名称";
            appChainBackGround.appendChild(appChainName);
            var name = document.createElement('input');
            appChainBackGround.appendChild(name);
            var pubkey1 = document.createElement('span');
            pubkey1.textContent = "选择公钥1";
            appChainBackGround.appendChild(pubkey1);
            var pkey1 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "pubkey", 1);
            var pubkey2 = document.createElement('span');
            pubkey2.textContent = "选择公钥2";
            appChainBackGround.appendChild(pubkey2);
            var pkey2 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "pubkey", 2);
            var pubkey3 = document.createElement('span');
            pubkey3.textContent = "选择公钥3";
            appChainBackGround.appendChild(pubkey3);
            var pkey3 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "pubkey", 3);
            var pubkey4 = document.createElement('span');
            pubkey4.textContent = "选择公钥4";
            appChainBackGround.appendChild(pubkey4);
            var pkey4 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "pubkey", 4);
            var seed1 = document.createElement('span');
            seed1.textContent = "选择种子地址1";
            appChainBackGround.appendChild(seed1);
            var ip1 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "ip", 1);
            var seed2 = document.createElement('span');
            seed2.textContent = "选择种子地址2";
            appChainBackGround.appendChild(seed2);
            var ip2 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "ip", 2);
            var seed3 = document.createElement('span');
            seed3.textContent = "选择种子地址3";
            appChainBackGround.appendChild(seed3);
            var ip3 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "ip", 3);
            var seed4 = document.createElement('span');
            seed4.textContent = "选择种子地址4";
            appChainBackGround.appendChild(seed4);
            var ip4 = WebBrowser.AppChainTool.createSelect(appChainBackGround, "ip", 4);
            var btnCreate = document.createElement('button');
            btnCreate.textContent = "创建";
            btnCreate.onclick = () => {
            };
        }
        mainContract(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var contractBackGround = document.createElement('div');
            contractBackGround.style.width = "100%";
            contractBackGround.style.cssFloat = "left";
            div.appendChild(contractBackGround);
            var ContractText = document.createElement('span');
            ContractText.textContent = "发布合约";
            contractBackGround.appendChild(ContractText);
            var storageName = document.createElement('span');
            storageName.textContent = "storage";
            contractBackGround.appendChild(storageName);
            var need_storage = document.createElement('input');
            need_storage.type = "checkbox";
            contractBackGround.appendChild(need_storage);
            var canChargeName = document.createElement('span');
            canChargeName.textContent = "canCharge";
            contractBackGround.appendChild(canChargeName);
            var need_canCharge = document.createElement('input');
            need_canCharge.type = "checkbox";
            contractBackGround.appendChild(need_canCharge);
            var nameText = document.createElement('span');
            nameText.textContent = "NAME";
            contractBackGround.appendChild(nameText);
            var name = document.createElement('input');
            contractBackGround.appendChild(name);
            var versionText = document.createElement('span');
            versionText.textContent = "VERSION";
            contractBackGround.appendChild(versionText);
            var version = document.createElement('input');
            contractBackGround.appendChild(version);
            var autherText = document.createElement('span');
            autherText.textContent = "AUTHOR";
            contractBackGround.appendChild(autherText);
            var auther = document.createElement('input');
            contractBackGround.appendChild(auther);
            var emailText = document.createElement('span');
            emailText.textContent = "EMAIL";
            contractBackGround.appendChild(emailText);
            var email = document.createElement('input');
            contractBackGround.appendChild(email);
            var descriptionText = document.createElement('span');
            descriptionText.textContent = "DESCRIPTION";
            contractBackGround.appendChild(descriptionText);
            var description = document.createElement('input');
            contractBackGround.appendChild(description);
            var fileText = document.createElement('span');
            fileText.textContent = "FILE";
            contractBackGround.appendChild(fileText);
            var file = document.createElement('input');
            file.type = "file";
            contractBackGround.appendChild(file);
            var btnSend = document.createElement('button');
            btnSend.textContent = "send";
            contractBackGround.appendChild(btnSend);
            var ContractAvm = null;
            btnSend.onclick = () => __awaiter(this, void 0, void 0, function* () {
                if (!ContractAvm) {
                    alert("it can be .avm file.");
                    return;
                }
                var parameter__list = "0710".hexToBytes();
                var return_type = "05".hexToBytes();
                var storage = 1;
                var nep4 = 0;
                var canCharge = 4;
                var sb = new ThinNeo.ScriptBuilder();
                storage = need_storage.checked ? storage : 0;
                nep4 = nep4;
                canCharge = need_canCharge.checked ? canCharge : 4;
                var ss = storage | nep4 | canCharge;
                sb.EmitPushString(description.value);
                sb.EmitPushString(email.value);
                sb.EmitPushString(auther.value);
                sb.EmitPushString(version.value);
                sb.EmitPushString(name.value);
                sb.EmitPushNumber(new Neo.BigInteger(ss));
                sb.EmitPushBytes(return_type);
                sb.EmitPushBytes(parameter__list);
                var contract = new Uint8Array(ContractAvm);
                sb.EmitPushBytes(contract);
                sb.EmitSysCall("Neo.Contract.Create");
                var scriptPublish = sb.ToArray().toHexString();
                var postArray = [];
                postArray.push(this.chainHash);
                postArray.push(scriptPublish);
                var result = yield WebBrowser.WWW.rpc_invokeScript(postArray);
                var consume = result["gas_consumed"];
                var gas_consumed = parseInt(consume);
                var extdata = new ThinNeo.InvokeTransData();
                extdata.script = sb.ToArray();
                extdata.gas = Neo.Fixed8.Zero;
                var tran = WebBrowser.WWW.makeTran(ThinNeo.Helper.GetAddressFromPublicKey(this.pubkey));
                tran.extdata = extdata;
                var msg = tran.GetMessage();
                var signdata = ThinNeo.Helper.Sign(msg, this.prikey);
                tran.AddWitness(signdata, this.pubkey, ThinNeo.Helper.GetAddressFromPublicKey(this.pubkey));
                var data = tran.GetRawData();
                var rawdata = data.toHexString();
                var postRawArray = [];
                postRawArray.push(this.chainHash);
                postRawArray.push(rawdata);
                var postResult = yield WebBrowser.WWW.rpc_sendrawtransaction(postRawArray);
            });
            var reader = new FileReader();
            reader.onload = (e) => {
                ContractAvm = reader.result;
            };
            file.onchange = (ev) => {
                if (file.files[0].name.includes(".avm")) {
                    reader.readAsArrayBuffer(file.files[0]);
                }
            };
        }
        mainTransaction(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var transactionBackGround = document.createElement('div');
            transactionBackGround.style.width = "100%";
            transactionBackGround.style.cssFloat = "left";
            div.appendChild(transactionBackGround);
            var TransactionText = document.createElement('span');
            TransactionText.textContent = "交易记录";
            transactionBackGround.appendChild(TransactionText);
            var txidText = document.createElement('span');
            txidText.textContent = "TXID";
            transactionBackGround.appendChild(txidText);
            var timeText = document.createElement('span');
            timeText.textContent = "Date";
            transactionBackGround.appendChild(timeText);
        }
        normalCharge(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var normalbackground = document.createElement('div');
            div.appendChild(normalbackground);
            var asset = document.createElement('span');
            normalbackground.appendChild(asset);
            asset.textContent = "资产";
            var select = WebBrowser.CoinTool.ZoroAsset();
            normalbackground.appendChild(select);
            var coin = document.createElement('span');
            normalbackground.appendChild(coin);
            coin.textContent = "余额";
            var coinNum = document.createElement('span');
            normalbackground.appendChild(coinNum);
            coinNum.textContent = "12";
            var addrText = document.createElement('span');
            normalbackground.appendChild(addrText);
            addrText.textContent = "地址";
            var addr = document.createElement('input');
            normalbackground.appendChild(addr);
            var goldText = document.createElement('span');
            normalbackground.appendChild(goldText);
            goldText.textContent = "金额";
            var gold = document.createElement('input');
            normalbackground.appendChild(gold);
            var btnSend = document.createElement('button');
            normalbackground.appendChild(btnSend);
            btnSend.textContent = "发送";
            btnSend.onclick = () => {
            };
        }
        chainCharge(div) {
            if (div.firstChild)
                div.removeChild(div.firstChild);
            var chainbackground = document.createElement('div');
            div.appendChild(chainbackground);
            var asset = document.createElement('span');
            chainbackground.appendChild(asset);
            asset.textContent = "方法";
            var funcSelect = WebBrowser.CoinTool.ZoroFunction();
            chainbackground.appendChild(funcSelect);
            var asset = document.createElement('span');
            chainbackground.appendChild(asset);
            asset.textContent = "资产";
            var coinSelect = document.createElement('select');
            var sitem = document.createElement("option");
            sitem.text = "BCP";
            sitem.value = "BCP";
            coinSelect.appendChild(sitem);
            chainbackground.appendChild(coinSelect);
            var coin = document.createElement('span');
            chainbackground.appendChild(coin);
            coin.textContent = "余额";
            var coinNum = document.createElement('span');
            chainbackground.appendChild(coinNum);
            coinNum.textContent = "12";
            var goldText = document.createElement('span');
            chainbackground.appendChild(goldText);
            goldText.textContent = "金额";
            var gold = document.createElement('input');
            chainbackground.appendChild(gold);
            var btnSend = document.createElement('button');
            chainbackground.appendChild(btnSend);
            btnSend.textContent = "发送";
            btnSend.onclick = () => {
            };
        }
        update() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.chainHash) {
                    var height = yield WebBrowser.WWW.api_getZoroHeight(this.chainHash);
                    this.height.textContent = height.toString();
                }
                else {
                    this.chainHash = "0000000000000000000000000000000000000000";
                    var height = yield WebBrowser.WWW.api_getZoroHeight(this.chainHash);
                    this.height.textContent = height.toString();
                }
                if (height > WebBrowser.WWW.blockHeight) {
                    WebBrowser.WWW.blockHeight = height;
                    WebBrowser.AppChainTool.updateAllAppChain();
                    if (WebBrowser.WWW.chainHashLength < WebBrowser.AppChainTool.appChainLength) {
                        WebBrowser.WWW.chainHashLength = WebBrowser.AppChainTool.appChainLength;
                        this.updateAppChain();
                    }
                }
                this.timeOut = setTimeout(() => { this.update(); }, 1000);
            });
        }
        stopUpdate() {
            clearTimeout(this.timeOut);
        }
        selectClear() {
            if (this.selectAppChain)
                while (this.selectAppChain.childNodes.length > 0) {
                    this.selectAppChain.removeChild(this.selectAppChain.options[0]);
                    this.selectAppChain.remove(0);
                    this.selectAppChain.options[0] = null;
                }
        }
        updateAppChain() {
            return __awaiter(this, void 0, void 0, function* () {
                this.selectClear();
                var name2Hash = yield WebBrowser.AppChainTool.initAllAppChain();
                for (var chainName in name2Hash) {
                    var sitem = document.createElement("option");
                    sitem.text = chainName;
                    sitem.value = name2Hash[chainName];
                    this.selectAppChain.appendChild(sitem);
                }
                this.selectAppChain.selectedIndex = this.selectIndex;
            });
        }
        initAppChain(title) {
            return __awaiter(this, void 0, void 0, function* () {
                var name2Hash = yield WebBrowser.AppChainTool.initAllAppChain();
                for (var chainName in name2Hash) {
                    var sitem = document.createElement("option");
                    sitem.text = chainName;
                    sitem.value = name2Hash[chainName];
                    this.selectAppChain.appendChild(sitem);
                }
                this.selectAppChain.onchange = (ev) => {
                    this.updateHeight();
                };
            });
        }
        updateHeight() {
            return __awaiter(this, void 0, void 0, function* () {
                this.selectIndex = this.selectAppChain.selectedIndex;
                this.chainHash = this.selectAppChain.childNodes[this.selectIndex].value;
                var height = yield WebBrowser.WWW.api_getZoroHeight(this.chainHash);
                this.height.textContent = isNaN(height) ? "N/A" : height.toString();
            });
        }
        start() {
            this.getLangs();
            this.login();
            this.div.hidden = false;
            this.footer.hidden = false;
        }
        close() {
            this.stopUpdate();
            this.div.hidden = true;
            this.footer.hidden = true;
        }
    }
    WebBrowser.GUI = GUI;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
var WebBrowser;
/// <reference path="../app.ts"/>
(function (WebBrowser) {
    class Index {
        constructor(app) {
            this.div = document.getElementById('index-page');
            this.footer = document.getElementById('footer-box');
            this.viewtxlist = document.getElementById("i_viewtxlist");
            this.viewblocks = document.getElementById("i_viewblocks");
            this.alladdress = document.getElementById("i_alladdress");
            this.allblock = document.getElementById("i_allblock");
            this.alltxlist = document.getElementById("i_alltxlist");
            this.cnbtn = document.getElementById("cn-btn");
            this.enbtn = document.getElementById("en-btn");
            this.app = app;
            this.cnbtn.onclick = () => {
                this.app.langmgr.setType("cn");
                sessionStorage.setItem("language", "cn");
                //window.location.reload()
                this.refreshLangs();
            };
            this.enbtn.onclick = () => {
                // $("#en-btn").attr('href', '/' + location.hash);
                this.app.langmgr.setType("en");
                sessionStorage.setItem("language", "en");
                //window.location.reload()
                this.refreshLangs();
            };
        }
        close() {
            this.div.hidden = true;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "i_summary",
                    "i_lastblock", "i_allblock",
                    "i_totaltrans", "i_alltxlist",
                    "i_walletcreate", "i_alladdress",
                    "i_last10", "i_appchain", "i_last10_height", "i_last10_size", "i_last10_ctm", "i_last10_txcount", "i_viewblocks",
                    "i_last10t", "i_last10t_txid", "i_last10t_type", "i_last10t_height", "i_last10t_size", "i_viewtxlist",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        refreshLangs() {
            var page = this.app.routet.render();
            page.getLangs();
            this.app.navbar.getLangs();
            this.app.netWork.getLangs();
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                this.viewtxlist.href = WebBrowser.Url.href_transactions();
                this.viewblocks.href = WebBrowser.Url.href_blocks();
                this.alladdress.href = WebBrowser.Url.href_addresses();
                this.allblock.href = WebBrowser.Url.href_blocks();
                this.alltxlist.href = WebBrowser.Url.href_transactions();
                this.div.hidden = false;
                //查询区块高度(区块数量-1)
                let blockHeight = yield WebBrowser.WWW.api_getHeight();
                //查询交易数量
                let txCount = yield WebBrowser.WWW.gettxcount("");
                //查询地址总数
                let addrCount = yield WebBrowser.WWW.getaddrcount();
                //分页查询区块数据
                let blocks = yield WebBrowser.WWW.getblocks(10, 1);
                //分页查询交易记录
                let txs = yield WebBrowser.WWW.getrawtransactions(10, 1, '');
                $("#blockHeight").text(WebBrowser.NumberTool.toThousands(blockHeight)); //显示在页面
                $("#txcount").text(WebBrowser.NumberTool.toThousands(txCount)); //显示在页面
                $("#addrCount").text(WebBrowser.NumberTool.toThousands(addrCount));
                $("#index-page").find("#blocks").children("tbody").empty();
                $("#index-page").find("#transactions").children("tbody").empty();
                let html_blocks = ``;
                let html_txs = ``;
                blocks.forEach((item, index, input) => {
                    //var newDate = new Date();
                    //newDate.setTime(item.time * 1000);
                    let time = WebBrowser.DateTool.getTime(item.time);
                    var id = item.hash;
                    id.replace('0x', '');
                    id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                    html_blocks += `
                <tr><td>
                <a class="code" target="_self" href ='` + WebBrowser.Url.href_blockh(id) + `' > 
                ` + id + `</a></td>
                <td>` + item.size + ` bytes</td>
                <td>` + time + `</td>
                <td><a class="code" target="_self" href ='` + WebBrowser.Url.href_block(item.index) + `' > 
                ` + item.index + `</a></td>
                <td>` + item.tx.length + `</td></tr>`;
                });
                txs.forEach((tx) => {
                    let txid = tx.txid;
                    let txtype = tx.type.replace("Transaction", "");
                    txid = txid.replace('0x', '');
                    txid = txid.substring(0, 4) + '...' + txid.substring(txid.length - 4);
                    html_txs += `
                <tr>
                <td><a class='code' target='_self'
                 href ='` + WebBrowser.Url.href_transaction(tx.txid) + `' > ` + txid + ` </a>
                </td>
                <td>` + txtype + `
                </td>
                <td> ` + tx.blockindex + `
                </td>
                <td> ` + tx.size + ` bytes
                </td>
                </tr>`;
                });
                $("#index-page").find("#blocks").children("tbody").append(html_blocks);
                $("#index-page").find("#transactions").children("tbody").append(html_txs);
                this.footer.hidden = false;
            });
        }
    }
    WebBrowser.Index = Index;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
/// <reference path="../Entitys.ts"/>
var WebBrowser;
/// <reference path="../app.ts"/>
/// <reference path="../Entitys.ts"/>
(function (WebBrowser) {
    /**
     * @class 交易记录
     */
    class Transactions {
        constructor(app) {
            this.div = document.getElementById("txlist-page");
            this.footer = document.getElementById('footer-box');
            this.app = app;
            this.txlist = $("#txlist-page");
            //监听交易列表选择框
            $("#TxType").change(() => {
                this.pageUtil.currentPage = 1;
                this.updateTransactions(this.pageUtil, $("#TxType").val());
            });
            $("#txlist-page-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                }
                else {
                    this.pageUtil.currentPage += 1;
                    this.updateTransactions(this.pageUtil, $("#TxType").val());
                }
            });
            $("#txlist-page-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                }
                else {
                    this.pageUtil.currentPage -= 1;
                    this.updateTransactions(this.pageUtil, $("#TxType").val());
                }
            });
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "trans_title",
                    "trans_txid",
                    "trans_type",
                    "trans_size",
                    "trans_height",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        //更新交易记录
        updateTransactions(pageUtil, txType) {
            return __awaiter(this, void 0, void 0, function* () {
                this.txlist.find("#txlist-page-transactions").empty();
                //分页查询交易记录
                let txs = yield WebBrowser.WWW.getrawtransactions(pageUtil.pageSize, pageUtil.currentPage, txType);
                let txCount = yield WebBrowser.WWW.gettxcount(txType);
                pageUtil.totalCount = txCount;
                let listLength = 0;
                if (txs.length < 15) {
                    this.txlist.find(".page").hide();
                    listLength = txs.length;
                }
                else {
                    this.txlist.find(".page").show();
                    listLength = pageUtil.pageSize;
                }
                for (var n = 0; n < listLength; n++) {
                    //alert(txs[0].txid + " " + txs[n].txid);
                    let txid = txs[n].txid;
                    let html = yield this.getTxLine(txid, txs[n].type, txs[n].size.toString(), txs[n].blockindex.toString(), txs[n].vin, txs[n].vout);
                    this.txlist.find("#txlist-page-transactions").append(html);
                }
                let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize; //       
                let maxNum = pageUtil.totalCount;
                let diffNum = maxNum - minNum;
                if (diffNum > 15) {
                    maxNum = pageUtil.currentPage * pageUtil.pageSize;
                }
                let pageMsg = "Transactions " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                $("#txlist-page").find("#txlist-page-msg").html(pageMsg);
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#txlist-page-next").removeClass('disabled');
                }
                else {
                    $("#txlist-page-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#txlist-page-previous").removeClass('disabled');
                }
                else {
                    $("#txlist-page-previous").addClass('disabled');
                }
            });
        }
        /**
         * async start
         */
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                let type = $("#TxType").val();
                let txCount = yield WebBrowser.WWW.gettxcount(type);
                //初始化交易列表
                this.pageUtil = new WebBrowser.PageUtil(txCount, 15);
                this.updateTransactions(this.pageUtil, type);
                this.div.hidden = false;
                this.footer.hidden = false;
            });
        }
        getTxLine(txid, type, size, index, vins, vouts) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(vins);
                console.log(JSON.stringify(vins));
                console.log("--------------");
                console.log(vouts);
                console.log(JSON.stringify(vouts));
                var id = txid.replace('0x', '');
                id = id.substring(0, 6) + '...' + id.substring(id.length - 6);
                if (vins.length == 0 && vouts.length == 0) {
                    return `<div class="line">
                            <div class="line-general">
                                <div class="content-nel"><span><a href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + id + `</a></span></div>
                                <div class="content-nel"><span>` + type.replace("Transaction", "") + `</span></div>
                                <div class="content-nel"><span>` + size + ` bytes</span></div>
                                <div class="content-nel"><span><a href="` + WebBrowser.Url.href_block(parseInt(index)) + `" target="_self">` + index + `</a></span></div>
                            </div>
                            <a class="end" id="genbtn" style="border-left:none;"></a>
                        </div>`;
                }
                return `
            <div class="line">
                <div class="line-general">
                    <div class="content-nel"><span><a href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + id + `</a></span></div>
                    <div class="content-nel"><span>` + type.replace("Transaction", "") + `</span></div>
                    <div class="content-nel"><span>` + size + ` bytes</span></div>
                    <div class="content-nel"><span><a href="` + WebBrowser.Url.href_block(parseInt(index)) + `" target="_self">` + index + `</a></span></div>
                </div>
                <a onclick="txgeneral(this)" class="end" id="genbtn"><img src="./img/open.svg" /></a>
                <div class="transaction" style="width:100%;display: none;" vins='` + JSON.stringify(vins) + `' vouts='` + JSON.stringify(vouts) + `'>
                </div>
            </div>
            `;
            });
        }
        static getTxgeneral(vins, vouts, div) {
            return __awaiter(this, void 0, void 0, function* () {
                vins = JSON.parse(vins);
                vouts = JSON.parse(vouts);
                var ajax = new WebBrowser.Ajax();
                let allAsset = yield ajax.post('getallasset', []);
                allAsset.map((asset) => {
                    if (asset.id == WebBrowser.AssetEnum.NEO) {
                        asset.name = [{ lang: 'en', name: 'NEO' }];
                    }
                    if (asset.id == WebBrowser.AssetEnum.GAS) {
                        asset.name = [{ lang: 'en', name: "GAS" }];
                    }
                });
                let arr = new Array();
                for (let index = 0; index < vins.length; index++) {
                    const vin = vins[index];
                    try {
                        let txInfos = yield ajax.post('getrawtransaction', [vin.txid]);
                        let vout = txInfos[0].vout[vin.vout];
                        let address = vout.address;
                        let value = vout.value;
                        let name = allAsset.find(val => val.id == vout.asset).name.map(name => { return name.name; }).join("|");
                        arr.push({ vin: vin.txid, vout: vin.vout, addr: address, name: name, amount: value });
                    }
                    catch (error) {
                    }
                }
                let arra = WebBrowser.Transaction.groupByaddr(arr);
                let form = "";
                for (let index = 0; index < arra.length; index++) {
                    const item = arra[index];
                    let li = '';
                    for (let i = 0; i < item.data.length; i++) {
                        const element = item.data[i];
                        li += `<li>` + element.amount + ` ` + element.name + `</li>`;
                    }
                    form +=
                        `
                <div class="item"><div class="address"><a>` + item.addr + `</a></div><ul class="amount">` + li + `</ul></div>
                `;
                }
                let tostr = "";
                vouts.forEach(vout => {
                    let name = allAsset.find(val => val.id == vout.asset).name.map(name => name.name).join("|");
                    let sign = "";
                    if (arra.find(item => item.addr == vout.address)) {
                        sign = "(change)";
                    }
                    tostr +=
                        `
                <div class="item">
                    <div class="address"><a>` + vout.address + `</a></div>
                    <ul class="amount"><li>` + vout.value + ` ` + name + sign + `</li></ul>
                </div>
                `;
                });
                var res = `
            <div class="formaddr" style="width:41.3%">
                ` + form + `
            </div>
            <div class="turnto"><img src="./img/turnto.svg" /></div>
            <div class="toaddr" style="width:41.3%">
                ` + tostr + `
            </div>
            <div style="width:60px;"></div>
            `;
                div.innerHTML = res;
            });
        }
    }
    WebBrowser.Transactions = Transactions;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    /**
     * @class 交易详情
     */
    class Transaction {
        constructor(app) {
            this.div = document.getElementById("transaction-info");
            this.footer = document.getElementById('footer-box');
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "tran_title",
                    "tran_title_1",
                    "tran_txid",
                    "tran_type",
                    "tran_netfee",
                    "tran_sysfee",
                    "tran_size",
                    "tran_height",
                    "tran_time",
                    "tran_input",
                    "tran_output",
                    "tran_nep5",
                    "tran_nep5_asset",
                    "tran_nep5_from",
                    "tran_nep5_to",
                    "tran_nep5_value",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        start() {
            this.getLangs();
            //this.div.innerHTML = pages.transaction;
            this.updateTxInfo(WebBrowser.locationtool.getParam());
            let href = WebBrowser.locationtool.getUrl() + "/transactions";
            let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get("tran_goalltran") + '</a>';
            $("#goalltrans").empty();
            $("#goalltrans").append(html);
            this.div.hidden = false;
            this.footer.hidden = false;
        }
        updateTxInfo(txid) {
            return __awaiter(this, void 0, void 0, function* () {
                let txInfo = yield WebBrowser.WWW.getrawtransaction(txid);
                $("#type").text(txInfo.type.replace("Transaction", ""));
                $("#txid").text(txInfo.txid);
                $("#blockindex").empty();
                $("#blockindex").append("<a href='" + WebBrowser.Url.href_block(txInfo.blockindex) + "'>" + txInfo.blockindex + "</a>");
                $("#txsize").text(txInfo.size + " bytes");
                $("#sysfee").text(txInfo["sys_fee"] + " gas");
                $("#netfee").text(txInfo["net_fee"] + " gas");
                let ajax = new WebBrowser.Ajax();
                let blocks = yield WebBrowser.WWW.getblock(txInfo.blockindex); //let blocks: Block[] = await ajax.post('getblock', [txInfo.blockindex]);
                let block = blocks[0];
                let time = WebBrowser.DateTool.getTime(block.time);
                $("#transaction-time").text(time);
                //let allAsset: Asset[] = await WWW.api_getAllAssets();
                let arr = new Array();
                for (let index = 0; index < txInfo.vin.length; index++) {
                    const vin = txInfo.vin[index];
                    try {
                        let txInfo = yield WebBrowser.WWW.getrawtransaction(vin.txid);
                        let vout = txInfo.vout[vin.vout];
                        let address = vout.address;
                        let value = vout.value;
                        let name = WebBrowser.CoinTool.assetID2name[vout.asset];
                        arr.push({ vin: vin.txid, vout: vin.vout, addr: address, name: name, amount: value });
                    }
                    catch (error) {
                    }
                }
                $("#from").empty();
                let array = Transaction.groupByaddr(arr);
                for (let index = 0; index < array.length; index++) {
                    const item = array[index];
                    let html = "";
                    html += '<div class="line" > <div class="title-nel" > <span>Address </span></div >';
                    html += '<div class="content-nel" > <span id="size" >' + item.addr + ' </span></div > </div>';
                    for (let i = 0; i < item.data.length; i++) {
                        const element = item.data[i];
                        html += '<div class="line" > <div class="title-nel" > <span>' + element.name + ' </span></div >';
                        html += '<div class="content-nel" > <span id="size" >' + element.amount + ' </span></div > </div>';
                    }
                    $("#from").append(html);
                }
                $("#to").empty();
                txInfo.vout.forEach(vout => {
                    let name = WebBrowser.CoinTool.assetID2name[vout.asset];
                    let sign = "";
                    if (array.find(item => item.addr == vout.address)) {
                        sign = "(change)";
                    }
                    let html = "";
                    html += '<div class="line" > <div class="title-nel" > <span>Address </span></div >';
                    html += '<div class="content-nel" > <span id="size" >' + vout.address + ' </span></div > </div>';
                    html += '<div class="line" > <div class="title-nel" > <span>' + name + ' </span></div >';
                    html += '<div class="content-nel" > <span id="size" >' + vout.value + sign + ' </span></div > </div>';
                    $("#to").append(html);
                });
                $("#txidnep5").empty();
                let txidNep = yield WebBrowser.WWW.api_getnep5transferbytxid(txid);
                //console.log(txidNep);
                if (txidNep) {
                    $(".txidnep-warp").show();
                    txidNep.forEach((item) => {
                        this.loadTxidNep5View(item.asset, item.from, item.to, item.value);
                    });
                }
                else {
                    $(".txidnep-warp").hide();
                }
            });
        }
        loadTxidNep5View(asset, from, to, value) {
            return __awaiter(this, void 0, void 0, function* () {
                let href = WebBrowser.Url.href_nep5(asset);
                let nep5Name = yield WebBrowser.WWW.api_getnep5(asset);
                let html = `
                    <tr>
                    <td> <a href="` + href + `" target="_self">` + nep5Name[0].name + `</a></td>
                    <td>` + from + `</td>
                    <td>` + to + `</td>
                    <td>` + value + `</td>
                    </tr>`;
                $("#txidnep5").append(html);
            });
        }
        static groupByaddr(arr) {
            var map = {}, dest = [];
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!map[ai.addr]) {
                    dest.push({
                        addr: ai.addr,
                        data: [ai]
                    });
                    map[ai.addr] = ai;
                }
                else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if (dj.addr == ai.addr) {
                            dj.data.push(ai);
                            break;
                        }
                    }
                }
            }
            return dest;
        }
    }
    WebBrowser.Transaction = Transaction;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
var WebBrowser;
/// <reference path="../app.ts"/>
(function (WebBrowser) {
    class Nep5page {
        constructor(app) {
            this.div = document.getElementById("asset-info");
            this.footer = document.getElementById('footer-box');
            this.actxcount = 0;
            this.acblockcount = 0;
            this.acaddcount = 0;
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                let page_lang = [
                    "asset_title",
                    "asset_id",
                    "asset_asset",
                    "asset_type",
                    "asset_ava",
                    "asset_pre",
                    "asset_adm",
                    "asset_title2",
                    "asset_rank",
                    "asset_addr",
                    "asset_balance",
                    "asset_title3",
                    "asset_txid",
                    "asset_from",
                    "asset_to",
                    "asset_height",
                ];
                page_lang.forEach(lang => {
                    document.getElementById(lang).textContent = this.app.langmgr.get(lang);
                });
                this.langType = this.app.langmgr.type;
            }
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getLangs();
                var nep5id = WebBrowser.locationtool.getParam();
                let href = WebBrowser.locationtool.getUrl() + "/assets";
                let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get('asset_goallasset') + '</a>';
                $("#goallasset").empty();
                $("#goallasset").append(html);
                this.loadNep5InfoView(nep5id);
                this.acaddcount = yield WebBrowser.WWW.api_getAppchainAddrcount(nep5id);
                this.acblockcount = yield WebBrowser.WWW.api_getAppchainBlockcount(nep5id);
                this.rankPageUtil = new WebBrowser.PageUtil(this.acblockcount[0].blockcount, 10);
                this.updateAssetBalanceView(nep5id, this.rankPageUtil);
                var assetType = WebBrowser.locationtool.getType();
                if (assetType == 'nep5') {
                    //$(".asset-nep5-warp").show();
                    this.actxcount = yield WebBrowser.WWW.getappchaintxcount(nep5id);
                    this.pageUtil = new WebBrowser.PageUtil(this.actxcount[0].txcount, 10);
                    this.updateNep5TransView(nep5id, this.pageUtil);
                    $(".asset-tran-warp").show();
                }
                else {
                    //$(".asset-nep5-warp").hide();
                    $(".asset-tran-warp").hide();
                }
                //排行翻页
                $("#assets-balance-next").off("click").click(() => {
                    if (this.rankPageUtil.currentPage == this.rankPageUtil.totalPage) {
                        this.rankPageUtil.currentPage = this.rankPageUtil.totalPage;
                    }
                    else {
                        this.rankPageUtil.currentPage += 1;
                        this.updateAssetBalanceView(nep5id, this.rankPageUtil);
                    }
                });
                $("#assets-balance-previous").off("click").click(() => {
                    if (this.rankPageUtil.currentPage <= 1) {
                        this.rankPageUtil.currentPage = 1;
                    }
                    else {
                        this.rankPageUtil.currentPage -= 1;
                        this.updateAssetBalanceView(nep5id, this.rankPageUtil);
                    }
                });
                //交易翻页
                $("#assets-tran-next").off("click").click(() => {
                    if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                        this.pageUtil.currentPage = this.pageUtil.totalPage;
                    }
                    else {
                        this.pageUtil.currentPage += 1;
                        this.updateNep5TransView(nep5id, this.pageUtil);
                    }
                });
                $("#assets-tran-previous").off("click").click(() => {
                    if (this.pageUtil.currentPage <= 1) {
                        this.pageUtil.currentPage = 1;
                    }
                    else {
                        this.pageUtil.currentPage -= 1;
                        this.updateNep5TransView(nep5id, this.pageUtil);
                    }
                });
                this.div.hidden = false;
                this.footer.hidden = false;
            });
        }
        close() {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        //nep5的详情
        loadNep5InfoView(nep5id) {
            WebBrowser.WWW.api_getAppchain(nep5id).then((data) => {
                var nep5 = data[0];
                let time = WebBrowser.DateTool.getTime(nep5.timestamp);
                $("#name").text(nep5.name);
                $("#type").text(time);
                $("#id").text(nep5.hash);
                $("#available").text(this.acblockcount.toString());
                $("#precision").text(this.actxcount.toString());
                $("#admin").text(this.acaddcount.toString());
            });
        }
        updateAssetBalanceView(nep5id, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                let balanceList = yield WebBrowser.WWW.getappchainblocks(nep5id, pageUtil.pageSize, pageUtil.currentPage);
                $("#assets-balance-list").empty();
                if (balanceList) {
                    // let rank = (pageUtil.currentPage-1)*10 +1;
                    balanceList.forEach((item) => {
                        let href = WebBrowser.Url.href_address(item.hash);
                        this.loadAssetBalanceView(item.hash, item.size, item.time, item.index, item.tx.length);
                        //  rank++;
                    });
                }
                else {
                    let html = '<tr><td colspan="3" >' + this.app.langmgr.get('no_data') + '</td></tr>';
                    $("#assets-balance-list").append(html);
                    if (pageUtil.currentPage == 1) {
                        $(".asset-balance-page").hide();
                    }
                    else {
                        $("#assets-balance-next").addClass('disabled');
                        $(".asset-balance-page").show();
                    }
                }
                if (pageUtil.totalCount > 10) {
                    if (pageUtil.totalPage - pageUtil.currentPage) {
                        $("#assets-balance-next").removeClass('disabled');
                    }
                    else {
                        $("#assets-balance-next").addClass('disabled');
                    }
                    if (pageUtil.currentPage - 1) {
                        $("#assets-balance-previous").removeClass('disabled');
                    }
                    else {
                        $("#assets-balance-previous").addClass('disabled');
                    }
                    let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                    let maxNum = pageUtil.totalCount;
                    let diffNum = maxNum - minNum;
                    if (diffNum > 10) {
                        maxNum = pageUtil.currentPage * pageUtil.pageSize;
                    }
                    let pageMsg = "Balance Rank " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                    $("#assets-balance-msg").html(pageMsg);
                    $(".asset-balance-page").show();
                }
                else {
                    $(".asset-balance-page").hide();
                }
            });
        }
        updateNep5TransView(nep5id, pageUtil) {
            return __awaiter(this, void 0, void 0, function* () {
                let tranList = yield WebBrowser.WWW.getappchainrawtransactions(nep5id, pageUtil.pageSize, pageUtil.currentPage);
                $("#assets-tran-list").empty();
                if (tranList) {
                    tranList.forEach((item) => {
                        if (!item.vin) {
                            item.type = '-';
                        }
                        if (!item.size) {
                            item.type = '-';
                        }
                        this.loadAssetTranView(item.txid, item.type, item.size, item.blockindex);
                    });
                }
                else {
                    let html = '<tr><td colspan="4" >' + this.app.langmgr.get('no_data') + '</td></tr>';
                    $("#assets-tran-list").append(html);
                    if (pageUtil.currentPage == 1) {
                        $(".asset-tran-page").hide();
                    }
                    else {
                        $(".asset-tran-page").show();
                    }
                }
                if (pageUtil.totalCount > 10) {
                    if (pageUtil.totalPage - pageUtil.currentPage) {
                        $("#assets-tran-next").removeClass('disabled');
                    }
                    else {
                        $("#assets-tran-next").addClass('disabled');
                    }
                    if (pageUtil.currentPage - 1) {
                        $("#assets-tran-previous").removeClass('disabled');
                    }
                    else {
                        $("#assets-tran-previous").addClass('disabled');
                    }
                    let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                    let maxNum = pageUtil.totalCount;
                    let diffNum = maxNum - minNum;
                    if (diffNum > 10) {
                        maxNum = pageUtil.currentPage * pageUtil.pageSize;
                    }
                    let pageMsg = "Transactions " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                    $("#assets-tran-msg").html(pageMsg);
                    $(".asset-tran-page").show();
                }
                else {
                    $(".asset-tran-page").hide();
                }
            });
        }
        loadAssetTranView(txid, from, to, blockindex) {
            let html = `
                    <tr>
                    <td><a class="code omit" href="` + WebBrowser.Url.href_transaction(txid) + `" target="_self">` + txid.replace('0x', '') + `
                    </a></td>
                    <td>` + from + `
                    </td>
                    <td>` + to + `
                    </td>
                    <td>` + blockindex + `</td>
                    </tr>`;
            $("#assets-tran-list").append(html);
        }
        loadAssetBalanceView(href, size, time, height, txcount) {
            //let tm = DateTool.getTime(balancelist.timestamp);
            let html = `
                    <tr>
                    <td><a target="_self" href="` + href + `">` + href + `
                    </a></td>
                     <td>` + size + `</td> 
                    <td>` + time + `
                    </td>
                    <td>` + height + `</td>
                    <td>` + txcount + `</td>
                    </tr>`;
            $("#assets-balance-list").append(html);
        }
    }
    WebBrowser.Nep5page = Nep5page;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
var WebBrowser;
/// <reference path="../app.ts"/>
(function (WebBrowser) {
    class Notfound {
        constructor(app) {
            this.app = app;
        }
        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                this.langType = this.app.langmgr.type;
            }
        }
        start() {
            this.getLangs();
            this.btn = document.getElementById("notfound");
            this.btn.onclick = () => {
                window.location.href = WebBrowser.locationtool.getUrl();
            };
            $(".notfound").show();
        }
        close() {
            $('.notfound').hide();
        }
    }
    WebBrowser.Notfound = Notfound;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class locationtool {
        static getNetWork() {
            var hash = window.location.hash;
            let arr = hash.split("/");
            return arr[0].replace("#", "");
        }
        static getUrl() {
            var href = window.location.href;
            let arr = href.split("#");
            var hash = window.location.hash;
            let hasharr = hash.split("/");
            let net = (hasharr[0] != "#mainnet" && hasharr[0] != "#testnet") ? "#mainnet" : hasharr[0];
            return arr[0] + net;
        }
        static getPage() {
            var page = location.hash;
            var arr = page.split('/');
            if (arr.length == 1 && (arr[0] == "#mainnet" || arr[0] == "#testnet"))
                page = 'explorer';
            else
                page = arr[1];
            return page;
        }
        static getParam() {
            var page = location.hash;
            var arr = page.split('/');
            return arr[2];
        }
        static getType() {
            var page = location.hash;
            var arr = page.split('/');
            return arr[1];
        }
    }
    WebBrowser.locationtool = locationtool;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class NumberTool {
        static toThousands(num) {
            var num = (num || 0).toString(), result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + result;
            }
            return result;
        }
    }
    WebBrowser.NumberTool = NumberTool;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts"/>
/// <reference path="../Entitys.ts"/>
var WebBrowser;
/// <reference path="../app.ts"/>
/// <reference path="../Entitys.ts"/>
(function (WebBrowser) {
    class Route {
        constructor(app) {
            this.pagelist = new Array();
            this.app = app;
        }
        start() {
            this.pagelist.push(this.app.indexpage);
            this.pagelist.push(this.app.blocks);
            this.pagelist.push(this.app.block);
            this.pagelist.push(this.app.transactions);
            this.pagelist.push(this.app.transaction);
            this.pagelist.push(this.app.addresses);
            this.pagelist.push(this.app.address);
            this.pagelist.push(this.app.assets);
            this.pagelist.push(this.app.assetinfo);
            this.pagelist.push(this.app.guiinfo);
            this.closePages();
            var hash = location.hash;
            if (hash == "") {
                this.app.netmgr.change(() => {
                    window.location.hash = "#mainnet";
                });
                return;
            }
            var netType = 1;
            let arr = hash.split('/');
            if (arr[0] == "#testnet") {
                netType = 2;
            }
            if (netType == 1) {
                this.app.netWork.changeNetWork('mainnet');
            }
            else {
                this.app.netWork.changeNetWork('testnet');
            }
            this.app.netmgr.change(() => {
                WebBrowser.CoinTool.initAllAsset();
                var page = this.render();
                page.start();
            }, netType);
        }
        render() {
            var page = WebBrowser.locationtool.getPage();
            switch (page) {
                case "explorer":
                    this.app.navbar.indexBtn.classList.add("active");
                    return this.app.indexpage;
                case "blocks":
                    this.app.navbar.blockBtn.classList.add("active");
                    return this.app.blocks;
                case "block":
                    this.app.navbar.blockBtn.classList.add("active");
                    return this.app.block;
                case "transactions":
                    this.app.navbar.txlistBtn.classList.add("active");
                    return this.app.transactions;
                case "transaction":
                    this.app.navbar.txlistBtn.classList.add("active");
                    return this.app.transaction;
                case "addresses":
                    this.app.navbar.addrsBtn.classList.add("active");
                    return this.app.addresses;
                case "address":
                    this.app.navbar.addrsBtn.classList.add("active");
                    return this.app.address;
                case "assets":
                    this.app.navbar.assetBtn.classList.add("active");
                    return this.app.assets;
                case "gui":
                    this.app.navbar.guiBtn.classList.add("active");
                    return this.app.guiinfo;
                // case "nnsevent":
                //     this.app.navbar.nnsBtn.classList.add("active");
                //     return this.app.nnses;
                // case "nnsauction":
                //     this.app.navbar.nnsBtn.classList.add("active");
                //     return this.app.nnsbeing;
                // case "nnsrank":
                //     this.app.navbar.nnsBtn.classList.add("active");
                //     return this.app.nnsrank;
                // case "nns":
                //     this.app.navbar.nnsBtn.classList.add("active");
                //     return this.app.nnsinfo;
                case "asset":
                    this.app.navbar.assetBtn.classList.add("active");
                    return this.app.assetinfo;
                case "nep5":
                    return this.app.nep5;
                default:
                    return this.app.notfound;
            }
        }
        closePages() {
            let i = 0;
            while (i < this.pagelist.length) {
                this.pagelist[i].close();
                i++;
                this.app.navbar.indexBtn.classList.remove("active");
                this.app.navbar.blockBtn.classList.remove("active");
                this.app.navbar.txlistBtn.classList.remove("active");
                this.app.navbar.addrsBtn.classList.remove("active");
                this.app.navbar.assetBtn.classList.remove("active");
                this.app.navbar.guiBtn.classList.remove("active");
                // this.app.navbar.nnsBtn.classList.remove("active");
            }
        }
    }
    WebBrowser.Route = Route;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class LangBase {
        get(key) {
            if (this.lang.hasOwnProperty(key)) {
                return this.lang[key];
            }
            return "";
        }
    }
    WebBrowser.LangBase = LangBase;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="./LangBase.ts" />
var WebBrowser;
/// <reference path="./LangBase.ts" />
(function (WebBrowser) {
    class LangCN extends WebBrowser.LangBase {
        constructor() {
            super(...arguments);
            this.lang = {
                connect_nodes_error: "服务器通讯异常，请刷新重新连接！",
                // navbar
                nav_indexa: "浏览器",
                nav_browsea: "浏览",
                nav_blocka: "区块",
                nav_txlista: "交易",
                nav_addrsa: "地址",
                nav_guia: "钱包",
                nav_asseta: "应用连",
                nav_errContent: "请输入正确的地址",
                // network
                net_testa: "测试网",
                net_maina: "主网",
                net_cn: "中文",
                net_en: "English",
                // index
                i_summary: "统计",
                i_lastblock: "上一个区块",
                i_allblock: "查看所有区块",
                i_totaltrans: "交易总数",
                i_alltxlist: "查看所有交易",
                i_walletcreate: "已创建的钱包地址数",
                i_alladdress: "查看所有地址",
                i_last10: "最新的10个区块",
                i_appchain: "应用连",
                i_last10_height: "高度",
                i_last10_size: "大小",
                i_last10_ctm: "创建时间",
                i_last10_txcount: "交易数量",
                i_viewblocks: "查看所有 >>>>",
                i_last10t: "最新的10笔交易",
                i_last10t_txid: "交易ID",
                i_last10t_type: "类型",
                i_last10t_height: "高度",
                i_last10t_size: "大小",
                i_viewtxlist: "查看所有 >>>>",
                // blocks
                blocks_title: "区块列表",
                blocks_height: "区块高度",
                blocks_size: "大小",
                blocks_time: "时间",
                blocks_txcount: "交易数量",
                // block
                block_info_title: "区块信息",
                blocks_appchain: "应用连",
                block_info_block: "区块",
                block_info_hash: "哈希",
                block_info_time: "时间",
                block_info_size: "大小",
                block_info_pre: "上一个区块",
                block_info_next: "下一个区块",
                block_info_tran: "交易",
                block_info_txid: "交易ID",
                block_info_type: "类型",
                block_info_txsize: "大小",
                block_info_ver: "版本",
                block_goallblock: "返回",
                // transactions
                trans_title: "交易列表",
                trans_txid: "交易ID",
                trans_type: "类型",
                trans_size: "大小",
                trans_height: "区块高度",
                // transaction
                tran_title: "交易信息",
                tran_title_1: "交易",
                tran_txid: "交易ID",
                tran_type: "类型",
                tran_netfee: "网络费用",
                tran_sysfee: "系统费用",
                tran_size: "大小",
                tran_height: "区块高度",
                tran_time: "时间",
                tran_input: "输入",
                tran_output: "输出",
                tran_nep5: "Nep5",
                tran_nep5_asset: "资产",
                tran_nep5_from: "转出",
                tran_nep5_to: "转入",
                tran_nep5_value: "交易数",
                tran_goalltran: "返回",
                // addresses
                addrs_title: "地址列表",
                addrs_addr: "地址",
                addrs_first: "首次交易时间",
                addrs_last: "上次交易时间",
                addrs_txcount: "交易笔数",
                // address
                addr_title: "地址详情",
                addr_addr: "地址",
                addr_ctm: "创建时间",
                addr_tran: "交易总数",
                addr_title2: "资产",
                addr_title3: "交易",
                addr_txid: "交易ID",
                addr_type: "交易类型",
                addr_time: "时间",
                addr_utxo_asset: "资产",
                addr_utxo_number: "交易数量",
                addr_utxo_txid: "交易ID",
                addr_goalladress: "返回",
                // appchains
                assets_title: "应用连",
                assets_asset: "应用连名",
                assets_id: "应用连哈希",
                assets_type: "主人",
                assets_ava: "生成时间",
                assets_pre: "版本",
                // appchain
                asset_title: "应用连信息",
                asset_id: "应用连",
                asset_asset: "应用连名",
                asset_type: "生成时间",
                asset_ava: "高度",
                asset_pre: "连上交易数",
                asset_adm: "连上地址数",
                asset_title2: "应用连区块",
                asset_rank: "哈希",
                asset_addr: "大小",
                asset_balance: "时间",
                asset_blockheight: "高度",
                asset_tx: "交易数",
                asset_title3: "应用连交易",
                asset_txid: "交易ID",
                asset_from: "类型",
                asset_to: "大小",
                asset_height: "区块高度",
                asset_goallasset: "返回",
                no_data: "没有数据",
            };
        }
    }
    WebBrowser.LangCN = LangCN;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="./LangBase.ts" />
var WebBrowser;
/// <reference path="./LangBase.ts" />
(function (WebBrowser) {
    class LangEN extends WebBrowser.LangBase {
        constructor() {
            super(...arguments);
            this.lang = {
                connect_nodes_error: "Abnormal connection with the server, please refresh and reconnect.",
                // navbar
                nav_indexa: "Explorer",
                nav_browsea: "Browse",
                nav_blocka: "Blocks",
                nav_txlista: "Transactions",
                nav_addrsa: "Addresses",
                nav_guia: "WEB-GUI",
                nav_asseta: "App Chains",
                nav_errContent: "Please enter the correct address",
                // network
                net_testa: "TestNet",
                net_maina: "MainNet",
                net_cn: "中文",
                net_en: "English",
                // index
                i_summary: "Dashboard",
                i_lastblock: "Last block",
                i_allblock: "View all blocks",
                i_totaltrans: "Total transactions",
                i_alltxlist: "View all transactions",
                i_walletcreate: "Wallet address created",
                i_alladdress: "View all addresses",
                i_last10: "Last 10 Blocks",
                i_appchain: "Hash",
                i_last10_height: "Height",
                i_last10_size: "Size",
                i_last10_ctm: "Time Created",
                i_last10_txcount: "Tx count",
                i_viewblocks: "View all >>>>",
                i_last10t: "Last 10 Transactions",
                i_last10t_txid: "TXID",
                i_last10t_type: "Type",
                i_last10t_height: "Height",
                i_last10t_size: "Size",
                i_viewtxlist: "View all >>>>",
                // blocks
                blocks_title: "Blocks",
                blocks_appchain: "App Chain Hash",
                blocks_height: "Height",
                blocks_size: "Size",
                blocks_time: "Time",
                blocks_txcount: "Tx count",
                // block
                block_info_title: "Block Information",
                block_info_block: "Block",
                block_info_hash: "Hash",
                //block_info_chainhash: "App Chain Hash",
                block_info_time: "Time",
                block_info_size: "Size",
                block_info_pre: "Previous Block",
                block_info_next: "Next Block",
                block_info_tran: "Transactions",
                block_info_txid: "TXID",
                block_info_type: "Type",
                block_info_txsize: "Size",
                block_info_ver: "Version",
                block_goallblock: "Back to all blocks",
                // transactions
                trans_title: "Transactions",
                trans_txid: "TXID",
                trans_type: "Type",
                trans_size: "Size",
                trans_height: "Height",
                // transaction
                tran_title: "Transaction Information",
                tran_title_1: "Transaction",
                tran_txid: "TXID",
                tran_type: "Type",
                tran_netfee: "Network Fee",
                tran_sysfee: "System Fee",
                tran_size: "Size",
                tran_height: "Height",
                tran_time: "Time",
                tran_input: "Input",
                tran_output: "Output",
                tran_nep5: "Nep5",
                tran_nep5_asset: "Asset",
                tran_nep5_from: "From",
                tran_nep5_to: "To",
                tran_nep5_value: "Value",
                tran_goalltran: "Back to all transactions",
                // addresses
                addrs_title: "Address list",
                addrs_addr: "Address",
                addrs_first: "First transaction time",
                addrs_last: "Last transaction time",
                addrs_txcount: "Txcount",
                // address
                addr_title: "Address Information",
                addr_addr: "Address",
                addr_ctm: "Created",
                addr_tran: "Transactions",
                addr_title2: "Balance",
                addr_title3: "Transactions",
                addr_txid: "TXID",
                addr_type: "Type",
                addr_time: "Time",
                addr_utxo_asset: "Asset",
                addr_utxo_number: "Number",
                addr_utxo_txid: "TXID",
                addr_goalladress: "Back to all addresses",
                // assets
                assets_title: "App Chains",
                assets_asset: "App Chain Name",
                assets_id: "App Chain Hash",
                assets_type: "Owner",
                assets_ava: "Time Created",
                assets_pre: "Version",
                // asset
                asset_title: "App Chain Information",
                asset_id: "App Chain Hash",
                asset_asset: "App Chain Name",
                asset_type: "Time Created",
                asset_ava: "Seedlist",
                asset_pre: "Validators",
                asset_adm: "Owner",
                asset_title2: "App Chain Blocks",
                asset_rank: "Hash",
                asset_addr: "Size",
                asset_balance: "Time",
                asset_blockheight: "Height",
                asset_tx: "Tx Count",
                asset_title3: "App Chain Transactions",
                asset_txid: "TXID",
                asset_from: "Type",
                asset_to: "Size",
                asset_height: "Height",
                asset_goallasset: "Back to all app chains",
                no_data: "There is no data",
            };
        }
    }
    WebBrowser.LangEN = LangEN;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="./LangCN.ts" />
/// <reference path="./LangEN.ts" />
var WebBrowser;
/// <reference path="./LangCN.ts" />
/// <reference path="./LangEN.ts" />
(function (WebBrowser) {
    class LangMgr {
        constructor(type = "") {
            // this.setType(type)
        }
        setType(type) {
            console.log("[WebBrowser]", '[LangMgr]', 'setType, type => ', type, ', this.type => ', this.type);
            if (this.type == type) {
                // 语言包一致，不需要重置
                return false;
            }
            switch (type) {
                case "en":
                    this.lang = new WebBrowser.LangEN();
                    this.type = type;
                    break;
                default:
                    this.lang = new WebBrowser.LangCN();
                    this.type = "cn";
                    break;
            }
            return true;
        }
        get(key, ext = null) {
            var src = this.lang.get(key);
            if (ext) {
                for (let k in ext) {
                    let rk = '%' + k + '%';
                    src = src.replace(rk, ext[k]);
                }
            }
            return src;
        }
    }
    WebBrowser.LangMgr = LangMgr;
})(WebBrowser || (WebBrowser = {}));
var WebBrowser;
(function (WebBrowser) {
    class Connector {
        constructor(hosts, check_params, check_type = "") {
            this.hosts = hosts;
            this.check_params = check_params;
            this.check_type = check_type;
            this.fetch_error = [];
        }
        getOne(callback) {
            try {
                this.hosts.forEach(host => {
                    // let url_head = host.substr(0, 2) === "//" ? Main.urlHead : ""
                    let url_head = "";
                    let url = url_head + host + this.check_params;
                    fetch(url).then((response) => __awaiter(this, void 0, void 0, function* () {
                        if (response.ok) {
                            switch (this.check_type) {
                                case "node":
                                case "cli":
                                    try {
                                        let json = yield response.json();
                                        if (json["result"][0]["indexx"]) {
                                            if (!this.first_host) {
                                                this.first_host = url_head + host;
                                                callback(this.first_host, json);
                                                return;
                                            }
                                        }
                                    }
                                    catch (e) { }
                                    this.fetch_error.push(host);
                                    return;
                                case "api":
                                default:
                                    let res = yield response.text();
                                    if (!this.first_host) {
                                        this.first_host = url_head + host;
                                        callback(this.first_host, res);
                                    }
                                    return;
                            }
                        }
                        else {
                            this.fetch_error.push(host);
                        }
                    }), error => {
                        this.fetch_error.push(host);
                        console.log("[BlaCat]", '[Connector]', 'getOne, fetch err => ', error);
                    });
                });
            }
            catch (e) {
                console.log("[BlaCat]", '[Connector]', 'getOne, error => ', e.toString());
            }
            // setTimeout(() => {
            //     if (!this.first_host) {
            //         callback(false)
            //     }
            // }, 5000)
            this.check_results(callback);
        }
        check_results(callback) {
            console.log("[BlaCat]", '[Connector]', 'do check_results ...');
            setTimeout(() => {
                if (!this.first_host) {
                    if (this.fetch_error.length == this.hosts.length) {
                        console.log("[BlaCat]", '[Connector]', 'check_results, all fetch_error => ', this.fetch_error);
                        callback(false, null);
                    }
                    else {
                        this.check_results(callback);
                    }
                }
            }, 500);
        }
    }
    WebBrowser.Connector = Connector;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../app.ts" />
/// <reference path="./Connector.ts" />
var WebBrowser;
/// <reference path="../app.ts" />
/// <reference path="./Connector.ts" />
(function (WebBrowser) {
    class NetMgr {
        constructor(app) {
            //url = "localhost";
            this.url = "115.159.68.43";
            this.app = app;
            this.types = [1, 2];
            this.nodes = {};
            this.nodes[1] = [
                // 主网nelnode
                ["CN", "http://" + this.url + ":59908/api/mainnet", "_1", "http://" + this.url + ":59908/api/mainnet"],
            ];
            this.nodes[2] = [
                // 测试网nelnode
                ["CN", "http://" + this.url + ":59908/api/testnet", "_1", "http://" + this.url + ":59908/api/testnet"],
            ];
            this.nodes_server = {};
            this.default_type = 1;
        }
        // 选择nelnode节点
        selectNode(callback, type, force = 0) {
            if (force == 0 && this.nodes_server && this.nodes_server.hasOwnProperty(type) && this.nodes_server[type]) {
                WebBrowser.WWW.api = this.nodes_server[type];
                WebBrowser.WWW.apiaggr = this.getScanHost(WebBrowser.WWW.api, type);
                console.log("[WebBrowser]", '[NetMgr]', 'selectNode, node_api => ', WebBrowser.WWW.api);
                console.log("[WebBrowser]", '[NetMgr]', 'selectNode, node_scan => ', WebBrowser.WWW.apiaggr);
                callback();
                return;
            }
            this._selectNode(callback, type, force);
        }
        _selectNode(callback, type, force) {
            var conn = new WebBrowser.Connector(this.getHosts(this.nodes[type]), "?jsonrpc=2.0&id=1&method=getblockcount&params=[]", 'node');
            conn.getOne((res, response) => {
                if (res === false) {
                    // 失败提示
                    alert(this.app.langmgr.get("connect_nodes_error"));
                    return;
                }
                this.nodes_server[type] = res;
                WebBrowser.WWW.api = this.nodes_server[type];
                WebBrowser.WWW.apiaggr = this.getScanHost(WebBrowser.WWW.api, type);
                console.log("[WebBrowser]", '[NetMgr]', '_selectNode, node_api => ', WebBrowser.WWW.api);
                console.log("[WebBrowser]", '[NetMgr]', '_selectNode, node_scan => ', WebBrowser.WWW.apiaggr);
                callback();
            });
        }
        // 选择/切换网络
        change(callback, type = null) {
            if (!type) {
                type = this.default_type;
            }
            console.log("[WebBrowser]", '[NetMgr]', 'change, type => ', type);
            switch (type) {
                case 1: // 主网
                    this.change2Main(callback);
                    break;
                case 2: // 测试网
                    this.change2test(callback);
                    break;
            }
        }
        setDefault(type) {
            console.log("[WebBrowser]", '[NetMgr]', 'setDefault, type => ', type);
            this.default_type = type;
        }
        change2test(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                // 节点地址
                this.selectNode(() => {
                    // 测试网
                    this.type = 2;
                    // 回调
                    callback();
                }, 2);
            });
        }
        change2Main(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                // 节点地址
                this.selectNode(() => {
                    // 主网
                    this.type = 1;
                    // 回调
                    callback();
                }, 1);
            });
        }
        getOtherTypes() {
            var res = new Array();
            for (let k = 0; k < this.types.length; k++) {
                if (this.types[k] !== this.type) {
                    res.push(this.types[k]);
                }
            }
            return res;
        }
        getHosts(hosts) {
            var res = [];
            hosts.forEach(host => {
                res.push(host[1]);
            });
            return res;
        }
        // 获取当前节点信息，type: clis，nodes
        getCurrNodeInfo(type) {
            var info = null;
            if (this[type][this.type].length > 0) {
                for (let i = 0; i < this[type][this.type].length; i++) {
                    if (this[type][this.type][i][1] == this[type + "_server"][this.type]) {
                        return this[type][this.type][i];
                    }
                }
            }
            return info;
        }
        getNodeLists(type) {
            var lists = [];
            if (this[type] && this[type][this.type]) {
                return this[type][this.type];
            }
            return lists;
        }
        setNode(type, url) {
            this[type + "_server"][this.type] = url;
            WebBrowser.WWW.api = url;
            WebBrowser.WWW.apiaggr = this.getScanHost(WebBrowser.WWW.api, type);
            console.log("[WebBrowser]", '[NetMgr]', 'setNode, node_api => ', WebBrowser.WWW.api);
            console.log("[WebBrowser]", '[NetMgr]', 'setNode, node_scan => ', WebBrowser.WWW.apiaggr);
        }
        getScanHost(apiHost, type) {
            var scan = "";
            for (let i = 0; i < this.nodes[type].length; i++) {
                if (this.nodes[type][i][1] == apiHost) {
                    return this.nodes[type][i][3];
                }
            }
            return scan;
        }
    }
    WebBrowser.NetMgr = NetMgr;
})(WebBrowser || (WebBrowser = {}));
/// <reference path="../lib/neo-ts.d.ts"/>
/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference path="./pages/block.ts" />
/// <reference path="./pages/blocks.ts" />
/// <reference path="./pages/address.ts" />
/// <reference path="./pages/addresses.ts" />
/// <reference path="./pages/asset.ts" />
/// <reference path="./pages/assets.ts" />
/// <reference path="./pages/gui.ts" />
/// <reference path="./pages/index.ts"/>
/// <reference path="./pages/transactions.ts"/>
/// <reference path="./pages/transaction.ts"/>
/// <reference path="./pages/nep5.ts"/>
/// <reference path="./pages/404.ts"/>
/// <reference path="./tools/locationtool.ts" />
/// <reference path="./tools/numbertool.ts" />
/// <reference path="./tools/routetool.ts" />
/// <reference path="./tools/cointool.ts" />
/// <reference path="./Util.ts" />
/// <reference path="./Navbar.ts" />
/// <reference path="./Network.ts" />
/// <reference path="./lang/LangMgr.ts" />
/// <reference path="./net/NetMgr.ts" />
var WebBrowser;
/// <reference path="../lib/neo-ts.d.ts"/>
/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference path="./pages/block.ts" />
/// <reference path="./pages/blocks.ts" />
/// <reference path="./pages/address.ts" />
/// <reference path="./pages/addresses.ts" />
/// <reference path="./pages/asset.ts" />
/// <reference path="./pages/assets.ts" />
/// <reference path="./pages/gui.ts" />
/// <reference path="./pages/index.ts"/>
/// <reference path="./pages/transactions.ts"/>
/// <reference path="./pages/transaction.ts"/>
/// <reference path="./pages/nep5.ts"/>
/// <reference path="./pages/404.ts"/>
/// <reference path="./tools/locationtool.ts" />
/// <reference path="./tools/numbertool.ts" />
/// <reference path="./tools/routetool.ts" />
/// <reference path="./tools/cointool.ts" />
/// <reference path="./Util.ts" />
/// <reference path="./Navbar.ts" />
/// <reference path="./Network.ts" />
/// <reference path="./lang/LangMgr.ts" />
/// <reference path="./net/NetMgr.ts" />
(function (WebBrowser) {
    class App {
        strat() {
            this.langmgr = new WebBrowser.LangMgr();
            let language = sessionStorage.getItem("language");
            if (!language) {
                let lang = navigator.language; //常规浏览器语言和IE浏览器
                lang = lang.substr(0, 2); //截取lang前2位字符
                if (lang == 'zh') {
                    this.langmgr.setType("cn");
                    sessionStorage.setItem("language", "cn");
                }
                else {
                    this.langmgr.setType("en");
                    sessionStorage.setItem("language", "en");
                }
            }
            else {
                this.langmgr.setType(language);
            }
            this.netmgr = new WebBrowser.NetMgr(this);
            this.ajax = new WebBrowser.Ajax();
            this.navbar = new WebBrowser.Navbar(this);
            this.netWork = new WebBrowser.NetWork(this);
            this.block = new WebBrowser.Block(this);
            this.blocks = new WebBrowser.Blocks(this);
            this.address = new WebBrowser.Address(this);
            this.addresses = new WebBrowser.Addresses(this);
            this.transaction = new WebBrowser.Transaction(this);
            this.transactions = new WebBrowser.Transactions(this);
            this.assets = new WebBrowser.Appchains(this);
            this.indexpage = new WebBrowser.Index(this);
            this.assetinfo = new WebBrowser.AssetInfo(this);
            this.guiinfo = new WebBrowser.GUI(this);
            this.notfound = new WebBrowser.Notfound(this);
            this.nep5 = new WebBrowser.Nep5page(this);
            this.routet = new WebBrowser.Route(this);
            // CoinTool.initAllAsset();
            this.netWork.start();
            this.navbar.start();
            this.routet.start();
            document.getElementsByTagName("body")[0].onhashchange = () => {
                this.routet.start();
            };
            $("#searchText").focus(() => {
                $("#nel-search").addClass("nel-input");
            });
            $("#searchText").focusout(() => {
                $("#nel-search").removeClass("nel-input");
            });
        }
        //区块列表
        blocksPage() {
            return __awaiter(this, void 0, void 0, function* () {
                //查询区块数量
                let blockCount = yield this.ajax.post('getblockcount', [2]);
                //分页查询区块数据
                let pageUtil = new WebBrowser.PageUtil(blockCount[0]['indexx'], 15);
                let block = new WebBrowser.Blocks(this);
                block.updateBlocks(pageUtil);
                //监听下一页
                $("#blocks-page-next").off("click").click(() => {
                    if (pageUtil.currentPage == pageUtil.totalPage) {
                        pageUtil.currentPage = pageUtil.totalPage;
                    }
                    pageUtil.currentPage += 1;
                    block.updateBlocks(pageUtil);
                });
                $("#blocks-page-previous").off("click").click(() => {
                    if (pageUtil.currentPage <= 1) {
                        pageUtil.currentPage = 1;
                    }
                    pageUtil.currentPage -= 1;
                    block.updateBlocks(pageUtil);
                });
            });
        }
    }
    WebBrowser.App = App;
    window.onload = () => {
        //WWW.rpc_getURL();
        var app = new App();
        app.strat();
    };
})(WebBrowser || (WebBrowser = {}));
function txgeneral(obj) {
    var div = obj.parentNode;
    var tran = div.getElementsByClassName("transaction")[0];
    if (tran.style.display == "") {
        tran.style.display = "none";
        obj.classList.remove("active");
    }
    else {
        tran.style.display = "";
        obj.classList.add("active");
        var vins = tran.getAttribute('vins');
        var vouts = tran.getAttribute('vouts');
        WebBrowser.Transactions.getTxgeneral(vins, vouts, tran);
    }
}
function txgMsg(obj) {
    var div = obj.parentNode;
    var tran = div.getElementsByClassName("transaction")[0];
    if (tran.style.display == "") {
        tran.style.display = "none";
        obj.classList.remove("active");
    }
    else {
        tran.style.display = "";
        obj.classList.add("active");
        var vins = tran.getAttribute('vins');
        var vouts = tran.getAttribute('vouts');
        WebBrowser.Address.getTxMsg(vins, vouts, tran);
    }
}
//# sourceMappingURL=app.js.map