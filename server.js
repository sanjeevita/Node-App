const http = require("http");  

const port = 8081; 

const toDoList = ["java", "javaScript", "Python"];

http.createServer((req, res)=>{
    const {method, url} = req;

    if(url === '/todos'){
        if(method === 'GET'){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(toDoList.toString());
        }else if (method === 'POST'){
            let body = "";
            req.on('error',(err)=>{
                console.log(err);
            }).on('data', (chunk)=>{
                body += chunk;
            }).on('end', ()=>{
                body=JSON.parse(body)
                let newToDo = toDoList;
                newToDo.push(body.item);
                console.log(newToDo);
            })
        } else if (method === 'DELETE'){
            let body = '';
            req.on('error', (err)=>{
                console.log(err)
            }).on('data', (chunk)=>{
                body+= chunk
            }).on('end', ()=>{
                body = JSON.parse(body);
                let deleteThis = body.item;

                toDoList.find((elem, index)=>{
                    if(elem === deleteThis ){
                        toDoList.splice(index, 1);
                    }
                })
            })
        }
        

    } else if (url === '/'){
        res.writeHead(200, {"Content-Type": "text/html"} );
        res.write("<h1>Default Page</h1>");
    }else{
        res.writeHead(501);
    }
    res.end();
})
.listen(port, ()=>{
    console.log(`Nodejs Server started running on port ${port}`);
});
