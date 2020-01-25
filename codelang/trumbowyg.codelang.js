(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
           
            en: {
                codeLang: 'CODE'
            },
            ru: {
                codeLang: 'CODE'
            }
        }
    });
   

    var defaultOptions = {
        codeList: hljs.listLanguages()
    };


    $.extend(true, $.trumbowyg, {
        plugins: {
            codelang: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.codelang = $.extend({},
                      defaultOptions,
                        trumbowyg.o.plugins.codelang || {}
                    );

                    trumbowyg.addBtnDef('codelang', {
                        dropdown: buildDropdown(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.codeLang
                    });
                }
            }
        }
    });

    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.codelang.codeList, function (index, value) {
            trumbowyg.addBtnDef('codelang_' + index, {
                title: '<span >' + value + '</span>',
                hasIcon: false,
                fn: function () {

                    trumbowyg.saveRange();
                    var text = trumbowyg.getRangeText();
                    if (text.replace(/\s/g, '') !== '') {
                        try {
                            var curtag = getSelectionParentElement().tagName.toLowerCase();
                            if (curtag === 'code' || curtag === 'pre') {
                                return unwrapCode();
                            }
                            else {
                                trumbowyg.execCmd('insertHTML', '<pre><code class="' + value + ' hljs">' + strip(text) + '</code></pre>');
                             
                            }
                        } catch (e) {
                        }
                    }
                }
            });
            dropdown.push('codelang_' + index);
        });

        return dropdown;
    }


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


    function strip(html) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }


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


        var ispre = $(container).contents().closest('pre').length;
        var iscode = $(container).contents().closest('code').length;

        if (ispre && iscode) {
            $(container).contents().unwrap('code').unwrap('pre');
        } else if (ispre) {
            $(container).contents().unwrap('pre');
        } else if (iscode) {
            $(container).contents().unwrap('code');
        }
    }

})(jQuery);
