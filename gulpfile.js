"use strict";
//подключаем библиотеки
var gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

//превращаем scss в css
function style(){
    return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream())
}

//превращаем запускаем сервер, который следит за 
//изменением файлов и автоматически перезагружает страницу
function serve(){
    server.init({
        server:'./source',
        notify:false,
        open:true,
        cors: true,
        ui: false
    });
    
    gulp.watch("source/sass/**/*.{scss,sass}",  style);
    gulp.watch("source/*.html").on("change", server.reload);
}

exports.style = style;
exports.serve = serve;

