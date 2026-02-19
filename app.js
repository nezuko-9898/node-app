require('dotenv').config();

const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.end(`Environment: ${process.env.NODE_ENV}`);
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
