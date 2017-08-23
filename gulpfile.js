const gulp = require('gulp');
const minify = require('gulp-minifier')
const connent = require('gulp-connect')

var src_option = {
    base: './src/',
}
var ignore_path = ['!node_modules',
    '!gulpfile*',
    '!node_modules/**/*',
    '!dist',
    '!dist/**/*',
    '!./*.@[js|json|md|css]'
];
var path = {
    img: ['./src/**/*.@(jpg|png)'].concat(ignore_path),
    js: ['./src/**/*.js'].concat(ignore_path),
    css: ['./src/**/*.css'].concat(ignore_path),
    html: ['./src/**/*.html'].concat(ignore_path),
};

gulp.task('output', function() {
    gulp.src(['./src/**/*.+(jpg|png|eot|svg|ttf|woff)'].concat(ignore_path),src_option)
        .pipe(gulp.dest('dist'))
    gulp.src(['./src/**/*.+(html|css|js)'].concat(ignore_path),src_option)
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
         }))
        .pipe(gulp.dest('dist'))
});

gulp.task('server',function(){
    connent.server({
        port:80,
        root:'src',
        livereload:true
    });
});

gulp.task('default', function() {
    console.log('hello world')
  // place code for your default task here
});
