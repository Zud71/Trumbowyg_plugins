
(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                preformatted_m: 'Code sample'
            },
            ru: {
                preformatted_m: 'Пример кода'
            }
        },
        // jshint camelcase:true

        plugins: {
            preformatted_m: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();
                            var text = trumbowyg.getRangeText();
                            if (text.replace(/\s/g, '') !== '') {
                                try {
                                    var curtag = getSelectionParentElement().tagName.toLowerCase();
                                    if (curtag === 'code') {
                                        return unwrapCode();
                                    }
                                    else {
                                     
                                        var html = '<code>' + strip(text) + '</code>';
                                        var node = $(html)[0];
                                        trumbowyg.range.deleteContents();
                                        trumbowyg.range.insertNode(node);
                                    }
                                } catch (e) {
                                }
                            }
                        },
                        tag: 'cde',
                       // hasIcon: false,
                       // title: "{ }"
                    };

                    trumbowyg.addBtnDef('preformatted_m', btnDef);
                }
            }
        }
    });

    /*
     * GetSelectionParentElement
     */
    function getSelectionParentElement() {
        var parentEl = null,
            selection;

        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.rangeCount) {
                parentEl = selection.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((selection = document.selection) && selection.type !== 'Control') {
            parentEl = selection.createRange().parentElement();
        }

        return parentEl;
    }

    /*
     * Strip
     * returns a text without HTML tags
     */
    function strip(html) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    /*
     * UnwrapCode
     * ADD/FIX: to improve, works but can be better
     * "paranoic" solution
     */
    function unwrapCode() {
        var container = null;

        if (document.selection) { //for IE
            container = document.selection.createRange().parentElement();
        } else {
            var select = window.getSelection();
            if (select.rangeCount > 0) {
                container = select.getRangeAt(0).startContainer.parentNode;
            }
        }

            $(container).contents().unwrap('code');
        
    }
})(jQuery);
