// Which page?
current_page = document.location.href.match(/[^\/]+$/)[0];

// Pass commands to Python
function cmd(instruction) {
    document.title = instruction;
}

// Global across all pages
$(window).load(function () {
    // Smoothly fade into the page.
    $('body').fadeIn('slow');
});

// Smoothly fade out of the page.
function smoothPageFade(target_href) {
    $('html').fadeOut('fast');
    setTimeout(function () {
        window.location.href = target_href;
    }, 200);
}

// When page first opens
$(document).ready(function () {

    // Back to the top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });

    $('#navigation-right').append('<a id="scroll-top" class="navigation-button" style="display:none"><i class="material-icons">&#xE316;</i></a>')

    $('#scroll-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

// Smoothly fade between two elements (by ID)
function smoothFade(from, to) {
    $(from).fadeOut();
    setTimeout(function () {
        $(to).fadeIn();
    }, 400);
}

// Smoothly fade the navigation sub-title
function changeSubtitle(textToDisplay) {
    // Smoothly fade subtitle
    $('#navigation-sub-title').fadeOut();
    setTimeout(function () {
        $('#navigation-sub-title').html(textToDisplay);
        $('#navigation-sub-title').fadeIn();
    }, 400);
}

// Remove slowly, fadeOut an element and then remove it.
function removeSlowly(element) {
    $(element).fadeOut()
    setTimeout(function () {
        $(element).remove();
    }, 1000);
}

// For pages that depend on an internet connection, but Welcome couldn't connect.
function reconnectTimeout() {
    if (!$('#reconnectFailed').is(':visible')) {
        $('#reconnectFailed').fadeIn();
    } else {
        $('#reconnectFailed').jAnimateOnce('pulse');
    }
}

// Dynamically set the cursor,
function setCursorBusy() {
    $('html').addClass('cursor-wait');
    $('body').addClass('cursor-wait');
    $('a').addClass('cursor-wait');
}

function setCursorNormal() {
    $('html').removeClass('cursor-wait');
    $('body').removeClass('cursor-wait');
    $('a').removeClass('cursor-wait');
}

///////////////////////////////////////////////////////////////

// Main Menu Only = Animation
if (current_page == 'index.html') {

    // Animate elements of the page
    $('#main-menu-logo').jAnimateOnce('rotateIn');
    $('.main-menu-text').fadeIn('slow');
    $('#open-at-start').jAnimateOnce('fadeIn');
    setTimeout(function () {
        $('#mate-blur').jAnimateOnce('zoomIn');
        $('#mate-blur').show();
    }, 50);

    // Have we greeted the user already?
    if (document.cookie == 'greeted=yes') {

        $(document).ready(function () {
            $(".fade").removeClass("fade");
            $(".fade-1s").removeClass("fade-1s");
            $(".fade-2s").removeClass("fade-2s");
            $(".fade-3s").removeClass("fade-3s");
            $(".fade-4s").removeClass("fade-4s");
            $(".fade-5s").removeClass("fade-5s");
        });
    }

    document.cookie = 'greeted=yes';

    // Enable tooltips
    /* $(document).ready(function() {
       $("body").tooltip({ selector: '[data-toggle=tooltip]' });
     });*/

    // Sssh... You found the little secrets! ;)
    //// Logo starts to animate after a minute.
    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('tada');
    }, 60000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('flip');
    }, 60000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('rotateOut');
    }, 70000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('rotateIn');
    }, 71000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('rollOut');
    }, 80000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('rollIn');
    }, 81000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('zoomOut');
    }, 90000);

    setTimeout(function () {
        $('#main-menu-logo').jAnimateOnce('zoomIn');
    }, 91000);

    // Internally work with days, months and years as a number.
    function dateAsNumber(day, month, year) {
        // Assumes 'month' parameter is in base 0.
        // day, month   = Required.
        // year         = Optional, set to 'null' to use current year.
        var then = new Date();
        if (year != null) {
            then.setYear(year);
        }
        then.setMonth(month - 1);
        then.setDate(day);
        var finalNumber = Math.floor(then / (1000 * 60 * 60 * 24));
        //~ var dateInYears = current + todayAsNumber;
        //~ console.log('** finalNumber: '+finalNumber)
        //~ return dateInYears;
        return finalNumber;
    }

    // Activate Confetti
    function activateConfetti() {
        if (disable_confetti == false) {
            $('#special').html('<canvas id="confetti" width="100%" height="100%" style="z-index: -1000; position: absolute; top: 0px; left: 0px;"></canvas>');
            startConfetti();
            return
        } else {
            return
        }
    }

    // Use 'dd', 'mm' and 'yyyy' variables to re-use code.
    var today = new Date();
    var dd = 0;
    var mm = 0;
    var yyyy = 0;
    var release = '';

    // What is today?
    var today = new Date();
    var todayAsNumber = dateAsNumber(today.getDate(), today.getMonth() + 1, null)

    // Check dates for special events.
    function specialEventCheck(dateNo, title_text, show_confetti, fa_icon) {
        // dateNo        = dateAsNumber(dd, mm, yyyy) function.
        // title_text    = Text to display when date matches.
        // show_confetti = True / False = Celebrate when date matches.
        // fa_icon       = FontAwesome icon to display. Usually 'bell' or 'calendar' or 'bug'.
        var do_show_this = false;
        if (dateNo == todayAsNumber) {
            // Today is the day!
            var do_show_this = true;
        }
        if (do_show_this == true) {
            $('.main-menu-text').hide();
            $('.main-menu-text').fadeIn();
            $('.main-menu-text').html("<span class='fa fa-" + fa_icon + "'></span>&nbsp;" + title_text);
            if (show_confetti == true) {
                activateConfetti();
            }
        }
    }

    // Dates to be checking for.
    function checkDates() {
        // String variables are passed via Python. See _push_config for "Special Event Strings".

        // Official Flavour Status - 26/Nov/2017
        var age = today.getFullYear() - 2017;
        dd = 26;
        mm = 11;
        yyyy = null;
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 7, flavour_anniversary_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 6, flavour_anniversary_future + ' ' + days_in + ' 6 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 5, flavour_anniversary_future + ' ' + days_in + ' 5 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 4, flavour_anniversary_future + ' ' + days_in + ' 4 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 3, flavour_anniversary_future + ' ' + days_in + ' 3 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 2, flavour_anniversary_future + ' ' + days_in + ' 2 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 1, flavour_anniversary_future + ' ' + tomorrow, true, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy), flavour_anniversary_present + ' ' + age + ' ' + years_ago, true, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 1, flavour_anniversary_past + ' ' + yesterday, true, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 2, flavour_anniversary_past + ' 2 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 3, flavour_anniversary_past + ' 3 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 4, flavour_anniversary_past + ' 4 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 5, flavour_anniversary_past + ' 5 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 6, flavour_anniversary_past + ' 6 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 7, flavour_anniversary_past + ' 7 ' + days_ago, false, 'calendar');

        // Project Birthday - 01/02/2017
        var age = today.getFullYear() - 2017;
        dd = 01;
        mm = 02;
        yyyy = null;
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 7, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 6, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 6 ' + future_days, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 5, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 5 ' + future_days, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 4, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 4 ' + future_days, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 3, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 3 ' + future_days, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 2, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 2 ' + future_days, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 1, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + tomorrow + ' ' + project_birthday, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy), project_birthday_present + ' ' + age + ' ' + years_old + ' ' + today_string + ' ' + project_birthday, true, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 1, project_birthday_past + ' ' + age + ' ' + years_old + ' ' + yesterday + ' ' + project_birthday, true, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 2, project_birthday_past + ' ' + age + ' ' + years_old + ', 2 ' + days_ago, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 3, project_birthday_past + ' ' + age + ' ' + years_old + ', 3 ' + days_ago, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 4, project_birthday_past + ' ' + age + ' ' + years_old + ', 4 ' + days_ago, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 5, project_birthday_past + ' ' + age + ' ' + years_old + ', 5 ' + days_ago, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 6, project_birthday_past + ' ' + age + ' ' + years_old + ', 6 ' + days_ago, false, 'birthday-cake');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 7, project_birthday_past + ' ' + age + ' ' + years_old + ', 7 ' + days_ago, false, 'calendar');

        // Holiday Celebrations
        specialEventCheck(dateAsNumber(31, 12, null), celebrate_new_year, true, 'calendar');
        specialEventCheck(dateAsNumber(01, 01, null), celebrate_new_year, true, 'calendar');

        // 18.04 Beta 2
        dd = 24;
        mm = 03;
        yyyy = 2018;
        release = 'Ubuntu MATE 18.04 Beta 2';
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 3, release + ' ' + project_release_future + ' ' + days_in + ' 3 ' + future_days, false, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 2, release + ' ' + project_release_future + ' ' + days_in + ' 2 ' + future_days, false, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 1, release + ' ' + project_release_future + ' ' + tomorrow, false, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy), release + ' ' + project_release_present, true, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 1, project_release_thanks + ' ' + release + '.', true, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 2, project_release_thanks + ' ' + release + '.', false, 'bug');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 3, project_release_thanks + ' ' + release + '.', false, 'bug');

        // 16.04 Final Release
        dd = 21;
        mm = 04;
        yyyy = 2018;
        release = 'Ubuntu Budgie 18.04 LTS';
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 7, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 6, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 5, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 4, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 3, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 2, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) - 1, release + ' ' + project_release_future + ' ' + tomorrow, true, 'bell');
        specialEventCheck(dateAsNumber(dd, mm, yyyy), release + ' ' + project_release_present, true, 'bell');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 1, release + ' ' + project_release_past + ' ' + yesterday, true, 'bell');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 2, release + ' ' + project_release_past + ' 2 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 3, release + ' ' + project_release_past + ' 3 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 4, release + ' ' + project_release_past + ' 4 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 5, release + ' ' + project_release_past + ' 5 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 6, release + ' ' + project_release_past + ' 6 ' + days_ago, false, 'calendar');
        specialEventCheck(dateAsNumber(dd, mm, yyyy) + 7, release + ' ' + project_release_past + ' 7 ' + days_ago, false, 'calendar');

        // To-do as possible improvement: Retrieve events as a list from server.
    }
}

// Getting Started Only - Index Pane for Selecting Topics
if (current_page == 'gettingstarted.html') {

    function indexOpen() {
        // Is the index already open?
        if ($('#index-menu').is(':visible')) {
            indexClose();
        } else {
            // Open the Index
            $('#index-open').addClass('disabled');
            $('#index-open').prop('disabled', true);
            $("#index-overlay").fadeIn();
            $("#index-menu").show();
            $('#index-menu').jAnimateOnce('fadeInLeft');
        }
    }

    function indexClose() {
        $('#index-open').removeClass('disabled');
        $('#index-open').prop('disabled', false);
        if ($('#index-menu').is(':visible')) {
            $("#index-overlay").fadeOut();
            $('#index-menu').jAnimateOnce('fadeOutLeft', function () {
                $("#index-menu").hide();
            });
        }
    }

    function changePage(id) {
        // 'id' is one used for <div>.

        indexClose();

        $('.topicContents').fadeOut();

        // Smoothly fade between topics
        setTimeout(function () {
            $('#' + id).fadeIn();
        }, 500);
    }

    // Show initial page and index pane on page load
    changePage('initial');
    setTimeout(function () {
        indexOpen();
    }, 500);
    $('#index-open').jAnimateOnce('fadeInDown');

    // Show additional information on the page based on checkbox state.
    $('.dualBootWin').hide();
    $('#showDualBootWin').click(function () {
        if ($(this).prop('checked') == true) {
            $('.dualBootWin').fadeIn();
        } else {
            $('.dualBootWin').fadeOut();
        }
    });

    // Graphics Detection
    // Must be executed shortly after page fully loads in order for variables to exist.
    setTimeout(function () {
        $('.graphics-pci').html(graphicsGrep);

        // Auto detection alert initially displays "failed".
        if (graphicsVendor == 'NVIDIA') {
            $('.graphics-nvidia').show()
            $('.graphics-unknown').hide()
            $('#graphics-open-driver-name').html('nouveau');
            $('#graphics-proprietary').show();

        } else if (graphicsVendor == "AMD") {
            $('.graphics-amd').show()
            $('.graphics-unknown').hide()
            $('#graphics-open-driver-name').html('radeon');
            //~ $('#graphics-proprietary').show();

        } else if (graphicsVendor == "Intel") {
            $('.graphics-intel').show()
            $('.graphics-unknown').hide()

        } else if (graphicsVendor == "VirtualBox") {
            $('.graphics-vbox').show()
            $('.graphics-unknown').hide()

        } else {
            // Obscure graphics chip or something we can't tell.
            $('#graphics-proprietary').show();
        }
    }, 1000);

    // Expand / Collapse sub-sections to keep it tidy.
    function toggleSub(divID, arrowID) {
        if ($('#' + divID).is(":visible")) {
            $('#' + divID).fadeOut();
            $('#' + arrowID).removeClass('fa-chevron-up');
            $('#' + arrowID).addClass('fa-chevron-down');
        } else {
            $('#' + divID).fadeIn();
            $('#' + arrowID).removeClass('fa-chevron-down');
            $('#' + arrowID).addClass('fa-chevron-up');
        }
    }

    // Fetch system specifications if not cached already.
    // Wait a couple of seconds so it doesn't look like application had frozen.
    function InitSystemInfo() {
        setCursorBusy()
        setTimeout(function () {
            cmd("init-system-info");
        }, 1000);
    }

    // Show popovers on hover.
    $(document).ready(function () {
        $("body").tooltip({
            selector: '[data-toggle=tooltip]'
        });
    });
    $('[rel=unitsinfo]').popover({
        html: true,
        content: function () {
            return $('#popover_units').html();
        }
    });

    // If menu is not open, open menu otherwise goto home page
    function backAction() {
        if (!$('#index-menu').is(':visible')) {
            indexOpen();
        } else {
            if ($('#first-run').is(':visible')) {
                smoothPageFade('default.html');
            } else {
                smoothPageFade('index.html');
            }
        }
    }
}


function sortList() {
    $('#recommendation-list').append($('#recommendation-list > div').sort(function (itemOne, itemTwo) {
        var statusOne = $(itemOne).find('[id$=install]').is(':visible');
        var statusTwo = $(itemTwo).find('[id$=install]').is(':visible');

        if (statusOne && !statusTwo) {
            return -1;
        }

        if (!statusOne && statusTwo) {
            return 1;
        }

        var titleOne = $(itemOne).find('h2').text();
        var titleTwo = $(itemTwo).find('h2').text();
        return titleOne.localeCompare(titleTwo);
    }));
}

function sortAppletList() {
    $('#applet-list').append($('#applet-list > div').sort(function (itemOne, itemTwo) {
        var titleOne = $(itemOne).find('h2').text();
        var titleTwo = $(itemTwo).find('h2').text();
        return titleOne.localeCompare(titleTwo);
    }));
}

function sortThemeList() {
    $('#theme-list').append($('#theme-list > div').sort(function (itemOne, itemTwo) {
        var titleOne = $(itemOne).find('h3').text();
        var titleTwo = $(itemTwo).find('h3').text();
        return titleOne.localeCompare(titleTwo);
    }));
}

function injectTitle() {
    var title = $("#title-inject").text();
    document.title = "title?" + title;
}

injectTitle();