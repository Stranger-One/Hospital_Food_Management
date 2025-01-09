import jwt from "jsonwebtoken";

export default{
    patientAuth: async (req, res, next) => {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if(decoded.role === "Food Manager"){
                next();
            } else {
                return res.status(401).json({
                    message: "Access Denied"
                })
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
}