'use strict';

var fs 			= require('fs');
var compressor 	= require('node-minify');

var cssFiles = ['italia-it','italia-it-vendor','spid-common','spid-search','richiedi-spid','domande-frequenti'];
for (var i = 0; i < cssFiles.length; i++) {
    compressor.minify({
		compressor: 'sqwish',
		input: 'src/css/'+cssFiles[i]+'.css',
		output: 'views/assets/css/'+cssFiles[i]+'.min.css',
		callback: function(err, min){
			if(err) {
	    		console.log(err);
			}
		}
	});
}

var jsFiles = ['italia-it','spid-common','spid-search-001a','spid-search-001b','richiedi-spid','domande-frequenti'];
for (var i = 0; i < jsFiles.length; i++) {
    compressor.minify({
		compressor: 'uglifyjs',
		input: 'src/js/'+jsFiles[i]+'.js',
		output: 'views/assets/js/'+jsFiles[i]+'.min.js',
		callback: function(err, min){
			if(err) {
	    		console.log(err);
			}
		}
	});
}