(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                codeLang: 'CODE'
            },
            ru: {
                codeLang: 'CODE'
            }
        }
    });
    // jshint camelcase:true

    var defaultOptions = {
        codeList: [
            { name: 'C#', family: 'cs post-code'},
            { name: 'NO', family: 'nohighlight post-code' },
            { name: 'Bash', family: 'Bash post-code' },
            { name: 'nginx', family: 'nginx post-code' },
            { name: 'plaintext', family: 'plaintext post-code' },
            { name: 'powershell', family: 'powershell post-code' }
        ]
    };

    // Add dropdown with web safe fonts
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

        $.each(trumbowyg.o.plugins.codelang.codeList, function (index, lang) {
            trumbowyg.addBtnDef('codelang_' + index, {
                title: '<span >' + lang.name + '</span>',
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
                                trumbowyg.execCmd('insertHTML', '<pre><code class="' + lang.family + '">' + strip(text) + '</code></pre>');
                                /*var html = '<pre><code class="' + lang.family + '">' + strip(text) + '</code></pre>';
                                var node = $(html)[0];
                                trumbowyg.range.deleteContents();
                                trumbowyg.range.insertNode(node);*/
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

        //'paranoic' unwrap
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
