const getErrorMessage = (err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Something went wrong!');
    }
    next();
  };
  
module.exports = { getErrorMessage };
  