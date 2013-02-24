module.exports = function( grunt ) {
  'use strict';
  
  var path = require('path');
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  
  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };


  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, './temp')]
          }
        }
      }
    },
    
    regarde: {
      compass: {
        files: 'app/styles/**/*.scss',
        tasks: ['compass', 'livereload']
      },
      html: {
        files: 'app/index.html',
        tasks: ['copy:html', 'livereload']
      },
      images: {
        files: 'app/images/*',
        tasks: ['copy:images', 'livereload']
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'app/styles',
          specify: 'app/styles/main.scss',
          cssDir: 'temp/styles',
          imagesDir: 'app/images'
        }
      }
    },
    copy: {
      html: {
        src: 'app/index.html', 
        dest: 'temp/index.html'
      },
      images: {
        files: [
          {
            expand: true,
            cwd: 'app/images',
            src: '*',
            dest: 'temp/images/'
          }
        ]
      }
    },
    open : {
      dev : {
        path: 'http://localhost:9001'
      }
    }
  });
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-open');
  
  // Default task(s).
  grunt.registerTask('default', ['livereload-start', 'compass', 'copy', 'connect', 'open', 'regarde']);  
};
