var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname, {'index': ['./src/index.html']}));
app.listen(3000);