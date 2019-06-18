$(function() {

    $("section:not(:first)").each(function() {
        var colors = ["#227675", "#3d85ab", "#aa4bde", "#326753", "#2e4145", "#b67bb8", "#bc252d"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background", random_color);
    });

    $("section").on({
        mouseenter: function () {
            $(this).html("<i class='fas fa-arrow-down'></i>");
        },
        mouseleave: function () {
            $(this).text($(this).parents("section").attr("id"));
        }
    }, ".page-number"); //pass the element as an argument to .on

    $("section").on("click", ".page-number", function() {
        var $current = $(this).parents("section");
        var $next = $("#" + (parseInt($current.attr("id"))+1));
        $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, 500);
    });
    $("section").on("click", ".up", function() {
        var $current = $(this).parents("section");
        var $next = $("#" + (parseInt($current.attr("id"))-1));
        $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, 500);
    });


    $("section:not(:first)").prepend("<div class='up controls'><i class='fas fa-arrow-up'></i></div>");
    $("section").each(function() {
        $(this).append("<div class='page-number controls'>" + $(this).attr("id") + "</div>");
    });
});