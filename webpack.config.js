var Encore = require('@symfony/webpack-encore');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */ 
    .addEntry('js/app', './assets/js/app.js')
    .addEntry('js/moment', './assets/js/moment.js')
    .addEntry('js/chartDetailRecette', './assets/js/chartDetailRecette.js')
    .addEntry('js/chartRecette', './assets/js/chartRecette.js')
    .addEntry('js/chartRecettesUnCompteParservice', './assets/js/chartRecettesUnCompteParservice.js')
    .addEntry('js/chartDepenseUnCompteParservice', './assets/js/chartDepenseUnCompteParservice.js')
    .addEntry('js/formatterDate', './assets/js/formatterDate.js')
    .addEntry('js/chartPrevision', './assets/js/chartPrevision.js')
    .addStyleEntry('css/app', './assets/scss/app.scss')
    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()
 
    // uncomment if you're having problems with a jQuery plugin
   .autoProvidejQuery({
    'window.jQuery': 'jquery',
      $: "jquery",
      jQuery: "jquery"
    })
;
module.exports = Encore.getWebpackConfig();

