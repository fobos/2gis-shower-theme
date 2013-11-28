module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            dist: {
                files: {
                   'styles/screen.css': 'styles/screen.scss'
                }
            }
        },

        csso: {
            application: {
                files: {
                    'styles/screen.css': ['styles/screen.css']
                }
            }
        },

        svgmin: {
            options: {},
            dist: {
                files: [{
                    expand: true,
                    src: ['images/*.svg']
                }]
            }
        },

        watch: {
            styles: {
                files: ['styles/*.scss'],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            images: {
                files: ['images/*.svg'],
                tasks: ['images'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },

        sprite: {
            regular: {
                src: [
                    'tmp/src/*',
                    '!tmp/src/*@*',
                    // '!tmp/src/_*',
                    // '!tmp/src/promo_*'
                ],
                algorithm: 'binary-tree',
                destImg: 'tmp/dest/sprite.png',
                destCSS: 'tmp/dest/sprite.less',
                engine: 'gm',
                engineOpts: {
                    imagemagick: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-spritesmith');

    // Tasks

    grunt.registerTask('styles', "Build styles", function() {
        var tasks = ['sass', 'csso'];

        grunt.task.run(tasks);
    });

    grunt.registerTask('images', "Optimize images", function() {
        var tasks = ['svgmin'];

        grunt.task.run(tasks);
    });

    grunt.registerTask('build', [
        'sass',
        'csso',
        'svgmin'
    ]);

    grunt.registerTask('dev', ['build', 'watch']);

};