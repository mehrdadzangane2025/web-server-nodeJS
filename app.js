const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
    /*if (req.url == "/") {
              // res.write('<h1>NodeJS project!</h1>');
              fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
                  if (err) {
                      console.log(err);
                  } else {
                      res.writeHead(200, { "Content-Type": "text/html" });
                      res.end(data);
                  }
              });
          }

          if (req.url == "/about") {
              // res.write('<h1>NodeJS project!</h1>');
              fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
                  if (err) {
                      console.log(err);
                  } else {
                      res.writeHead(200, { "Content-Type": "text/html" });
                      res.end(data);
                  }
              });
          }*/
    let filePath = path.join(
        __dirname,
        "public-html",
        req.url === "/" ? "index.html" : req.url // building routes
    );

    let extName = path.extname(filePath);
    // content - type is necessary
    let contentType = "text/html";
    switch (extName) {
        case ".js":
            contentType = "text/javascript";
            break;

        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = " image/jpg";
            break;
    }

    if (contentType === "text/html" && extName === "") {
        filePath += ".html";
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == "ENOENT") {
                // ENOENT mean 404 or page not found!
                fs.readFile(path.join(__dirname, "public-html", "404.html"), (err, data) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(data, "utf8");
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // status code is 200!
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data, "utf8");
        }
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));