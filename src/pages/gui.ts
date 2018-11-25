/// <reference path="../app.ts"/>
namespace WebBrowser
{
    export class GUI implements Page
    {
        app: App

        langType: string;

        getLangs() {
            if (this.langType != this.app.langmgr.type) {
                this.langType = this.app.langmgr.type
            }
        }

        div: HTMLDivElement = document.getElementById('index-page') as HTMLDivElement;
        footer: HTMLDivElement = document.getElementById('footer-box') as HTMLDivElement;
        constructor(app: App) {
            this.app = app
        }

        start(): void
        {
            this.getLangs()

            this.div.onclick = () =>
            {
                window.location.href = locationtool.getUrl();
            }
            this.div.hidden = false;
			this.footer.hidden = false;
        }
        close(): void
        {
            this.div.hidden = true;
			this.footer.hidden = true;
        }
    }
}