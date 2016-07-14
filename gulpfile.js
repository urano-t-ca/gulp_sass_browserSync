/*
 *node　modulesの読み込み
*/
var gulp = require('gulp'),
    sass = require("gulp-sass"),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    plumber = require("gulp-plumber"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create();
/*
 *タスク定義
 *ブラウザ起動
 *ファイルセーブでオートリロード
*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dest",
            index: "index.html"
        }
    });
});
gulp.task('bs-reload', function() {
    browserSync.reload();
});

/*
 *タスク定義
 *SCSSのコンパイル
 *
 *・ソースマップを作る。（デバッグ時にブラウザのディベロッパーモードでみたときにどのscssファイルの何行目なのかを表示）
 *・CSSベンダープレフィックスの自動付与　
 *・scssファイルをcssにコンパイル
 *・cssファイルを作る
 *・ファイル名に[min]を付けて、minifyファイルも作る
 */
gulp.task("sass", function() {
    gulp.src("sass/**/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dest/css"))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dest/css'));
});

/*
 *コマンド[gulp]実行で、
 *定義したタスクを実行させる　watchは監視する
*/
gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("dest/*.html", ['bs-reload']);
    gulp.watch('sass/**/*.scss', ['bs-reload']);
});
gulp.task('default', ['watch']);
