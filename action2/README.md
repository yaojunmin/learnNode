# NODEJS 实战2

## 依赖包
gulp-babel@8.0.0 依赖 @babel/core @babel/preset-env @babel/preset-react
1. gulp-sourcemaps:这是一款用来生成映射文件的一个插件，SourceMap 文件记录了一个存储源代码与编译代码对应位置映射的信息文件。
2. gulp-concat：文件合并
3. @babel/preset-env: 是一个灵活的预设，你可以无需管理目标环境需要的语法转换或浏览器polyfill，就可以使用最新的 JavaScript。
4. gulp-watch：监测文件系统变化
5. gulp: gulp.series 用于串行（顺序）执行;gulp.parallel 用于并行执行