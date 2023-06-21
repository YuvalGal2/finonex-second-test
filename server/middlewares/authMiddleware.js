const validateAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const secret = process.env.SECRET_KEY;

    if (authHeader !== secret) {
        return res.status(401).json({ error: 'Invalid authorization token' });
    }
    next();
};


export { validateAuthorization };