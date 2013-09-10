(function ($) {
    var clip = null;

    $.zeroclipboard = function (params) {
        ZeroClipboard.setDefaults(params);

        clip = new ZeroClipboard();

        clip.on('complete', function () {
            $(this).trigger('zeroclipboard_complete');
        });

        clip.on('dataRequested', function () {
            $(this).trigger('zeroclipboard_dataRequested', $.proxy(clip.setText, clip));
        });
    };

    var glueElement = function (params) {
        if (clip === null) {
            throw new Error("zeroclipboard jquery plugin: 'init' not called yet")
        }
        clip.glue(this);

        if (params.complete && $.isFunction(params.complete)) {
            this.bind('zeroclipboard_complete', params.complete);
        }

        if (params.dataRequested && $.isFunction(params.dataRequested)) {
            this.bind('zeroclipboard_dataRequested', params.dataRequested);
        }
    };

    $.fn.zeroclipboard = function (params) {
        if (typeof params == "object" && !params.length) {
            return this.each($.proxy(glueElement, this, params));
        } else if (typeof params == "string" && params.toLowerCase() == "remove") {
            return this.each(function () {
                clip.unglue($(this));
            });
        }
    };
})(jQuery);
