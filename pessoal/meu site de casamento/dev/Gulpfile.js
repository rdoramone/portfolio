var autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync'),
	compass 	 = require('gulp-compass'),
	concat       = require('gulp-concat'),
	cssmin		 = require('gulp-cssmin'),
	del          = require('del'),
	gulp         = require('gulp'),
	htmlmin      = require('gulp-htmlmin'),
	imagemin     = require('gulp-imagemin'),
	notify       = require('gulp-notify'),
	pngquant     = require('imagemin-pngquant'),
	reload       = browserSync.reload,
	rename		 = require('gulp-rename'),
	uglify       = require('gulp-uglify');
/* Caminhos dos ambiente de Desenvolvimento, HML e Produção. */
	pathRoot = {
		source : 'source',
		public : 'public',
		prod   : 'prod'
	},

	html = {
		source : pathRoot.source + '/html',
		public : pathRoot.public,
		prod   : pathRoot.prod
	},

	views = {
		source : html.source + '/views',
		public : pathRoot.public + '/assets/views',
		prod   : pathRoot.prod   + '/assets/views'
	},

	js = {
		source : pathRoot.source + '/js',
		public : pathRoot.public + '/assets/js',
		prod   : pathRoot.prod   + '/assets/js'
	},

	libs = {
		source : js.source + '/libs',
		public : js.public + '/libs',
		prod   : js.prod   + '/libs'
	},

	utils = {
		source : js.source + '/utils',
		public : js.public + '/utils',
		prod   : js.prod   + '/utils'
	},

	css = {
		source : pathRoot.source + '/sass',
		public : pathRoot.public + '/assets/css',
		prod   : pathRoot.prod   + '/assets/css'
	},
/* Configuração BrowserSync DEV */
	configBrowserSyncDev = {
		browser   : 'chrome',
		logPrefix : 'DEV',
		notify    : true,
		open      : true,
		port      : 3002,
		server    : {
			baseDir : pathRoot.public,
			index   : 'index.html'
		}
	}
/* Configuração BrowserSync PROD */
	configBrowserSyncProd = {
		browser   : 'chrome',
		logPrefix : 'PROD',
		notify    : true,
		open      : true,
		port      : 9000,
		server    : {
			baseDir : pathRoot.prod,
			index   : 'index.html'
		}
	}

/* ---------- ESTRUTURA DE DEV ---------- */
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	gulp.task('htmlsDev', function(){
		return gulp.src(html.source + '/*.html')
			.pipe(gulp.dest(html.public))
			.pipe(reload({stream: true}));
	})

	gulp.task('viewsDev', function(){
		return gulp.src(views.source + '/*.html')
			.pipe(gulp.dest(views.public))
			.pipe(reload({stream: true}));
	})

	gulp.task('sassDev', function() {
		return gulp.src(css.source + '/**/*.scss')
			.pipe(compass({
				css         : css.public,
				sass        : css.source,
				image       : pathRoot.public + '/assets/img',
				javascript  : js.source,
				font        : pathRoot.public + '/assets/fonts',
				relative    : true,
				style       : 'expanded' // Opções de estilo: nested, expanded, compact, or compressed.
			}))
			.on('error', function(error){
				console.log(error);
				this.emit('end');
			})
			.pipe(gulp.dest(css.public))
			.pipe(reload({stream: true}));
	});

	gulp.task('appsDev', function(){
		return gulp.src(js.source + '/application/{**/*.js, *.js}', {base: js.source + '/application/'})
			.pipe(concat('app.js'))
			.pipe(gulp.dest(js.public))
			.pipe(reload({stream: true}));
	})

	gulp.task('libsDev', function(){
		return gulp.src(libs.source + '/*.js', {base: libs.source})
			.pipe(concat('libs.js'))
			.pipe(gulp.dest(libs.public))
			.pipe(reload({stream: true}));
	})

	gulp.task('utilsDev', function(){
		return gulp.src(utils.source + '/*.js', {base: utils.source})
			.pipe(concat('utils.js'))
			.pipe(gulp.dest(utils.public))
			.pipe(reload({stream: true}));
	})

	gulp.task('configsDev', function(){
		return gulp.src(js.source + '/configs/*.js', {base: js.source + '/configs'})
			.pipe(gulp.dest(js.public + '/configs'))
			.pipe(reload({stream: true}));
	})

	/*gulp.task('routesDev', function(){
		return gulp.src(js.source + '/routes/*.js', {base: js.source + '/routes'})
			.pipe(gulp.dest(js.public + '/routes'))
			.pipe(reload({stream: true}));
	})*/

	gulp.task('browserSyncDev', ['utilsDev', 'libsDev', 'appsDev', 'configsDev', 'sassDev', 'htmlsDev', 'viewsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	gulp.task('watch', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
		gulp.watch(html.source + '/*.html', ['htmlsDev']);
		gulp.watch(views.source + '/*.html', ['viewsDev']);
		gulp.watch(css.source + '/**/*.scss', ['sassDev']);
		gulp.watch(js.source + '/application/{**/*.js, *.js}', ['appsDev']);
		gulp.watch(libs.source + '/*.js', ['libsDev']);
		gulp.watch(utils.source + '/*.js', ['utilsDev']);
		gulp.watch(js.source + '/configs/*.js', ['configsDev']);
		// gulp.watch(js.source + '/routes/*.js}', ['routesDev']);
	})

/* ---------- ESTRUTURA DE PROD ---------- */
	gulp.task('htmlsProd', function(){
		return gulp.src(pathRoot.public + '/*.html', {base: pathRoot.public})
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(pathRoot.prod));
	})

	gulp.task('viewsProd', function(){
		return gulp.src(views.public + '/*.html', {base: views.public})
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(views.prod));
	})

	gulp.task('cssProd', function(){
		return gulp.src(css.public + '/*.css', {base: css.public})
			.pipe(autoprefixer({
				browsers : ['last 2 versions'],
				cascade  : false
			}))
			.pipe(cssmin())
			.pipe(gulp.dest(css.prod));
	})

	gulp.task('fontProd', function(){
		return gulp.src(pathRoot.public + '/assets/fonts/*.{eot,svg,ttf,woff}', {base: pathRoot.public + '/assets/fonts'})
			.pipe(gulp.dest(pathRoot.prod + '/assets/fonts'));
	})

	gulp.task('imgsProd', function(){
		return gulp.src(pathRoot.public + '/assets/img/{**/*.{jpg,png,gif,svg}, *.{jpg,png,gif,svg}}', {base: pathRoot.public + '/assets/img'})
			.pipe(imagemin({
				interlaced: true,
				optimizationLevel: 7,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant({
					quality: '65-80',
					speed: 1
				})]
			}))
			.pipe(gulp.dest(pathRoot.prod + '/assets/img'));
	})

	gulp.task('appsProd', function(){
		return gulp.src(js.public + '/*.js', {base: js.public})
			.pipe(uglify({
				mangle: true,
				output: {
					indent_start  : 0,     	// Iniciar recuo em cada linha (somente quando 'beautify')
					indent_level  : 0,     	// Nível de recuo (somente quando 'beautify')
					quote_keys    : false, 	// Citação todas as chaves em literais de objeto?
					space_colon   : false,  // Adiciona um espaço após sinais de ':'?
					ascii_only    : false, 	// Saída ASCII-safe? (codifica caracteres Unicode como ASCII)
					inline_script : false, 	// Escapar "</ script"?
					width         : 100,    // Informativo de largura máxima da linha (para saída embelezada)
					max_line_len  : 32000, 	// Comprimento máximo da linha (para saída de não-embelezado)
					beautify      : false, 	// Embelezar saída?
					source_map    : null,  	// Saída do mapa de origem
					bracketize    : false, 	// Utilizar suportes de cada vez?
					comments      : false, 	// Comentários de saída?
					semicolons    : true,  	// Usar ponto e vírgula para declarações separadas? (caso contrário, novas linhas)
				},
				compress:{
					sequences     : true,  // Junta declarações consecutivas com ",".
					properties    : true,  // Otimiza propriedades de acesso: a["foo"] → a.foo.
					dead_code     : true,  // Remove códigos inacessíveis.
					drop_console  : true,  // Remove as declarações de "console".
					drop_debugger : true,  // Remove as declarações de "debugger".
					unsafe        : false, // Algumas otimizações inseguras.
					conditionals  : true,  // Otimiza expressões condicionais if.
					comparisons   : true,  // Otimiza comparações.
					evaluate      : true,  // Avalia expressões constantes.
					booleans      : true,  // Otimiza expressões booleanas.
					loops         : true,  // Otimiza loops.
					unused        : true,  // Deleta variáveis e/ou funções não utilizadas.
					hoist_funs    : false, // Iça as declarações de funções.
					hoist_vars    : false, // Iça as declarações de variáveis.
					if_return     : true,  // Otimiza condições if seguidas por return e/ou continue.
					join_vars     : true,  // Junta declarações de variáveis.
					warnings      : true   // Alerta sobre otimizações potencialmente perigosas.
				},
				preserveComments: false
			}))
			.pipe(gulp.dest(js.prod));
	})

	gulp.task('libsProd', function(){
		return gulp.src(libs.public + '/*.js', {base: libs.public})
			.pipe(uglify({
				preserveComments: false
			}))
			.pipe(gulp.dest(libs.prod));
	})

	gulp.task('utilsProd', function(){
		return gulp.src(utils.public + '/*.js', {base: utils.public})
			.pipe(uglify({
				mangle: true,
				output: {
					indent_start  : 0,     	// Iniciar recuo em cada linha (somente quando 'beautify')
					indent_level  : 0,     	// Nível de recuo (somente quando 'beautify')
					quote_keys    : false, 	// Citação todas as chaves em literais de objeto?
					space_colon   : false,  // Adiciona um espaço após sinais de ':'?
					ascii_only    : false, 	// Saída ASCII-safe? (codifica caracteres Unicode como ASCII)
					inline_script : false, 	// Escapar "</ script"?
					width         : 100,    // Informativo de largura máxima da linha (para saída embelezada)
					max_line_len  : 32000, 	// Comprimento máximo da linha (para saída de não-embelezado)
					beautify      : false, 	// Embelezar saída?
					source_map    : null,  	// Saída do mapa de origem
					bracketize    : false, 	// Utilizar suportes de cada vez?
					comments      : false, 	// Comentários de saída?
					semicolons    : true,  	// Usar ponto e vírgula para declarações separadas? (caso contrário, novas linhas)
				},
				compress:{
					sequences     : true,  // Junta declarações consecutivas com ",".
					properties    : true,  // Otimiza propriedades de acesso: a["foo"] → a.foo.
					dead_code     : true,  // Remove códigos inacessíveis.
					drop_console  : true,  // Remove as declarações de "console".
					drop_debugger : true,  // Remove as declarações de "debugger".
					unsafe        : false, // Algumas otimizações inseguras.
					conditionals  : true,  // Otimiza expressões condicionais if.
					comparisons   : true,  // Otimiza comparações.
					evaluate      : true,  // Avalia expressões constantes.
					booleans      : true,  // Otimiza expressões booleanas.
					loops         : true,  // Otimiza loops.
					unused        : true,  // Deleta variáveis e/ou funções não utilizadas.
					hoist_funs    : false, // Iça as declarações de funções.
					hoist_vars    : false, // Iça as declarações de variáveis.
					if_return     : true,  // Otimiza condições if seguidas por return e/ou continue.
					join_vars     : true,  // Junta declarações de variáveis.
					warnings      : true   // Alerta sobre otimizações potencialmente perigosas.
				},
				preserveComments: false
			}))
			.pipe(gulp.dest(utils.prod));
	})

	gulp.task('configsProd', function(){
		return gulp.src(js.public + '/configs/*.js', {base: js.public + '/configs'})
			.pipe(gulp.dest(js.prod + '/configs'));
	})

	/*gulp.task('routesProd', function(){
		return gulp.src(js.public + '/routes/*.js', {base: js.public + '/routes'})
			.pipe(gulp.dest(js.prod + '/routes'));
	})*/

	gulp.task('musicsProd', function(){
		return gulp.src(pathRoot.public + '/assets/musics/*.mp3', {base: pathRoot.public + '/assets/musics'})
			.pipe(gulp.dest(pathRoot.prod + '/assets/musics'));
	})

	gulp.task('browserSyncProd', ['htmlsProd', 'viewsProd', 'cssProd', 'fontProd', 'musicsProd', 'configsProd', 'imgsProd', 'appsProd', 'libsProd', 'utilsProd'], function(){
		browserSync(configBrowserSyncProd);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default',  ['browserSyncDev', 'watch']);
	gulp.task('prod',  ['browserSyncProd']); 