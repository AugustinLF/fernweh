/* jshint node: true*/

'use strict';

module.exports = function( grunt ) {
  // Project configuration.
  grunt.initConfig({
    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),

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
    },

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

    sass: {
      dist: {
        files: {
          'app/css/main.css': 'app/css-sources/main.scss'
        }
      }
    },
  // for the svg to sprite sheet plugin
    svgstore: {
      options: {
        prefix: 'icon-', // This will prefix each ID
        cleanup: ['fill', 'style'],
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          style: 'display: none;'
        }
      },
      default: {
        files: {
          'app/img/dest.svg': ['app/img/svgs/*.svg'],
        },
      }
    },

    watch: {
      js: {
        files: ['app/js/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
      svg: {
        files: ['app/img/svgs/*.svg'],
        tasks: ['svgstore'],
        options: {
          spawn: false
        }
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }

  });

  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'http-server' );
  grunt.registerTask('dev', ['watch'] );
};