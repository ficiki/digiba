// server.js (ESM) — safe SPA fallback WITHOUT path-to-regexp
import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;
const distPath = path.join(process.cwd(), "dist");

app.use(express.static(distPath));

// Middleware fallback: only for GET requests that did not match a static file
app.use((req, res, next) => {
  if (req.method !== "GET") return next();     // let non-GET through
  res.sendFile(path.join(distPath, "index.html"), err => {
    if (err) next(err);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
