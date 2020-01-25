(function ($) {
    'use strict';

    let name_folder = $('#InputFolder').val();

    var insertimg_mOption = {
        srcPath: {
            label: 'Path',
            value: "/content/" + name_folder + "/img/",
            required: true
        },
        src: {
            label: 'URL',
            required: true
        },
        description: {
            label: 'Описание',
            required: true
        },
        inqimg: {
            label: 'Своя картинка',
            required: false,
            value: "checked",
            type: 'checkbox'
        }
    };


    $.extend(true, $.trumbowyg, {
        langs: {
           
            en: {
                insertimg_m: 'IMG'
            },
            ru: {
                insertimg_m: 'IMG'
                }
   
        },
        plugins: {
            insertimg_m: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            var insertimg_mCallback = function (v) {

                         
                                var html = "<a class='lightzoom' href='";

                                if (v.inqimg) {

                                    html += v.srcPath + v.src + "' ><img src='" + v.srcPath + v.src + "' alt='" + v.description + "' class='img-thumbnail minimized rounded mx-auto d-block'></a><br>";

                                } else
                                {
                                    html += v.src + "' ><img src='" + v.src + "' alt='" + v.description + "' class='img-thumbnail minimized rounded mx-auto d-block'></a><br>";
                                }


                                var node = $(html)[0];
                                trumbowyg.range.deleteContents();
                                trumbowyg.range.insertNode(node);
                                return true;
                            };

                            trumbowyg.openModalInsert(trumbowyg.lang.insertimg_m, insertimg_mOption, insertimg_mCallback);
                        }
                    };

                    trumbowyg.addBtnDef('insertimg_m', btnDef);
                }
            }
        }
    });
})(jQuery);