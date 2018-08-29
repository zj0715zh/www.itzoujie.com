var http = require('http');
var port = 18080;
http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});  
  var otherArray = ["item1", "item2"];  
  var otherObject = { item1: "item1val", item2: "item2val" };  
  var json = JSON.stringify({   
    anObject: otherObject,   
    anArray: otherArray,  
  });
  res.end(json);
}).listen(port);

