$(document).ready(function() {

    const boja1 = "#fc0",
        boja2 = "#e04800",
        boja3 = "#484f58",
        boja4 = "#efefef";

    var canvas = $('#kursor').get(0),
        c = canvas.getContext('2d'),
        w = $('body').eq(0).width(),
        br = 19,
        x, y, x1, y1, k = false;

    canvas.width = w;
    canvas.height = $(window).height();
    c.fillStyle = boja1;
    c.strokeStyle = boja2;
    c.globalAlpha = 0.5;
    c.globalCompositeOperation = "color-burn";


    function slijediKursor(e) {
        if (k) return;
        c.clearRect(0, 0, canvas.width, canvas.height);
        x = e.pageX + 8;
        y = e.pageY + 19;
        c.save();
        c.translate(x, y);
        c.rotate(Math.PI);
        mnogokut(c, 7, 18);
        c.restore();
    };

    function blipKursor(e) {
        var br = 0,
            kr = 1;
        k = true, sc = false;
        x1 = e.pageX;
        y1 = e.pageY;
        $(canvas).css('opacity', 0);
        var anim = setInterval(klikAnim, 10);

        function klikAnim() {
            c.clearRect(0, 0, canvas.width, canvas.height);

            c.save();
            c.lineWidth = kr;
            c.globalCompositeOperation = "source-over"
            c.translate(x1, y1);
            krug(c, 20);
            c.globalAlpha = 1 / kr;

            kružnica(c, br);
            br += 3;
            kr += .3;

            if (br > 40) {
                c.save();
                c.lineWidth = kr - 5;
                c.globalAlpha = 1 / 3 * kr;
                kružnica(c, br - 40);
                c.restore();
            }
            if (br > 80) {
                c.save();
                c.lineWidth = kr - 10;
                c.globalAlpha = 1 / 3 * kr;
                kružnica(c, br - 80);
                c.restore();
            }
            if (br > 120) {
                c.save();
                c.lineWidth = kr - 15;
                c.globalAlpha = 1 / 3 * kr;
                kružnica(c, br - 120);
                c.restore();
            }
            if (br > 160) {
                c.save();
                c.lineWidth = kr - 20;
                c.globalAlpha = 1 / 3 * kr;
                kružnica(c, br - 160);
                c.restore();
            }
            c.restore();


            if (br > w / 3) {
                clearInterval(anim);
                k = false;
                $(canvas).css({ 'z-index': -100, 'opacity': 1 });
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.save();
                c.translate(x1, y1);
                krug(c, 20);
                c.restore();
            }

        }
    };

    function proliKursor(e) {
        var br = 17;
        k = true, sc = false;
        x1 = e.pageX;
        y1 = e.pageY;

        $(canvas).css('z-index', 100).stop(true, false);

        var anim = setInterval(klikAnim, 10);

        function klikAnim() {
            br += 3;
            c.save();
            c.globalCompositeOperation = "color-burn"
            c.translate(x1, y1);
            krug(c, br);
            c.restore();
            if (br > 1.5 * w) {
                clearInterval(anim);
                k = false;
                $(canvas).css('z-index', -100);
            }
        }
    };

    $(document).on('mousemove', slijediKursor);
    $(document).on('click', blipKursor);
    // $(document).on('dblclick', proliKursor);

});

/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

var krug = function(c, a) {
    c.save();
    c.beginPath();
    c.arc(0, 0, a, 0, Math.PI * 2, false);
    c.fill();
    c.restore();
};

var kružnica = function(c, a) {
    c.save();
    c.beginPath();
    c.arc(0, 0, a, 0, Math.PI * 2, false);
    c.stroke();
    c.restore();
};

var mnogokut = function(c, n, a) {
    var k = alpha(n);
    c.save();
    c.beginPath();
    for (i = 0; i < n; i++) {
        c.lineTo(a, 0);
        c.translate(a, 0);
        c.rotate(k);
    }
    c.closePath();
    c.fill();
    c.restore();
};
var točka = function(c, pt, boja) {
    c.save();
    //c.lineWidth = '2';
    c.strokeStyle = c.fillStyle = boja;
    c.beginPath();
    c.arc(0, 0, pt, 0, Math.PI * 2, false);
    c.closePath();
    c.fill();
    //c.beginPath();
    //c.moveTo(0, 0);
    //c.lineTo(30, 0);
    //c.closePath();
    //c.stroke();
    //c.beginPath();
    //c.moveTo(0, 0);
    //c.lineTo(0, 15);
    //c.closePath();
    //c.stroke();
    c.restore();
};

var alpha = function(n) {
    return Math.PI * 2 / n;
}

var scht = new Image();

function screenshot(model) {
    html2canvas(model, {
        onrendered: function(canvas) {
            scht.src = canvas.toDataURL();
            sc = true;
        }
    });
}

/* ////////////////////////////////////////////////////////////////////////////////////////////// */