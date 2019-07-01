$(function() {

    localStorage.setItem("page", 2);

    // , section#2
    $("section#1").hide();

    $("section:not(:first)").each(function() {
        var colors = ["#227675", "#3d85ab", "#326753", "#2e4145", "#6d807f", "#87a1c1", "#428238", "#285e61", "#234048", "#666d91"];
        var colors = ["#234048"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background", random_color);
    });

    $(".multi-card div.card").each(function() {
        var colors = ["#5f5a35", "#8eb5cd", "#521036", "#43024d", "#701d31", "#a06839", "#091f25", "#624d83", "#0e301d"];
        var colors = ["#000000"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background", random_color);
    });

    $("section").on({
        mouseenter: function() {
            $(this).html("<i class='fas fa-arrow-down'></i>");
        },
        mouseleave: function() {
            $(this).text($(this).parents("section").attr("id"));
        }
    }, ".page-number");

    $("section").on("click", ".page-number", function() {
        var $current = $(this).parents("section");
        var pagenum = parseInt($current.attr("id")) + 1;
        var $next = $("#" + (pagenum));
        $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, function() {
            $(".carousel").carousel(0);
            $("a.carousel-control-prev", $next).click().focus();
        });
        localStorage.setItem("page", pagenum);
    });
    $("section").on("click", ".up", function() {
        var $current = $(this).parents("section");
        var pagenum = parseInt($current.attr("id")) - 1;
        var $next = $("#" + (pagenum));
        $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, 500, function() {
            $(".carousel").carousel(0);
            $("a.carousel-control-prev", $next).click().focus();
        });
        localStorage.setItem("page", pagenum);
    });

    $("section:not(:first)").prepend("<div class='up controls'><i class='fas fa-arrow-up'></i></div>");
    $("section").each(function() {
        $(this).append("<div class='page-number controls'>" + $(this).attr("id") + "</div>");
    });

    // paginate with arrows or page up/down
    $(window).keydown(function(e) {
        var num = parseInt(localStorage.getItem("page"));
        var newnum = num;
        if (e.which == 33 || e.which == 38) {
            e.preventDefault();
            if (num > 0) {
                newnum = num-1;
            } else {
                newnum = 0;
            }

        }
        if (e.which == 34 || e.which == 40) {
            e.preventDefault();
            newnum = num+1;
        }
        
        localStorage.setItem("page", newnum);
        var $next = $("#" + (newnum));
        if (newnum != num) {
            $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, 500, function() {
                $(".carousel").carousel(0);
                $("a.carousel-control-prev", $next).click().focus();
            });
        }
    });
});