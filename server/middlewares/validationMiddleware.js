const validateRequestData = (req, res, next) => {
    try {
        const {userId, name, value} = req.body;
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({error: 'Invalid userId'});
        }

        if (!name || (name !== 'add_revenue' && name !== 'subtract_revenue')) {
            return res.status(400).json({error: 'Invalid name'});
        }

        if (!value || !Number.isInteger(value)) {
            return res.status(400).json({error: 'Invalid value'});
        }
        // If the request data is valid, move to the next middleware or route handler.
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Please provide all required data' });
    }
    }

export { validateRequestData };