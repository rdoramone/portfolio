module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    var PATH = {
        dist: {
            root: './dist',
            js: '<%= PATH.dist.root %>/app/assets/js/**/*.js',
            img: '<%= PATH.dist.root %>/app/assets/img'
        },
        app: {
            root: './app',
            css: '<%= PATH.app.root %>/assets/css',
            js: '<%= PATH.app.root %>/assets/js',
            img: '<%= PATH.app.root %>/assets/img',
            source: {
                js: '<%= PATH.app.root %>/source/js',
                libs: '<%= PATH.app.source.js %>/libs',
                sass: '<%= PATH.app.root %>/source/sass'
            },
            files: {
                js: {
                    '<%= PATH.app.js %>/application.js': [
                        '<%= PATH.app.source.js %>/application/**/*.js'
                    ],
                    '<%= PATH.app.js %>/libs/plugins.js': [
                        '<%= PATH.app.source.libs %>/**/*.js'
                    ]
                }
            }
        }
    };

    grunt.initConfig({

        PATH: PATH,

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        uglify: {
            my_target: {
                files: '<%= PATH.dist.js %>'
            }
        },

        concat: {
            application_and_libs: {
                files: '<%= PATH.app.files.js %>'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeComments: true
                },

                files: [{
                    expand: true,
                    cwd: '<%= PATH.dist.root %>',
                    src: '{,*/}*.html',
                    dest: '<%= PATH.dist.root %>'
                }]
            }
        },

        concurrent: {
            dev: ['compass', 'concat'],
            run: ['uglify', 'htmlmin']
        },

        connect: {
            options: {
                port: 3000,
                open: true,
                livereload: 35729,
                hostname: 'localhost',
                base: '<%= PATH.app.root %>'
            },

            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            connect.static(PATH.app.root),
                            connect.static(PATH.app.css),
                            connect.static(PATH.app.js),
                            connect.static(PATH.app.img)
                        ];
                    }
                }
            }
        },

        watch: {
            css: {
                files: '<%= PATH.app.source.sass %>/**/*.scss',
                tasks: ['compass']
            },

            gruntfile: {
                files: ['Gruntfile.js']
            },

            scripts: {
                files: '<%= PATH.app.source.js %>/**/*.js',
                tasks: ['concat']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },

                files: [
                    '<%= PATH.app.root %>/{,*/}*.html',
                    '<%= PATH.app.css %>/{,*/}*.css',
                    '<%= PATH.app.js %>/{,*/}*.js',
                    '<%= PATH.app.img %>/{,*/}*'
                ]
            }
        },

        copy: {
            dist: {
                expand: true,
                src: '<%= PATH.app.root %>/**',
                dest: '<%= PATH.dist.root %>'
            }
        },

        clean: {
            dist: ['<%= PATH.dist.img %>/tmp/', '<%= PATH.dist.root %>/app/source/']
        }

    });

    grunt.registerTask('default', ['concurrent:dev', 'connect:livereload', 'watch']);
    grunt.registerTask('run', ['compass', 'copy', 'concurrent:run', 'clean']);

};