'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-multi');
    grunt.registerTask('default', ['clean', 'browserify', 'multi:karmaDebug', 'uglify', 'multi:karmaMin']);

    grunt.initConfig({

        // property for browserified or minified bundle path for Karma
        targetBundle: '',

        clean: ['dist/*'],

        pkg: grunt.file.readJSON('package.json'),

        // browserify the AMD code
        browserify: {
            main: {
                files: {
                    'dist/x11-hash.js': ['lib']
                },
                options: {
                    require: [
                        './index.js:x11hash'
                    ]
                }
            }
        },
        // inline Karma config
        karma: {
            unit: {
                options: {
                    basePath: '',
                    frameworks: ['mocha', 'chai'],
                    files: [
                        '<%= targetBundle %>',
                        'test/test.js'
                    ],
                    exclude: [],
                    browserNoActivityTimeout: 30000,
                    reporters: ['mocha'],
                    port: 9876,
                    colors: true,
                    logLevel: 'INFO',
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    singleRun: true,
                    plugins: [
                        'karma-phantomjs-launcher',
                        'karma-firefox-launcher',
                        'karma-mocha-reporter',
                        'karma-mocha',
                        'karma-chai'
                    ]
                }
            }
        },
        // karma task is ran first on the browserified bundle then again
        // on the minified version to ensure all bundles are tested
        multi: {
            karmaDebug: {
                options: {
                    config: {
                        targetBundle: 'dist/x11-hash.js'
                    },
                    tasks: ['karma']
                }
            },
            karmaMin: {
                options: {
                    config: {
                        targetBundle: 'dist/x11-hash.min.js'
                    },
                    tasks: ['karma']
                }
            }
        },
        // minify
        uglify: {
            my_target: {
                files: {
                    'dist/x11-hash.min.js': ['dist/x11-hash.js']
                }
            }
        }
    });
};
