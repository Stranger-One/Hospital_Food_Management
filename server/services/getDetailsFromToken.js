import jwt from 'jsonwebtoken'

const getDetailsFromToken = (token) => {
    try {
        if (!token) return null;
        
        // Remove 'Bearer ' if present
        const tokenString = token.startsWith('Bearer ') 
            ? token.slice(7, token.length) 
            : token;

        // Verify and decode the token
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        return {
            _id: decoded._id,
            role: decoded.role,
            email: decoded.email
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

module.exports = getDetailsFromToken;