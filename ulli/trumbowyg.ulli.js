
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
 

})(jQuery);
