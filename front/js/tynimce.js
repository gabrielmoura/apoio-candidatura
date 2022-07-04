require('tinymce');
require('tinymce/icons/default');
require('tinymce/themes/silver');

require('tinymce/skins/ui/oxide/skin.min.css');
require('tinymce/skins/content/default/content.min.css');
require('tinymce/skins/ui/oxide/content.min.css');

require('tinymce/models/dom');

require('tinymce/plugins/advlist');
require('tinymce/plugins/anchor');
require('tinymce/plugins/autolink');
require('tinymce/plugins/autoresize');

require('tinymce/plugins/charmap');
require('tinymce/plugins/code');

require('tinymce/plugins/directionality');

require('tinymce/plugins/fullscreen');

require('tinymce/plugins/image');

require('tinymce/plugins/insertdatetime');
require('tinymce/plugins/link');
require('tinymce/plugins/lists');
require('tinymce/plugins/media');
require('tinymce/plugins/nonbreaking');
require('tinymce/plugins/pagebreak');
require('tinymce/plugins/preview');
require('tinymce/plugins/quickbars');

require('tinymce/plugins/searchreplace');
require('tinymce/plugins/table');
require('tinymce/plugins/visualblocks');
require('tinymce/plugins/visualchars');
require('tinymce/plugins/wordcount');

$( document ).ready(function() {
    tinymce.init({
        selector: "#tinymce",

        plugins: [
            'advlist',
            'anchor',
            'autolink',
            'autoresize',

            'charmap',
            'code',


            'fullscreen',
            'image',

            'insertdatetime',
            'link',
            'lists',
            'media',

            'pagebreak',
            'preview',
            'quickbars',

            'searchreplace',
            'table',

            'visualblocks',
            'visualchars',
            'wordcount'
        ],
    });
});