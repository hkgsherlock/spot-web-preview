$('input#filter-search-in').focusin(function() {
    $('.filter-menu').addClass('expanded');
}).focusout(function() {
    $('.filter-menu').removeClass('expanded');
});

/*********** ↓ profile panel ↓ ***********/
$('#top img.profile, #top .profile-messages-count-mini').click(function() {
    $('#profile-set-panel').toggle();
});
/*********** ↑ profile panel ↑ ***********/

/*********** ↓ filter map ↓ ***********/


var btnFilterLoc = $('button#filter-location');

$('#filter-location-selector').offset({
    top: btnFilterLoc.offset().top + 36,
    left: btnFilterLoc.offset().left
});

btnFilterLoc.click(function(e) {
    $($(e.target).data('bound')).toggle();
    $('.filter-menu').toggleClass('expanded');
});

$('.filter-location:not(#filter-location-lv1)').prepend(
    $('<button>')
        .text('Back to parent...')
        .addClass('btn btn-default')
        .attr('type', 'checkbox')
        .attr('autocomplete', 'off')
        .click(function(e) {
            $(
                $(e.target).removeClass('active')
                    .parent().hide()
                    .data('parent')
            ).show();
        })
);

$('.filter-location label.btn[data-child]').dblclick(function(e) {
    var t = $(e.target);
    t.parent()
        .hide()
        .find('input[type=checkbox]:checked').each(function(i,e) {
            $(e).prop('checked',false)
                .parent().removeClass('active');
        });
    $(t.data('child')).show();
});

$('button[name=done]').click(function(e) {
    var saving = {
        level: 0,
        items: []
    };
    var frm = $($(e.target).data('form'));
    var sel = frm.find('.filter-location:visible');
    var txtArr = [];
    saving.level = sel.data('level');
    sel.find('input[type=checkbox]:checked').each(function(i,e) {
        var disp = $(e).parent().text().trim();
        var val = $(e).val();
        saving.items[saving.items.length] = {
            display: disp,
            value: val
        };
        txtArr[txtArr.length] = disp;
    });
    if (txtArr.length > 0) {
        var txt = txtArr.join(', ');
        var show = txt;
        if (txtArr.length > 2)
            show = "[" + txtArr.length + "] " + txtArr[0] + ", " + txtArr[1] + "...";

        $(frm.data('bound'))
            .data('selected', saving)
            .attr('title', txt)
            .text(show);
    } else {
        $(frm.data('bound'))
            .data('selected', saving)
            .text('(None)');
    }
    frm.hide();
    $('.filter-menu').removeClass('expanded');
});

$('button[name=close]').click(function(e) {
    $($(e.target).data('form')).hide();
    $('.filter-menu').removeClass('expanded');
});
/*********** ↑ filter map ↑ ***********/

/*********** ↓ gallery ↓ ***********/
$(window).load(function(){
    $('.postImages').each(function(i,e) {
        if (e.scrollWidth > 350) {
            console.log(e);
            $(e).parent()
                .prepend($('<div>').addClass('postImages-scroller-right'))
                .prepend($('<div>').addClass('postImages-scroller-left'))
        }
    });
    // forth
    $('.postImages-scroller-right').hover(function(e) {
        var t = $(e.target).parent().find('.postImages');
        t.data('scrolling', setInterval(function() {
            t.animate({
                scrollLeft: '+=20'
            }, 100, false);
        }, 100));
    }, function (e) {
        var t = $(e.target).parent().find('.postImages');
        clearInterval(t.data('scrolling'));
        t.stop(true,true);
    });

    // back
    $('.postImages-scroller-left').hover(function(e) {
        var t = $(e.target).parent().find('.postImages');
        t.data('scrolling', setInterval(function() {
            t.animate({
                scrollLeft: '-=20'
            }, 100, false);
        }, 100));
    }, function (e) {
        var t = $(e.target).parent().find('.postImages');
        clearInterval(t.data('scrolling'));
        t.stop(true,true);
    });
});
/*********** ↑ gallery ↑ ***********/

/*********** ↓ see more ↓ ***********/
$('.article-content[data-etc]').append(
    $('<span>').addClass('etc').text(' ... ').append(
        $('<a>').attr('href','#').text('More')
    )
);

$('.article-content[data-etc] > span.etc > a').click(function(e) {
    e.preventDefault();
    console.log(e.target);
    var t = $(e.target).parent().parent();
    t.removeAttr('etc').find('.etc').remove();
    t.html(t.text().trim() + t.data('etc').trim());
});
/*********** ↑ see more ↑ ***********/