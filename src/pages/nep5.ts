/// <reference path="../app.ts"/>
namespace WebBrowser
{
    export class Nep5page implements Page
    {
        app: App
        langType: string;
        constructor(app: App) {
            this.app = app
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
                ]
                page_lang.forEach(
                    lang => {
                        document.getElementById(lang).textContent = this.app.langmgr.get(lang)
                    }
                )
                this.langType = this.app.langmgr.type
            }
            
        }


        
        div: HTMLDivElement = document.getElementById("asset-info") as HTMLDivElement;
        footer: HTMLDivElement = document.getElementById('footer-box') as HTMLDivElement;
        name: HTMLSpanElement;
        type: HTMLSpanElement;
        id: HTMLSpanElement;
        available: HTMLSpanElement;
        precision: HTMLSpanElement;
        admin: HTMLSpanElement;
        balancePage: boolean;
        currentPage: number;
        pageUtil: PageUtil;
		rankPageUtil: PageUtil;

		public actxcount: number = 0;
		public acblockcount: number = 0;
		public acaddcount: number = 0;

        async start()
        {
            this.getLangs()

            var nep5id = locationtool.getParam();
            let href = locationtool.getUrl() + "/assets";
            let html = '<a href="' + href + '" target="_self">&lt&lt&lt'+this.app.langmgr.get('asset_goallasset')+'</a>';

            $("#goallasset").empty();
            $("#goallasset").append(html);
			this.loadNep5InfoView(nep5id);
			this.acaddcount = await WWW.api_getAppchainAddrcount(nep5id);
			this.acblockcount = await WWW.api_getAppchainBlockcount(nep5id);
			this.rankPageUtil = new PageUtil(this.acblockcount[0].blockcount, 10);
            this.updateAssetBalanceView(nep5id, this.rankPageUtil); 

            var assetType = locationtool.getType();
            if (assetType == 'nep5') {
				//$(".asset-nep5-warp").show();
				this.actxcount = await WWW.getappchaintxcount(nep5id);  
                this.pageUtil = new PageUtil(this.actxcount[0].txcount, 10);
                this.updateNep5TransView(nep5id, this.pageUtil);         
                $(".asset-tran-warp").show();
            } else {
                //$(".asset-nep5-warp").hide();
                $(".asset-tran-warp").hide();
            }

            //排行翻页
            $("#assets-balance-next").off("click").click(() => {      
                if (this.rankPageUtil.currentPage == this.rankPageUtil.totalPage) {
                    this.rankPageUtil.currentPage = this.rankPageUtil.totalPage;
                } else {
                    this.rankPageUtil.currentPage += 1;
                    this.updateAssetBalanceView(nep5id, this.rankPageUtil);
                }
            });
            $("#assets-balance-previous").off("click").click(() => {
                if (this.rankPageUtil.currentPage <= 1) {
                    this.rankPageUtil.currentPage = 1;
                } else {
                    this.rankPageUtil.currentPage -= 1;
                    this.updateAssetBalanceView(nep5id, this.rankPageUtil);
                }
            });
            //交易翻页
            $("#assets-tran-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                } else {
                    this.pageUtil.currentPage += 1;
                    this.updateNep5TransView(nep5id, this.pageUtil);
                }
            });
            $("#assets-tran-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                } else {
                    this.pageUtil.currentPage -= 1;
                    this.updateNep5TransView(nep5id, this.pageUtil);
                }
            });

            this.div.hidden = false;
            this.footer.hidden = false;
        }
        close(): void
        {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        //nep5的详情
        loadNep5InfoView(nep5id: string)   
        {           
            WWW.api_getAppchain(nep5id).then((data) =>
            {
				var nep5 = data[0];
				let time = DateTool.getTime(nep5.timestamp);

                $("#name").text(nep5.name);
                $("#type").text(time);
                $("#id").text(nep5.hash);
                $("#available").text(this.acblockcount.toString());
				$("#precision").text(this.actxcount.toString());
				$("#admin").text(this.acaddcount.toString());             
            })
        }

        async updateAssetBalanceView(nep5id: string, pageUtil: PageUtil) {
            let balanceList = await WWW.getappchainblocks(nep5id, pageUtil.pageSize, pageUtil.currentPage); 
            $("#assets-balance-list").empty();

            if (balanceList)
            {
               // let rank = (pageUtil.currentPage-1)*10 +1;
                balanceList.forEach((item) => {
					let href = Url.href_address(item.hash);
					this.loadAssetBalanceView(item.hash,item.size, item.time, item.index, item.tx.length);    
                  //  rank++;
                });
            }
            else
            {
                let html = '<tr><td colspan="3" >'+this.app.langmgr.get('no_data')+'</td></tr>';

                $("#assets-balance-list").append(html);
                if (pageUtil.currentPage == 1) {
                    $(".asset-balance-page").hide();
                } else {
                    $("#assets-balance-next").addClass('disabled');
                    $(".asset-balance-page").show();
                }
            }
            if (pageUtil.totalCount > 10)
            {
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#assets-balance-next").removeClass('disabled');
                } else {
                    $("#assets-balance-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#assets-balance-previous").removeClass('disabled');
                } else {
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
            else
            {
                $(".asset-balance-page").hide();
            }
        }

        async updateNep5TransView(nep5id: string, pageUtil: PageUtil) {
            let tranList: Tx[] = await WWW.getappchainrawtransactions(nep5id, pageUtil.pageSize, pageUtil.currentPage); 
            $("#assets-tran-list").empty();
            if (tranList) {
                tranList.forEach((item) => {
                    if (!item.vin) {
                        item.type = '-'
                    }
                    if (!item.size) {
                        item.type = '-'
                    }
                    this.loadAssetTranView(item.txid, item.type, item.size, item.blockindex);
                })
            } else {
                let html = '<tr><td colspan="4" >'+this.app.langmgr.get('no_data')+'</td></tr>';
                $("#assets-tran-list").append(html);
                if (pageUtil.currentPage == 1) {
                    $(".asset-tran-page").hide();
                } else {
                    $(".asset-tran-page").show();
                }
            }

            if (pageUtil.totalCount > 10) {
                if (pageUtil.totalPage - pageUtil.currentPage) {
                    $("#assets-tran-next").removeClass('disabled');
                } else {
                    $("#assets-tran-next").addClass('disabled');
                }
                if (pageUtil.currentPage - 1) {
                    $("#assets-tran-previous").removeClass('disabled');
                } else {
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
            } else {
                $(".asset-tran-page").hide();
            }

            
        }

        loadAssetTranView(txid:string,from:string,to:number,blockindex:number)
        {
            let html = `
                    <tr>
                    <td><a class="code omit" href="`+ Url.href_transaction(txid) + `" target="_self">` + txid.replace('0x', '') + `
                    </a></td>
                    <td>` + from + `
                    </td>
                    <td>` + to + `
                    </td>
                    <td>` + blockindex + `</td>
                    </tr>`
            $("#assets-tran-list").append(html);            
        }


		loadAssetBalanceView(href: string, size: number, time: number, height: number, txcount: number) {
			//let tm = DateTool.getTime(balancelist.timestamp);
            let html = `
                    <tr>
                    <td><a target="_self" href="`+ href + `">` + href + `
                    </a></td>
                     <td>` + size + `</td> 
                    <td>` + time + `
                    </td>
                    <td>` + height + `</td>
                    <td>` + txcount + `</td>
                    </tr>`
            $("#assets-balance-list").append(html);
        }
    }
}