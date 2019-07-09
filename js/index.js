$(function() {

    localStorage.setItem("page", 1);
    // $("section#1").hide();

    // import section content
    $("section").each(function() {
        var $this = $(this);
        var id = $this.attr("id");
        var getImport = document.querySelector("#import-" + id);
        var getContent = getImport.import.querySelector("content");
        $this.html(document.importNode(getContent, true));
    });

    // set carousel page icons
    $("content").each(function() {
        var $content = $(this);
        var num = $(".carousel-item", $content).length;
        for (n=0; n<num; n++) {
            if (n == 0) {
                addclass = "class='active'";
            } else {
                addclass = null;
            }
            $("ol.carousel-indicators", $content).append("<li data-target='#carouselParts' data-slide-to='" + n + "'" + addclass + "'></li>");
        }
    });
    
    // random bg colors
    $("section:not(:first)").each(function() {
        var colors = ["#227675", "#3d85ab", "#326753", "#2e4145", "#6d807f", "#87a1c1", "#428238", "#285e61", "#234048", "#666d91"];
        // var colors = ["#234048"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background", random_color);
    });
    $(".multi-card div.card").each(function() {
        var colors = ["#5f5a35", "#8eb5cd", "#521036", "#43024d", "#701d31", "#a06839", "#091f25", "#624d83", "#0e301d"];
        // var colors = ["#000000"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background", random_color);
    });

    // page up/down actions
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

    // insert up/down arrow icons
    $("section:not(:first)").prepend("<div class='up controls'><i class='fas fa-arrow-up'></i></div>");
    $("section").each(function() {
        $(this).append("<div class='page-number controls'><i class='fas fa-arrow-down'></i></div>");
    });

    // paginate with arrows or page up/down
    $(window).keydown(function(e) {
        var num = parseInt(localStorage.getItem("page"));
        var newnum = num;
        var max = $("section:last").attr("id");
        // page up || arrow up
        if (e.which == 33 || e.which == 38) {
            e.preventDefault();
            if (num > 0) {
                newnum = num-1;
            } else {
                newnum = 0;
            }

        }
        // page down || arrow down
        if (e.which == 34 || e.which == 40) {
            e.preventDefault();
            if (num < max) {
                newnum = num+1;
            } else {
                newnum = max;
            }
        }
        // home
        if (e.which == 36) {
            newnum = 1;
        }
        // end
        if (e.which == 35) {
            newnum = max;
        }

        // move to new section
        localStorage.setItem("page", newnum);
        var $next = $("#" + (newnum));
        if (newnum != num) {
            $('html, body').stop().animate({scrollTop: $next[0].offsetTop}, 500, function() {
                $(".carousel").carousel(0);
                $("a.carousel-control-prev", $next).click();
                $("a.carousel-control-next", $next).focus();
            });
        }
    });
});