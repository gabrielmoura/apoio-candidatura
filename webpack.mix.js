let mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig(webpack => {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
            })
        ],
        resolve: {
            alias: {
                'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery'),
            }
        },
        stats: {
            children: true,
        }
    };
});

mix
.js('front/js/app.js', 'public/js')
.sass('front/scss/app.scss', 'public/css')
.copyDirectory('node_modules/tinymce/skins', 'public/js/skins')
.copyDirectory('front/img', 'public/img')
.copyDirectory('front/fonts', 'public/fonts')
//.browserSync('http://localhost:3000')
 .sourceMaps();