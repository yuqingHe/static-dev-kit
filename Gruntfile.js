module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scss: {
                files: 'app/scss/**/*.scss',
                tasks: ['sass']
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'app/css/style.css': 'app/scss/bootstrap.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'app/**/*.css',
                        'app/**/*.html',
                        'app/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "app",
                        index: "index2.html"
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
};