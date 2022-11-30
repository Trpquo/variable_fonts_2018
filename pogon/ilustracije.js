const boja1 = "#fc0",
    boja2 = "#e04800",
    boja3 = "#484f58",
    boja4 = "#efefef";

function crtajIlustraciju(platno, funkcija) {
    var canvas = $(platno).get(0),
        c = canvas.getContext('2d'),
        w = $('main').eq(0).width() * .75;

    canvas.width = w;
    canvas.height = 2 * w / 3;

    funkcija(canvas, c, w);
}

/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */

function crtajHarmonije() {

    var canvas = $('#harmonije').get(0),
        c = canvas.getContext('2d'),
        w = $('main').eq(0).width();

    canvas.width = w / 1.35;
    canvas.height = w / 3;

    var šir = canvas.width,
        vis = canvas.height,
        amplituda = 200;

    c.fillStyle = c.strokeStyle = boja3;
    c.translate(0, vis / 2);

    // osnovnica
    c.strokeStyle = boja2;
    c.lineWidth = 3;
    c.moveTo(0, 0);
    c.lineTo(šir, 0);
    c.stroke();



    c.strokeStyle = boja3;
    c.lineWidth = 1;

    // vibracije
    c.save();
    for (h = 1; h < 20; h++) {
        interval(c, h, šir, vis, amplituda);
    }
    c.restore();


    var harmBoje = [boja1, boja2, boja3, '#000'];

    c.save();

    // harmonici
    for (t = 82; t > 1; t--) {
        var harmBoja = harmBoje[Math.floor(t / 20)];
        c.save();
        for (tt = 0; tt < t - 1; tt++) {
            c.translate(šir / t, 0);
            točka(c, 1, harmBoja);
        }
        c.restore();
        c.translate(0, 2);
    }
    c.restore();
    c.save();

    c.translate(4, 0);
    točka(c, 4, boja1);
    c.translate(šir - 8, 0);
    točka(c, 4, boja1);

    c.restore();


}



// harmonije

function interval(c, int, šir, vis, amp) {
    var imp = 2 * int,
        z = 1;
    c.globalAlpha = 1 / imp;
    c.beginPath();
    c.moveTo(0, 0);

    for (i = 1; i < imp; i += 2) {
        z = -z;
        c.quadraticCurveTo(i * šir / imp, z * amp / int, (i + 1) * šir / imp, 0);
    }
    for (i = imp - 1; i > -1; i -= 2) {
        z = -z;
        c.quadraticCurveTo(i * šir / imp, z * amp / int, (i - 1) * šir / imp, 0);
    }

    c.closePath();
    c.stroke();
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function dinamikaWeba() {

    canvas.width = w;
    canvas.height = h;
    var profil = new Image();
    $(profil).attr('src', 'materijali/vj1/profil.png').get(0);

    profil.onload = function() {
        c.save();
        c.translate(-100, -95);
        c.drawImage(profil, 10, 10, 100, 150);
        c.translate(w, 0);
        c.scale(-1, 1);
        c.drawImage(profil, 10, 10, 100, 150);
        c.restore();
    };


    c.fillStyle = c.strokeStyle = boja3;
    c.lineWidth = 3;
    c.translate(100, h / 2);

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(w - 200, 0);
    c.stroke();

    $('#dinamikaGif').on('click', function() {
        console.log('tu sam');
        $(this).attr('src', 'materijali/vj1/poruka.gif');
    }).css({ 'top': h / 2 - 35, 'left': w / 2 - 66 });


}

function dinamikaKomunikacije(canvas) {


    var
        c = canvas.getContext('2d'),
        w = $(canvas).parent().width(),
        h = $(canvas).parent().height() - 120;

    var profil = new Image();
    $(profil).attr('src', 'materijali/vj2/profil.png').get(0);

    profil.onload = function() {
        c.save();
        c.translate(-100, -105);
        c.drawImage(profil, 0, 0, 100, 180);
        c.translate(w, 0);
        c.scale(-1, 1);
        c.drawImage(profil, 0, 0, 100, 180);
        c.restore();
    };


    c.fillStyle = c.strokeStyle = boja3;
    c.lineWidth = 3;
    c.translate(100, w / 3);

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(w - 200, 0);
    c.stroke();
    c.save();
    c.translate((w - 200) / 2, 0);
    točka(c, 10, boja2);
    c.restore();


    $('#dinamikaGif').hide().css({ 'top': w / 3, 'left': (w - $('#dinamikaGif').width() / 2) / 2 }).on('click', function() {
        $(this).attr('src', 'materijali/vj2/poruka.gif');
    });


}

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */




/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

function crtajSve() {

    if (vj === 1) {

        let klikNaSliku = 1;

        $('#razvojPisma').on('click', function() {
            console.log('KLIK!');
            klikNaSliku++;
            if (klikNaSliku > 4) klikNaSliku = 1;
            $(this).attr('src', 'materijali/razvoj_pisma' + klikNaSliku + '.jpg');
        });



        let klikNaSliku2 = 0;
        tablice = ["dizajn slova.png", "CFF.png", "glyf.png", "popis_v-tablica.png", "fvar.png", "fvar-namedInstance.png", "glyph-fvar.png", "gvar.png", "delta-dimensions.png", "gvar-interIstance.png", "variation-axis.png"];
        $('#VFtablice').on('click', function() {
            klikNaSliku2++;
            if (klikNaSliku2 >= tablice.length) klikNaSliku2 = 0;
            $(this).attr('src', 'materijali/' + tablice[klikNaSliku2]);
        });

        var wdth = 130;
        var wght = 80;
        const slider = $('#accessSlider');
        const box = $("#VFaccess");

        var boxWidth = box.width();
        // slider.width(boxWidth);
        slider.on('change', function(e) {
            e.stopPropagation();
            wght = $(this).val();

            box.css({ "font-stretch": wdth, "font-weight": wght, "font-variation-settings": "'wdth' " + wdth + ", 'wght' " + wght, "background-color": "rgba(150,160,180," + (wght - 80) / 70 + ")", "color": "rgba(0,0,0," + (wght - 40) / 70 + ")" });
            console.clear();
            console.log($(this).val());
        });


        var tempBoxWidth = boxWidth;
        box.on("mousedown", function(e) {
            e.stopPropagation();
            boxWidth = box.width();
        });
        box.on("mouseup", function(e) {
            e.stopPropagation();
            const newBoxWidth = box.width();
            wdth += 20 * (newBoxWidth - tempBoxWidth) / boxWidth;
            box.css({ "font-stretch": wdth, "font-weight": wght, "font-variation-settings": "'wdth' " + wdth + ", 'wght' " + wght, "background-color": "rgba(150,160,180," + (wght - 80) / 70 + ")", "color": "rgba(0,0,0," + (wght - 40) / 70 + ")" });
            tempBoxWidth = newBoxWidth;
            // slider.width(newBoxWidth);
        });

        const citlj = $("#VFreadability");
        const citljTekst = citlj.text();
        var citljInter = $("<span></span>");
        const xmin = 400,
            xmax = 480;

        function eyetrack() {
            // e.stopPropagation();
            const span = $(this);
            let nextSibl = span.next();
            let prevSibl = span.prev();
            span.css({ "font-variation-settings": "'xhgt' " + xmin });
            span.siblings().css({ "font-variation-settings": "'xhgt' " + xmax });

            for (let x = 0; x < 10; x++) {
                nextSibl.css({ "font-variation-settings": "'xhgt' " + xmin + 3 * x });
                prevSibl.css({ "font-variation-settings": "'xhgt' " + xmin + 3 * x });
                nextSibl = nextSibl.next();
                prevSibl = prevSibl.prev();
            }

        }

        for (let i = 0; i < citljTekst.length; i++) {
            let span = $("<span></span>");
            span.text(citljTekst[i]);
            span.on("mouseover", eyetrack);
            citljInter.append(span);
        }
        citlj.html(citljInter);

    }
}