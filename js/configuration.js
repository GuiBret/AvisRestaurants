class Configuration {
    constructor() {
        //this.lang = document.URL.match(/http(?:s?):\/\/.*\.com\/?(.*)\/mes-projets\/avisrest/)[1];
        let hostname = new URL(window.location.href).hostname;
        switch(hostname) {
            case "localhost":
                this.mode = "LOCAL"
            break;
            case "vps496160.ovh.net":
                this.mode = "VPS"
            break;
            default:
                this.mode = "SYMFONY";
        }

        this.lang = this.parseURL();
        this.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    }

    getLocale() {
        if(this.lang === "fr") {
            return "fr_FR";
        } else if (this.lang === "en") {
            return "en_US";
        }
    }

    parseURL() {
        let url = new URL(window.location.href);

        return (this.mode === "LOCAL" || this.mode === "VPS") ? "fr" : url.pathname.split("/")[1];
    }
}
