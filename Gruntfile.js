module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['browserify', 'uglify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: [],
                dest: 'dist/x11-hash.js',
                options: {
                    require: [
                        './index.js:x11hash'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/x11-hash.min.js': ['dist/x11-hash.js']
                }
            }
        }
    });
}