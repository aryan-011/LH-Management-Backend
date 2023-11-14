const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Assuming the token is in the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    // Verify and decode the token
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      // Attach the decoded payload to the request for use in subsequent middleware or routes
      req.user = decoded;
  
      // Check if the user has the required role
      if (decoded.role !== 'gsec') {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }
  
      next();
    });
  };

  module.exports = verifyToken