const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });

    const user = {
      id: 1,
      name: "Marcelo",
    };

    res.write(JSON.stringify(user));
    res.end();
  })
  .listen(8080);

console.log("Estamos escuchando el puerto", 8080);
