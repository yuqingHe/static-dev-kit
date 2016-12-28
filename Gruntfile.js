module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scss: {
                // files: 'app/scss/**/*.scss',
                // tasks: ['sass']
                files: 'work/scss/**/*.scss',
                tasks: ['sass']
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    // 'app/css/style.css': 'app/scss/bootstrap.scss',
                    'work/css/style.css': 'work/scss/ionic.app.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        // 'app/**/*.css',
                        // 'app/**/*.html',
                        // 'app/**/*.js',
                        'work/**/*.css',
                        'work/**/*.html',
                        'work/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        // baseDir: "app",
                        // index: "test.html"
                        baseDir: "work",
                        index: "index.html"
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', [  'browserSync', 'watch']);
    // grunt.registerTask('default', ['browserSyncW', 'watchW']);
};