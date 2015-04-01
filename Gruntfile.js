/* jshint node: true*/

'use strict';

module.exports = function( grunt ) {
  var jsPath = ['app/*.js', 'app/js/*.js', 'app/assets/**/*.js', 'app/states/**/*js'];

  // Project configuration.
  grunt.initConfig({
    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
        tasks: ['dev', 'http-server'],
        options: {
          logConcurrentOutput: true
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
        defaultExt: 'html',

        // run in parallel with other tasks
        runInBackground: false
    },

    jshint: {
      // The paths tell JSHint which files to validate
      src: jsPath,
      jshintrc: true
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
    concat: {
      dist: {
        src: jsPath,
        dest: 'app/dist/aggregated.js'
      },
      options: {
        sourceMap: true
      }
    },

    watch: {
      js: {
        files: jsPath,
        tasks: ['jshint', 'concat'],
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', 'concurrent' );
  grunt.registerTask('dev', ['jshint', 'concat', 'sass', 'watch'] );
};
