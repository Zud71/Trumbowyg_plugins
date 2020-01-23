
(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                ulli: 'ULLI'
            },
            ru: {
                ulli: 'ULLI'
            }
        },
        plugins: {
            ulli: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();
                            //var text = trumbowyg.range.toString();
                           // var txt = window.getSelection().toString();
                             trumbowyg.execCmd("insertUnorderedList");
                           // var ds = window.getSelection();commonAncestorContainer

                            let ulnode = trumbowyg.range.commonAncestorContainer;
                            ulnode.className = "list-group";
                            var lind = ulnode.querySelectorAll("li");
                            lind.forEach(function (element) {
                                element.className = "list-group-item";
                            })
                        },
                        tag: 'ulli',
                        title: 'ULLI',
                        hasIcon: false
                    };

                    trumbowyg.addBtnDef('ulli', btnDef);
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

        //'paranoic' unwrap

        $(container).contents().unwrap('kbd');

    }
 

})(jQuery);
