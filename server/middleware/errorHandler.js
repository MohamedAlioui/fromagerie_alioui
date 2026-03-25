const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Erreur serveur' });
};

export default errorHandler;
