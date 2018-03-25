var browserSync = require('browser-sync'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	pngquant = require('imagemin-pngquant'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify');

/* Caminhos do ambiente de Desenvolvimento. */
var pathSource = 'source',
	pathSourceHtml = pathSource + '/html',
	pathSourceHtmlFiles = pathSourceHtml + '/{**/*.html, *.html}',
	pathSourceJs = pathSource + '/js',
	pathSourceJsApp = pathSourceJs + '/application',
	pathSourceJsAppFiles = pathSourceJsApp + '/*.js',
	pathSourceJsLibs = pathSourceJs + '/libs',
	pathSourceJsLibsFiles = pathSourceJsLibs + '/*.js',
	pathSourceJsUtils = pathSourceJs + '/utils',
	pathSourceJsUtilsFiles = pathSourceJsUtils + '/*.js',
	pathSourceSass = pathSource + '/sass',
	pathSourceSassFiles = pathSourceSass + '/**/*.scss';

/* Caminhos do ambiente de HML. Aqui é pra onde vai os arquivos que foram compilados. */
var pathPublic = 'public',
	pathPublicHtml = pathPublic + '/{**/*.html, *.html}',
	pathPublicAssets = pathPublic + '/assets',
	pathPublicCss = pathPublicAssets + '/css'
	pathPublicCssFiles = pathPublicCss + '/*.css'
	pathPublicFonts = pathPublicAssets + '/fonts',
	pathPublicFontsFiles = pathPublicFonts + '/*.{eot,svg,ttf,woff}',
	pathPublicImg = pathPublicAssets + '/img',
	pathPublicImgFiles = pathPublicImg + '/{**/**/**/*.{jpg,png,gif}, **/**/*.{jpg,png,gif}, **/*.{jpg,png,gif}, *.{jpg,png,gif}}',
	pathPublicJs = pathPublicAssets + '/js',
	pathPublicJsFiles = pathPublicJs + '/*.js',
	pathPublicJsLibs = pathPublicJs + '/libs',
	pathPublicJsLibsFiles = pathPublicJsLibs + '/*.js',
	pathPublicJsUtils = pathPublicJs + '/utils',
	pathPublicJsUtilsFiles = pathPublicJsUtils + '/*.js';

/* Caminhos do ambiente de Produção */
var pathProd = 'prod',
	pathProdAssets = pathProd + '/assets',
	pathProdCss = pathProdAssets + '/css',
	pathProdFonts = pathProdAssets + '/fonts',
	pathProdImg = pathProdAssets + '/img',
	pathProdJs = pathProdAssets + '/js',
	pathProdJsLibs = pathProdJs + '/libs',
	pathProdJsUtils = pathProdJs + '/utils';

var configBrowserSyncDev = {
	browser: 'chrome',
	logPrefix : 'DEV', 
	notify: true,
	open: true,
	port: 3000,
	server: {
		baseDir: pathPublic,
		index: 'index.html'
	}
}

var configBrowserSyncProd = {
	browser: 'chrome',
	logPrefix : 'PROD',
	notify: true,
	open: true,
	port: 9000,
	server: {
		baseDir: pathProd,
		index: 'index.html'
	}
}

/* ---------- ESTRUTURA DE DEV ---------- */
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	gulp.task('htmlsDev', function(){
		return gulp.src(pathSourceHtmlFiles)
			.pipe(plumber())
			.pipe(gulp.dest(pathPublic))
			.pipe(reload({stream: true}));
	})

	gulp.task('sassDev', function(){
		return gulp.src(pathSourceSassFiles)
			.pipe(plumber())
			.pipe(compass({
				css: pathPublicCss,
				font: pathPublicFonts,
				image: pathPublicImg,
				sass: pathSourceSass,
				comments: false,
				logging: true,
				relative: true,
				style: 'compressed' // Opções de estilo: nested, expanded, compact, or compressed.
			}))
		    .pipe(gulp.dest(pathPublicCss))
			.pipe(reload({stream: true}));
	})

	gulp.task('appsDev', function(){
		return gulp.src(pathSourceJsAppFiles, {base: pathSourceJsApp})
			.pipe(plumber())
			.pipe(gulp.dest(pathPublicJs))
			.pipe(reload({stream: true}));
	})

	gulp.task('utilsDev', function(){
		return gulp.src(pathSourceJsUtilsFiles, {base: pathSourceJsUtils})
			.pipe(plumber())
			.pipe(gulp.dest(pathPublicJsUtils))
			.pipe(reload({stream: true}));
	})

	gulp.task('libsDev', function(){
		return gulp.src(pathSourceJsLibsFiles, {base: pathSourceJsLibs})
			.pipe(plumber())
			.pipe(concat('plugins.js'))
			.pipe(gulp.dest(pathPublicJsLibs))
			.pipe(reload({stream: true}));
	})

	gulp.task('browserSyncDev', ['libsDev', 'utilsDev', 'appsDev', 'sassDev', 'htmlsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	gulp.task('watchGulpfile', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
	})

	gulp.task('watchHtml', function(){
		gulp.watch(pathSourceHtmlFiles, ['htmlsDev']);
	})

	gulp.task('watchSass', function(){
		gulp.watch(pathSourceSassFiles, ['sassDev']);
	})

	gulp.task('watchLibs', function(){
		gulp.watch(pathSourceJsLibsFiles, ['libsDev']);
	})

	gulp.task('watchApps', function(){
		gulp.watch(pathSourceJsAppFiles, ['appsDev']);
	})

	gulp.task('watchUtils', function(){
		gulp.watch(pathSourceJsUtilsFiles, ['utilsDev']);
	})

/* ---------- ESTRUTURA DE PROD ---------- */
	gulp.task('htmlsProd', function(){
		return gulp.src(pathPublicHtml, {base: pathPublic})
			.pipe(plumber())
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(pathProd));
	})

	gulp.task('cssProd', function(){
		return gulp.src(pathPublicCssFiles, {base: pathPublicCss})
			.pipe(plumber())
			.pipe(gulp.dest(pathProdCss));
	})

	gulp.task('fontProd', function(){
		return gulp.src(pathPublicFontsFiles, {base: pathPublicFonts})
			.pipe(plumber())
			.pipe(gulp.dest(pathProdFonts));
	})

	gulp.task('imgsProd', function(){
		return gulp.src(pathPublicImgFiles, {base: pathPublicImg})
			.pipe(plumber())
			.pipe(imagemin({
				interlaced: true,
				optimizationLevel: 7,
				progressive: true,
				multipass: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant({
					quality: '65-80',
					speed: 1
				})]
			}))
			.pipe(gulp.dest(pathProdImg));
	})

	gulp.task('appsProd', function(){
		return gulp.src(pathPublicJsFiles, {base: pathPublicJs})
			.pipe(plumber())
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
			.pipe(gulp.dest(pathProdJs));
	})

	gulp.task('utilsProd', function(){
		return gulp.src(pathPublicJsUtilsFiles, {base: pathPublicJsUtils})
			.pipe(plumber())
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
			.pipe(gulp.dest(pathProdJsUtils));
	})

	gulp.task('libsProd', function(){
		return gulp.src(pathPublicJsLibsFiles, {base: pathPublicJsLibs})
			.pipe(plumber())
			.pipe(uglify({
				preserveComments: false
			}))
			.pipe(gulp.dest(pathProdJsLibs));
	})

	gulp.task('browserSyncProd', ['htmlsProd', 'cssProd', 'fontProd', 'imgsProd', 'appsProd', 'libsProd', 'utilsProd'], function(){
		browserSync(configBrowserSyncProd);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default',  ['browserSyncDev', 'watchGulpfile', 'watchHtml', 'watchSass', 'watchLibs', 'watchApps', 'watchUtils']);
	gulp.task('prod',  ['browserSyncProd']); 