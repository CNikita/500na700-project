var gulp = require('gulp');
const { watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function buildCss() {
    return gulp.src('scss/styles.scss')
        .pipe(sass()) // Конвертируем Sass в CSS через gulp-sass
        .pipe(gulp.dest('css'))
}

function startwatch() {
    watch(['scss/styles.scss'], buildCss);
}

exports.default = series(startwatch);
