module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
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
                        index: "index.html"
                    }
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ //add prefix with browser that privately-owned. 
                        browsers: [
                            'ios >= 8', //ios version >= 8
                            'android >= 4', //android >= 2.3
                            'ie_mob >= 10', //wphone >= 10
                            'UCAndroid > 0' //uc > 0
                        ]
                    })
                ]
            },
            dev: {
                src: "app/css/style.css",
                dest: "app/css/style.prefix.css"
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask("com", ["sass", "postcss"]);
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
};