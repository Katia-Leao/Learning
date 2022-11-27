import http from "http"

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "application.json" })
  const data = {
    name: "Katia",
    country: "Brazil",
  }
  res.end(JSON.stringify(data))
})

server.listen(8080, () => {
  console.log("server started at port 8080")
})
