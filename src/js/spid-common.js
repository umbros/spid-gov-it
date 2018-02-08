/*
 *  Responsive videos
 */
(function(global) {

    var $allVideos = $("iframe[src^='//www.youtube.com']"),
        $fluidEl = $("body");

    $allVideos.each(function() {
        $(this)
            .data('aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });

})(window);

/* Track external link
 * https://github.com/alphagov/govuk_frontend_toolkit/blob/master/javascripts/govuk/analytics/external-link-tracker.js
 */
(function(global) {
    "use strict";

    var $ = global.jQuery;

    var currentHost = global.location.hostname,
        externalLinkSelector = 'a[href^="http"]:not(a[href*="' + currentHost + '"])';

    function trackClickEvent(evt) {
        evt.preventDefault();

        var $a = getLinkFromEvent(evt),
            url = $a.attr('href'),
            isExternal = $a.attr('target');

        ga('send', 'event', 'outbound', 'click', url, {
            'transport': 'beacon',
            'hitCallback': function() {
                if (isExternal === '_blank') {
                  return window.open(url);
                }
                document.location = url;
            }
        });
    }

    function getLinkFromEvent(evt) {
        var $target = $(evt.target);

        if (!$target.is('a')) {
            $target = $target.parents('a');
        }

        return $target;
    }

    $(document).ready(function() {
        $('body').on('click', externalLinkSelector, trackClickEvent);
    });

})(window);

/*
 *  Random IDP
 */
(function(global) {
    "use strict";

    $(document).ready(function() {
        var cache = [];

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = typeof cache[i] !== 'undefined' ? cache[i] : (cache[i] = parseInt(Math.random() * i)), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        $(".js-randomize").each(function(i, container) {
            var $container = $(container);
            $container.html(shuffle($container.children().not('.js-randomize-exclude').get()));
        });
    });

})(window);

/*
 *  Select all on input focus
 */
(function(global) {
    "use strict";

    var $ = global.jQuery;

    $(document).ready(function() {
        $('input:text').mouseup(function(e) {
            return false;
        });
        $("input:text").focus(function() {
            $(this).select();
        });
    });
})(window);

/*
 *  Ajax loader
 */
(function(global) {
    "use strict";

    var $ = global.jQuery;

    if ($('.js-loader').length > 0) {
        $(document).ajaxStart(function() {
            $(".js-loader").show();
        });
        $(document).ajaxComplete(function() {
            $(".js-loader").hide();
        });
    }

})(window);

/*
 *  Ajaxify search form
 */
(function(global) {
    "use strict";

    var $ = global.jQuery;

    if ($('#cerca-servizi-spid').length > 0) {
        $(window).on('popstate', function(e) {
            if (e.originalEvent.state) {
                window.location = document.location;
                window.location.reload();
            }
        });
    }

    $(document).ready(function() {
        $('#cerca-servizi-spid')
            .find('[type=submit]').attr('aria-controls', 'risultati-wrapper').end()
            .on('submit', function(e) {
                var link = '?' + $(this).serialize();
                $('#risultati-wrapper').attr('aria-live', 'polite')
                    .load($(this).attr('action') + ' #risultati', $(this).serialize(), function() {
                        if ('pushState' in window.history) {
                            window.history.pushState({
                                'skip': true
                            }, null, link);
                        }
                        window.location.hash = '#risultati-wrapper';
                        $('#cerca-servizi-spid :input').blur();
                        $('#risultati-wrapper').focus();
                    });
                return false;
            })
    });

})(window);

/*
 *  Ajaxify category links
 */
(function(global) {
    "use strict";

    var $ = global.jQuery;

    if ($('#lista-categorie').length > 0) {
        $(window).on('popstate', function(e) {
            if (e.originalEvent.state) {
                window.location = document.location;
            }
        });
    }

    $(document).ready(function() {
        $('#lista-categorie').on('click', '.ServiceLink', function(e) {
            var $link = $(this);
            $('#risultati-wrapper').attr('aria-live', 'polite')
                .load($link.attr('href') + ' #risultati', function() {
                    if ('pushState' in window.history) {
                        window.history.pushState({
                            'skip': true
                        }, null, $link.attr('href'));
                    }
                });
            return false;
        })
    });

})(window);
