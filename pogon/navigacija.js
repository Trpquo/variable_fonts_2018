var vj = 1,
    slide = 0,
    cbveza = 0,
    vježba, targetSlide, brojSlidea, učitavanje = [vj, 1];

$(document).ready(function() {


    $('article section:first-child h1 .običanTekst').each(function() {
        $(this).append('<span class="navigacija"><a class="prije">O</a> | <a class="poslije">P</a></span>');
        $(this).find('a').on('click', function() {
            if ($(this).attr('class') == 'prije') {
                vj--;
                if (vj == 0) vj = 1;
                if (vj == 6 || vj == 10) vj--;
            }
            if ($(this).attr('class') == 'poslije') {
                vj++;
                if (vj == 6 || vj == 10) vj++;
            }
            slide = 0;
            učitavanje = učitajVježbu(vj);
            vježba = učitavanje[0];
            brojSlidea = učitavanje[1];
        });
    });

    function učitajVježbu(vj) {
        $('section[id]').removeAttr("id");
        var sl = 0,
            vježba = $('#vježba' + vj),
            brojSlidea = vježba.find('section').length;

        vježba.siblings('.aktualna').removeAttr('class');

        vježba.addClass('aktualna').find('section').each(function() {
            $(this).attr('id', 'slide' + sl);
            sl++
        });

        console.log('Ovoga puta, u vježbi ' + vj + ' imamo ' + brojSlidea + ' slide-ova.');

        vježba.find('#slide' + slide).fadeIn('slow');

        crtajSve();

        return [vježba, brojSlidea];
    }

    // početak promjene vježbe

    učitavanje = učitajVježbu(vj);

    vježba = učitavanje[0];
    brojSlidea = učitavanje[1];

    // kraj promjene vježbe (obgrliti u funkciju)

    $('.cb').each(function() {
        cbveza++
        $(this).colorbox({
            rel: 'veze' + cbveza,
            iframe: true,
            title: function() { return $(this).text(); },
            current: '',
            fixed: true,
            width: '98%',
            height: '98%',
            opacity: 0.50,
            scrolling: true,
            returnFocus: false
        });
    });

    function vrtiSlide(ulaz, izlaz) {
        slide++
        console.log('vrtim', slide, 'u vježbi', vježba.attr("id"));
        targetSlide = vježba.find('#slide' + slide);
        targetSlide.slideDown(ulaz).siblings().slideUp(izlaz);
    };

    function otvoriSlide(slide) {
        targetSlide = vježba.find('#slide' + slide);
        targetSlide.slideDown('slow').siblings().slideUp('slow');
    };

    $(document)
        .on('dblclick', vrtiSlide)
        .on('keydown', function(e) {

            // e.preventDefault();

            var puce = e.keycode || e.which;
            switch (puce) {
                case 39:
                case 40:
                    break;
                case 37:
                case 38:
                    slide -= 2
                    break;
                case 36:
                case 96:
                    slide = -1;
                    break;
                case 35:
                    slide = brojSlidea - 1;
                    break;
                case 49:
                case 97:
                    slide = 0;
                    break;
                case 50:
                case 98:
                    slide = 1;
                    break;
                case 51:
                case 99:
                    slide = 2;
                    break;
                case 52:
                case 100:
                    slide = 3;
                    break;
                case 53:
                case 101:
                    slide = 4;
                    break;
                case 54:
                case 102:
                    slide = 5;
                    break;
                case 55:
                case 103:
                    slide = 6;
                    break;
                case 56:
                case 104:
                    slide = 7;
                    break;
                case 57:
                case 105:
                    slide = 8;
                    break;
                default:
                    console.log(e.keycode, e.which);
                    return;
            }
            if (slide < 0) slide = -1;
            if (slide > brojSlidea - 2) slide = brojSlidea - 2;
            console.log('Slide', slide + 1);
            vrtiSlide(300, 300);
        });





});