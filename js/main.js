class Cookie {
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    // dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt
    constructor(newName, newHTMLElement, newScore) {
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () => {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange() {
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangeVelvet() {
        this.htmlElement.classList.add("cookie--velvet");
    }
}

class Score {
    score;
    name = "";
    htmlElement = undefined;


    constructor(newScore, newName, newHTMLElement) {
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie) {
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    substractScore() {
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked() {
        setInterval(() => {
            this.score = this.score + 500
            this.htmlElement.innerText = this.score;
        }, 10000)
    }

    addPoints() {
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore) {
        this.score = newScore;
        this.htmlElement.innerText = this.score;
    }
}

class Multiplier {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if (this.bought === false && window.localStorage.getItem("multiplier") !== "true") {
            this.bought = true;
            window.localStorage.setItem("multiplier", this.bought);
            //remove 100 points from score
            this.cookie.score.substractScore();
            
        }
        this.cookie.factor = this.factor;
    }
}

class Autoscore {
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if (this.bought === false && window.localStorage.getItem("autoScore") !== "true") {
            this.bought = true;
            window.localStorage.setItem("autoScore", this.bought);
            this.score.substractScore();
            
        }
        this.score.onAutoScoreClicked();
    }
}

class VelvetCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onVelvetCookieClicked;
    }

    onVelvetCookieClicked = () => {
        if (this.bought === false && window.localStorage.getItem("velvetCookie") !== "true") {
            this.bought = true;
            window.localStorage.setItem("velvetCookie", this.bought);
            this.cookie.score.addPoints();
        }
        this.cookie.onStyleChangeVelvet();
    }
}

class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
        if (this.bought === false && window.localStorage.getItem("chocolateCookie") !== "true") {
            this.bought = true;
            window.localStorage.setItem("chocolateCookie", this.bought);
            this.cookie.score.addPoints();
        }

        this.cookie.onStyleChange();
    }
}

class Save {
    htmlElement;

    constructor(newHTMLElement) {
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;
    }

    onSaveButtonClicked = () => {
        window.localStorage.setItem("score", score.score);
    }
}

class Load {
    score;
    constructor(score) {
        this.score = score;

        this.onLoad();
    }

    onLoad = function () {
        const scoreFromLocalStorage = window.localStorage.getItem("score");
        if (scoreFromLocalStorage !== null) {
            this.score.scoreLoaded(parseInt(scoreFromLocalStorage));
        }

    }
}

/* Setup for score and cookie */
const score = new Score(0, "Default score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

/* Setup desktop upgrades*/
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new Autoscore(document.getElementById("js--autoScore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const velvet = new VelvetCookie(document.getElementById("js--redVelvet"), cookie);
const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

/* Setup mobile upgrades*/
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new Autoscore(document.getElementById("js--autoScore--mobile"), score);
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"), cookie);
const velvetMobile = new VelvetCookie(document.getElementById("js--redVelvet--mobile"), cookie);