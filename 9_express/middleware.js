function middleware(req, res, next) {
  const time = new Date();
  console.log(`Request on ${req.url} at ${time.toLocaleString()}`);
  next();
}

module.exports = middleware;
