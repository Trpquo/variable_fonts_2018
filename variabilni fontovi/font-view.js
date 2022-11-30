"use strict";
console.log("Pokrečem...");

function fetchFont(familyName, url, format, axis) {
    const fontFaceRules = document.getElementById("font-face");
    const fontFaceRule = '@font-face{font-family:"' + familyName + '"; src:url("fontovi/woff/' + url + '") format("' + format + '");} ';
    fontFaceRules.innerHTML += fontFaceRule;
}

function setFontVariation(parent) {
    // console.log(parent);
    let postavke = parent.getElementsByClassName("slider");
    let variacije = "font-variation-settings: ";
    for (let i = 0; i < postavke.length; i++) {
        if (i > 0) { variacije += ", "; }
        variacije += '"' + postavke[i].name + '" ' + postavke[i].value;
    }
    parent.setAttribute("style", variacije);
}

function displayFont(fontName, desc, axis) {

    const izlog = document.getElementById("font-view");

    let blok = document.createElement("article");
    blok.id = fontName;
    let naslov = document.createElement("h1");
    let potpis = document.createElement("p");
    let kontrole = document.createElement("div");
    kontrole.classList += "slidecontainer";

    let naziv = document.createTextNode(fontName);
    desc += "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.";
    let opis = document.createTextNode(desc);

    const style = 'font-family:"' + fontName + '";';
    naslov.setAttribute("style", style);
    potpis.setAttribute("style", style);

    naslov.appendChild(naziv);
    potpis.appendChild(opis);

    for (let i = 0; i < axis.length; i++) {
        let natpis = document.createElement("label");
        let os = axis[i];
        natpis.innerHTML = os["axname"];
        natpis.setAttribute("for", os["axcode"]);
        let kontrola = document.createElement("input");
        kontrola.setAttribute("type", "range");
        kontrola.setAttribute("min", os["min"]);
        kontrola.setAttribute("max", os["max"]);
        kontrola.setAttribute("value", os["default"]);
        kontrola.setAttribute("name", os["axcode"]);
        kontrola.classList += "slider";
        kontrola.addEventListener("change", function(e) { 
            e = e || window.event;
            e.stopPropagation();
            setFontVariation(blok) 
        });

        kontrole.appendChild(natpis);
        kontrole.appendChild(kontrola);
    }

    const punilo = [naslov, potpis, kontrole];
    for (let i = 0; i < punilo.length; i++) {
        blok.appendChild(punilo[i]);
    }
    izlog.appendChild(blok);
    setFontVariation(blok);
    // console.clear();
}

(function() {
    let napunjeno = false;
    let proba = 0;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        let fontovi;
        if (this.readyState == 4 && this.status == 200) {
            fontovi = JSON.parse(this.responseText);
            console.log("Učitavam fontove...");
            for (let fontName in fontovi) {
                if (fontovi.hasOwnProperty(fontName)) {
                    let font = fontovi[fontName];
                    fetchFont(fontName, font["fileName"], font["format"], font["axis"]);
                    displayFont(fontName, font["desc"], font["axis"]);
                }
            }
            napunjeno = true;
        }
    };

    xmlhttp.open("GET", "font-info.json", true);
    xmlhttp.send();

    function getSiblings(elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        for ( ; sibling; sibling = sibling.nextSibling ) 
           if ( sibling.nodeType == 1 && sibling != elem )
              siblings.push( sibling );
        return siblings;
    }

    var listeners = setInterval(function() {
        proba++;
        // console.log("Proba", proba);
        let articles = document.getElementsByTagName("article");
        for (let i=0; i<articles.length; i++) {
            if (i==0) articles[i].classList.add("display");
            articles[i].addEventListener("click", function(e) {
                e = e || window.event;
                e.stopPropagation();
                let targ = e.target || e.srcElement;
                if (targ.tagName == "ARTICLE") {

                    if (targ.nodeType == 3) targ = targ.parentNode;
                    let sibl = getSiblings(targ);
    
                    targ.classList.add("display");
                    for (let i=0; i < sibl.length; i++) {
                        sibl[i].classList.remove("display");
                    }
                    targ.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                }
            });
        }
        if (napunjeno) {
            clearInterval(listeners);
            console.log("Uspjeh!")
        }
    }, 200);




})();