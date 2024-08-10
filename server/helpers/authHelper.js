const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Use the ClerkExpressRequireAuth middleware to require authentication for a route
const customRequireAuth = (req, res, next) => {
    ClerkExpressRequireAuth()(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized: Please sign-in." });
        }
        next();
    });
};

const requireInternalAuth = (req, res, next) => {
    if (!(req.auth.password === process.env.INTERNAL_PASSWORD)) {
        return res.status(401).json({ error: 'Unauthorized access.' });
    }
    next();
};

module.exports = {
    customRequireAuth,
    requireInternalAuth
}