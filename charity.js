 const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

	console.log('request for '+ req.url+ 'by method' + req.method);
	if (req.method == 'GET') {

		var fileURL;
		if (req.url=='/') {
			fileURL = '/charity.html'
		
		}else { fileURL = req.url }

		var filePath = path.resolve('./public'+ fileURL );
		const fileExt = path.extname(filePath);

		if (fileExt == '.html' ) {
			fs.exists(filePath, (exists) => {

				if (!exists) {

					res.statusCode = 404;
					res.setHeader('Content-Type','text/html');
					res.end('<html> <body> <h1> Error 404 '+ fileURL + +''+ 'does not exist. </h1> </body> </html>' );

				}



				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');
				fs.createReadStream(filePath).pipe(res);
			})


		}

			else if (req.url.match('\.css$')) {

		res.statusCode = 200;
		var cssPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");
		res.setHeader('Content-Type','text/css');
		fileStream.pipe(res);
	}

	else if (req.url.match('\.jpg$')) {

		res.statusCode = 200;
	 	var imagePath = path.join(__dirname, 'public', req.url);
	    var fileStream = fs.createReadStream(imagePath);
		res.setHeader('Content-Type','images/jpg');
		fileStream.pipe(res);
	 }
	else {

		res.statusCode = 404;
		res.setHeader('Content-Type','text/html');
		res.end('<html> <body> <h1>' + fileURL +'Does not exist. </h1></body></html>');
	}


	};


});

server.listen(port, hostname, ()=>{
	console.log('server running at http://${hostname}:${port}');
});






