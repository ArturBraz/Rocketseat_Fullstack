import http from "node:http";

const products = [
  { id: 1, name: "camisa", price: 29.99 },
  { id: 2, name: "bermuda", price: 39.99 },
  { id: 3, name: "chinelo", price: 20.09 },
  { id: 4, name: "boné", price: 19.9 },
];

export const app = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/products") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
  }
});
