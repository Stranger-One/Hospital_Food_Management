import jwt, { decode } from "jsonwebtoken";

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
    },
    getUserId: async (req, res, next) =>{
        try {
            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(401).json({ 
                    success: false,
                    message: 'No token provided',
                    data: null
                 });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                message: "Authorized",
                data: {
                    id: decoded.id,
                    role: decoded.role,
                    email: decoded.email,
                    name: decoded.name
                }
            })
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid or expired token',
                data: null
             });
        }
    }
}