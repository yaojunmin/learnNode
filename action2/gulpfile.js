const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const watch = require('gulp-watch')

function script() {
  return gulp.src('app/*.jsx') // 查找文件
    .pipe(sourcemaps.init()) // 构建源码映射
    .pipe(babel({
      presets: ['@babel/env', '@babel/react'] // 配置es2015+和react(jsx)
    }))
    .pipe(concat('all.js')) // 源码文件打成一个文件
    .pipe(sourcemaps.write('.')) // 写入源码映射文件
    .pipe(gulp.dest('dist')) // 输出文件目录
}

gulp.task('watch', () => {
  watch('app/**.jsx', script)
})