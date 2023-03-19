      const http = require("http");
      const fs = require("fs");
      let body = JSON.parse("{}");

      const server = http.createServer(function (req, res){

        //expect req content to be stringified JSON
        //maps JSON to body; body will be printed to data.txt instead of raw JSON
        // req.on('data', function (data) {body += data});
        req.on('data', (chunk) => {
          //body is JSON-converted string that was originally a JSON (bruh)
          body = JSON.parse(chunk.toString())
          let tt = JSON.parse(fs.readFileSync('data3.json', 'utf8'));
          console.log(tt)
          //let tt = JSON.stringify(body)
          tt = JSON.stringify(tt)
          tt = tt.substring(1, tt.length-1)
          console.log(tt)
          body = JSON.stringify(body)
          console.log(body)
          tt = tt + ',';
          console.log(tt);
          tt = tt + body;
          console.log(tt)
          
          //finally, add back the brackets and write to file
          tt = '[' + tt + ']';
          fs.writeFile('data3.json', tt, err => {
            if (err) {
              console.error(err);
            }
          });          
        });

        //sends JSON string to browser
        //fix cors, something i have no freaking idea
        let fuckcors = res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {'Content-Type': 'text/html'}, fuckcors);
        //read file to str
        let readable = '';
          fs.readFile('data3.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            readable=readable.concat(data);
            //console.log(readable)
            res.end(readable);  
          });

      
        readable='';
        body = JSON.parse("{}");
        })

        server.listen(29999)
