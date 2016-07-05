var gulp = require('gulp')
	, os = require('os')
	, sass = require('gulp-sass')
	, autoprefixer = require('gulp-autoprefixer')
	, minifycss = require('gulp-minify-css')
	, notify = require('gulp-notify')
	, rename = require('gulp-rename')
	, webpack = require('gulp-webpack')
	, webpackConfig2 = require('./webpack.config.js')
	, named = require('vinyl-named')
	, uglify = require('gulp-uglify')
	, connect = require('gulp-connect')
	, gulpOpen = require('gulp-open')
	, livereload = require('gulp-livereload')

var appList = ['app']

var host = {
	path: './',
	port: 3000,
	html: 'index.html'
};

var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

// gulp.task('webpack', function(){
// 	return gulp.src(mapFiles(appList, 'js'))
// 		.pipe(named())
// 		.pipe(webpack(webpackConfig()))
// 		.pipe(gulp.dest('dist/'))
// });

gulp.task('webpack-watch', function(){
	livereload.listen();
	gulp.src(mapFiles(appList, 'js'))
		.pipe(named())
		.pipe(webpack(Object.create(webpackConfig2)))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify()) //压缩
		.pipe(gulp.dest('dist/'))
		.pipe(livereload({
			port: 3000
		}))
});


gulp.task('styles', function() {
    var _cssIn = './src/assets/sass/*.scss',
        _cssOut = './dist/css';

    return gulp.src(_cssIn)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios >= 6', 'android >= 2.3'],
            // last 2 versions: 主流浏览器的最新两个版本
            // > 5%: 全球统计有超过5%的使用率
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(_cssOut))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(_cssOut))
        // .pipe(notify({ message: 'css编译成功' }));
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000'
        }))
        .on('end', done);
});

// 构建本地开发Web服务器
gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});


gulp.task('watch', function () {
    gulp.watch('./src/assets/sass/*.scss', ['styles'])
});

gulp.task('default', ['webpack-watch','styles'], function() {
  console.log('done')
})

gulp.task('dev', ['connect', 'webpack-watch','watch','styles', 'open'], function() {
  console.log('done')
})

function webpackConfig(opt){
	var config = {
		devtool: false,
		// devtool : 'source-map',
		output: {
			publicPath: './dist/'
		},
		module : {
			loaders : [
				{ test : /\.vue$/, loader : "vue"},
				// { test: /\.scss$/, loader: 'style!css!sass' },
				{
					test: /\.js$/,
					exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/,
					loader : "babel"
				}, //支持ES6
			]
		},
		babel: {
		    presets: ['es2015']
		},
		vue: {
			loaders: {
				// scss: 'style!css!sass'
				sass: 'style!css!sass?indentedSyntax',
				scss: 'style!css!sass'
			}
		},
		publicPath: './dist/',
		externals: { jquery: "jQuery" }
	}

	if (!opt) {
		return config
	}

	for (var i in opt) {
		config[i] = opt[i]
	}

	return config
}


function mapFiles(list, extname){
	return list.map(function(app){
		return 'src/' + app + '.' + extname
	})
}
