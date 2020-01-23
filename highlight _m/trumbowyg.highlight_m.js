/* globals Prism */
(function ($, Prism) {
    'use strict';

    // My plugin default options
    var defaultOptions = {};

    function highlightIt(checkline,text, language) {
        

        if (checkline) {

            return [
                '<pre class="line-numbers language-' + language + ' fonts-8">',
                '<code class="line-numbers language-' + language + ' fonts-8">' + Prism.highlight(text, Prism.languages[language]) + '</code>',
                '</pre>',
            ].join('');
        } else
        {
            return [
                '<pre class="language-' + language + ' fonts-8">',
                '<code class="language-' + language + ' fonts-8">' + Prism.highlight(text, Prism.languages[language]) + '</code>',
                '</pre>',
            ].join('');

        }
    }

    // If my plugin is a button
    function buildButtonDef(trumbowyg) {
        return {
            fn: function () {
                var $modal = trumbowyg.openModal('Code', [
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <select class="' + trumbowyg.o.prefix + 'highlight-form-control language">',
                    (function () {
                        var options = '';

                        for (var lang in Prism.languages) {
                            if (Prism.languages.hasOwnProperty(lang)) {
                                options += '<option value="' + lang + '">' + lang + '</option>';
                            }
                        }

                        return options;
                    })(),
                    '   </select>',
                    '</div>',
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <textarea class="' + trumbowyg.o.prefix + 'highlight-form-control code"></textarea>',
                    '</div>',
                    '<label><input type="checkbox" checked="checked" id="checkline"><span class="trumbowyg-input-infos"><span>Номерация строк</span></span></label>'
                ].join('\n')),
                $language = $modal.find('.language'),
                $code = $modal.find('.code'),
                $checkline = $modal.find('#checkline');

                // Listen clicks on modal box buttons
                $modal.on('tbwconfirm', function () {
                    trumbowyg.restoreRange();
                    trumbowyg.execCmd('insertHTML', highlightIt($checkline.is(':checked'),$code.val(), $language.val()));
                    trumbowyg.execCmd('insertHTML', '<p><br></p>');

                  /*  var html = highlightIt($checkline.is(':checked'), $code.val(), $language.val()) + '<p><br></p>';
                    var node = $(html)[0];
                    trumbowyg.range.deleteContents();
                    trumbowyg.range.insertNode(node);*/

                    trumbowyg.closeModal();
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.closeModal();
                });
            }
        };
    }

    $.extend(true, $.trumbowyg, {

        langs: {

            en: {
                highlight_m: 'Code My'
            },
            ru: {
                highlight_m: 'Realçar sintaxe de código'
            }
        },
        // Add our plugin to Trumbowyg registered plugins
        plugins: {
            highlight_m: {
                init: function (trumbowyg) {
                    // Fill current Trumbowyg instance with my plugin default options
                    trumbowyg.o.plugins.highlight_m = $.extend(true, {},
                        defaultOptions,
                        trumbowyg.o.plugins.highlight_m || {}
                    );

                    // If my plugin is a button
                    trumbowyg.addBtnDef('highlight_m', buildButtonDef(trumbowyg));
                }
            }
        }
    });
})(jQuery, Prism);
