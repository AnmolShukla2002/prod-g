export const removeResponseHeaders = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
};
