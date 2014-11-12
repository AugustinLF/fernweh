/* jshint node: true*/

module.exports = function( grunt ) {
  // Project configuration.
  grunt.initConfig({
    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      // The paths tell JSHint which files to validate
      src: ['app/js/**/*.js'],
      options: {  // For information on the options, check http://jshint.com/docs/options/
        // Enforcing JSHint's options
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: 'single',
        undef: true,
        unused: 'vars',
        devel: true,
        browser: true
      }
    },

    'sass': {
      dist: {
        files: {
          'app/css/style.css': 'app/css-sources/style.scss'
        }
      }
    },

    'http-server': {
        // the server root directory
        root: 'app/index.html',

        host: 'localhost',
        port: 8080,

        cache: 1,
        showDir : true,
        autoIndex: true,
        defaultExt: "html",

        // run in parallel with other tasks
        runInBackground: false
    }
  });

  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask( 'default', ['jshint'] );
};