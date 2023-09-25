// create a middleware function that will check if the user is authenticated

export const auth = (req, res, next) => {
    try {
        // get token from request header
        const token = req.header("x-auth-token");

        // check if token exists
        if (!token) {
            return res.status(401).json({ message: "No authentication token, authorization denied" });
        }

        // verify token
        const verified = jwt.verify(token, "test");
        if (!verified) {
            return res.status(401).json({ message: "Token verification failed, authorization denied" });
        }

        // add user from payload
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}