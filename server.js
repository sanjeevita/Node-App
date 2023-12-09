console.log('server starting')
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080, ()=>{
    console.log('server started on port 8080')
});
