module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            generated: {
                files: {
                    'dist/css/app.min.css': ['src/vendor/bootstrap/dist/css/bootstrap.css']
                }
            }
        },
        concat: {
            generated: {
                options : {
                    separator : ';'
                },
                files: [
                    {
                        '.tmp/concat/js/app.js': [
                            'src/vendor/zepto/zepto.js',
                            'src/vendor/underscore/underscore.js',
                            'src/js/calculator.js'
                        ]
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            generated: {
                files: {
                    'dist/js/app.min.js' : [ '.tmp/concat/js/app.js' ]
                }
            }
        },
        bowerInstall: {
            index: {
                src: [ 'src/index.html' ],
                exclude: ['src/vendor/jquery/dist/jquery.js', 'src/vendor/bootstrap/dist/js/bootstrap.js']
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['index.html'], dest: 'dist', filter: 'isFile'},
                ]
            }
        },
        useminPrepare: {
            options: {
                dest: 'dist',
                root: 'src',
                steps: { js: ['concat', 'uglifyjs'], css: ['cssmin'] }
            },
            html: 'index.html'
        },
        usemin: {
            options: {
                dirs: ['dist']
            },
            css: ['dist/css/{,*/}*.css'],
            html: ['dist/index.html']
        },
        watch : {
            options : {
                livereload : true
            },
            files : [
                'src/**'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'useminPrepare',
        'cssmin:generated',
        'concat:generated',
        'uglify:generated',
        'copy',
        'usemin'
    ]);
};