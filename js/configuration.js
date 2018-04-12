class Configuration {
    constructor() {
        //this.lang = document.URL.match(/http(?:s?):\/\/.*\.com\/?(.*)\/mes-projets\/avisrest/)[1];

        this.mode = (new URL(window.location.href).hostname === "localhost") ? "LOCAL" : "SYMFONY"
        this.lang = this.parseURL();
        this.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    }

    getLocale() {
        if(this.lang === "fr") {
            return "fr-FR";
        } else if (this.lang === "en") {
            return "en-US";
        }
    }

    parseURL() {
        let url = new URL(window.location.href);

        return (this.mode === "LOCAL") ? "fr" : url.pathname.split("/")[1];
    }
}
