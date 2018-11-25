namespace WebBrowser {
	export class AssetInfo implements Page {
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
		//rankPageUtil: PageUtil;
		pageUtil: PageUtil;
		transpageUtil: PageUtil;

		private chaintxlist: JQuery<HTMLElement>;

		public actxcount: number = 0;
		public acblockcount: number = 0;
		public acaddcount: number = 0;
		public txx: Tx[];
		async start() {
			this.getLangs()

			var appchain = locationtool.getParam();
			appchain = appchain.replace('0x', '');
			let href = locationtool.getUrl() + "/assets";
			let html = '<a href="' + href + '" target="_self">&lt&lt&lt' + this.app.langmgr.get('asset_goallasset') + '</a>';


			$("#goallasset").empty();
			$("#goallasset").append(html);


			this.loadAssetInfoView(appchain);

			this.acaddcount = await WWW.api_getAppchainAddrcount(appchain) as number;
			this.acblockcount = await WWW.api_getAppchainBlockcount(appchain) as number;
			this.pageUtil = new PageUtil(this.acblockcount, 15);
			await this.updateBlocks(appchain, this.pageUtil);

			this.actxcount = await WWW.getappchaintxcount(appchain) as number;
			this.transpageUtil = new PageUtil(this.actxcount, 15);
			this.updateNep5TransView(appchain, this.transpageUtil);

			$("#acblockHeight").text(this.acblockcount); //$("#blockHeight").text(NumberTool.toThousands(this.acblockcount));
			
			$("#actxcount").text(this.actxcount);//$("#txcount").text(NumberTool.toThousands(this.actxcount));

			$("#acaddrCount").text(this.acaddcount); //$("#addrCount").text(NumberTool.toThousands(this.acaddcount));


			this.div.hidden = false;
			this.footer.hidden = false;

			$("#assets-balance-next").off("click").click(() => {
				if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
					this.pageUtil.currentPage = this.pageUtil.totalPage;
				} else {
					this.pageUtil.currentPage += 1;
					this.updateBlocks(appchain, this.pageUtil);
				}
			});
			$("#assets-balance-previous").off("click").click(() => {
				if (this.pageUtil.currentPage <= 1) {
					this.pageUtil.currentPage = 1;
				} else {
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
				} else {
					this.pageUtil.currentPage += 1;
					this.updateNep5TransView(appchain, this.pageUtil);
				}
			});
			$("#assets-tran-previous").off("click").click(() => {
				if (this.pageUtil.currentPage <= 1) {
					this.pageUtil.currentPage = 1;
				} else {
					this.pageUtil.currentPage -= 1;
					this.updateNep5TransView(appchain, this.pageUtil);
				}
			});

			this.div.hidden = false;
			this.footer.hidden = false;
		}
		close(): void {
			this.div.hidden = true;
			this.footer.hidden = true;
		}
		loadAssetInfoView(appchain: string) {
			//this.div.innerHTML = pages.asset;
			WWW.api_getAppchain(appchain).then((data) => {
				var appchain = data[0];


				let time = DateTool.getTime(appchain.timestamp);
				$("#name").text(appchain.name);
				$("#type").text(time);
				$("#id").text(appchain.hash);
				$("#available").text(appchain.seedlist);
				$("#precision").text(appchain.validators);
				$("#admin").text(appchain.owner);
			})


		}
		public async updateBlocks(appchain: string, pageUtil: PageUtil) {

			let blocks: Block[] = await WWW.getappchainblocks(appchain, pageUtil.pageSize, pageUtil.currentPage);
			$("#assets-balance-list").empty();
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
			if (diffNum > 15) {
				maxNum = pageUtil.currentPage * pageUtil.pageSize;
			}
			let pageMsg = "Blocks " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
			$("#assets-balance-msg").html(pageMsg);


			//let newDate = new Date();
			blocks.forEach((item, index, input) => {
				//newDate.setTime(item.time * 1000);
				let time = DateTool.getTime(item.time);
				let txcounts = item.tx.length
				var id = item.hash
				id = id.replace('0x', '');
				//id = id.substring(0, 4) + '...' + id.substring(id.length - 4);

				let html = `
                <tr>
                <td><a href="`+ Url.href_appchain(id) + `" target="_self">` + id + `</a></td>
                <td>` + item.size + ` bytes</td><td>` + time + `</td><td><a href="` + Url.href_block(item.index) + `" target="_self">` + item.index + `</a></td>
                <td>` + txcounts + `</td>
                </tr>`
				$("#assets-balance-list").append(html);
			});
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
		

	}
}
