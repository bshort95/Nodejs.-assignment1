const fs = require('fs');
const rhand = (req, res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/')
    {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>please enter a message</title></head>');
        res.write('<body><form action="/message" method = "POST" ><input type = "text" name = "message"><button type = "submit">SENDING</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST')
    {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () =>{
            const pbody = Buffer.concat(body).toString();
            const message = pbody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();    
            });
        });
        
        
    }

    
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><h1> this is content for my page </h1></body>');
    res.write('</html>');
    res.end();

};

module.exports = rhand;