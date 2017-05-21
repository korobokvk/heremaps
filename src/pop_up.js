var popup_h,
    clicked = $(
        ".popup_on_marker, " +
        ".popup_address_not_found, " +
        ".popup_signup, " +
        ".popup_login, " +
        ".popup_thnx_confirmation, " +
        ".popup_thnx_congratulations, " +
        ".popup_thnx_alert_added, " +
        ".popup_parking_info"
    );

clicked.on("click", function () {
    //	windows call button
    $event_class = $(this).attr("class");
    popup_events();
});
function popup_events() {
    close_all_popups();

    if ($event_class == "popup_signup") {
        $("#popup_signup").toggleClass("active");
    }
    if ($event_class == "popup_login") {
        $("#popup_login").toggleClass("active");
    }
    if ($event_class == "popup_thnx_confirmation") {
        $("#popup_thnx_confirmation").toggleClass("active");
    }

    if ($event_class == "popup_thnx_congratulations") {
        $("#popup_thnx_congratulations").toggleClass("active");
    }
    if ($event_class == "popup_thnx_alert_added") {
        $("#popup_thnx_alert_added").toggleClass("active");
    }
    if ($event_class == "popup_parking_info") {
        $("#popup_parking_info").toggleClass("active");
    }
    if ($event_class == "popup_address_not_found") {
        $("#popup_address_not_found").toggleClass("active");
    }
    if ($event_class == "popup_on_marker") {
        $("#popup_on_marker").toggleClass("active");
    }


    popup_valign();

}

function popup_valign() {
    popup_h = $(".popup_w.active").height();
    popup_h = popup_h / 2;
    $(".popup_w.active").css({
        top: '50%',
        marginTop: -popup_h
    });
}

function close_all_popups() {
    $(".popup_w").removeClass("active");
}

// POP-UP WINDOWS CLOSE
//===============================================================
$(".popup_w .btn_close_w").click(function () {
    //$(this).parent().removeClass("active");
    close_all_popups();
    $(".tester span").removeClass("active"); // tester
});


// DON'T CLOSE POPUP IF SELECT FILE LOAD
//===============================================================
$("#file_8").focus(function () {
    $(this).parents(".popup_w").addClass("fileload");
}).focusout(function () {
    $(this).parents(".popup_w").removeClass("fileload");
});

// CLICK MILK
//===============================================================
jQuery(function ($) {
    $(document).mouseup(function (e) {
        var div = $(".popup_w:not(.fileload)");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            div.removeClass("active");
            $(".tester span").removeClass("active"); // TESTER
        }
    });
});


// FORMS - PLUS\MINUS NUMBER PRODUCT
//===============================================================
var number;
$('.quantity_box span').click(function () {
    number = $(this).prevAll('input').val();
    if ($(this).hasClass('number_minus') && number > 1) {
        number--;
    }
    else if ($(this).hasClass('number_plus') && number <= 999) {
        number++;
    }
    $(this).prevAll('input').val(number);
});


// Neighborhoods
//===============================================================
$(".btn_neighborhoods, .neighborhoods_find_list li").on("mouseup", neighborhoods);

function neighborhoods() {
    $(".neighborhoods_find_list, .btn_neighborhoods").toggleClass("active");
}


// TABS
//===============================================================
var $tabIndex;

$(".marks > li").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    tabs();
});
function tabs() {
    $tabIndex = $(".marks li.active").index();
    if ($(".marks li").hasClass('active')) {
        $(".tabs_contents > li").eq($tabIndex).addClass('active').siblings().removeClass("active");
        $(".marks").addClass('active');
    }
    else {
        $(".tabs_contents > li, .marks").removeClass("active");
    }
    popup_valign();
}
