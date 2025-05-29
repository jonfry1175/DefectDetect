const handleError = (error, req, res, customMessage = null) => {
    // Log error details for debugging
    console.error('Error occurred:', {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        user: req.user ? req.user.id : 'Anonymous',
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack
        }
    });

    // Handle specific error types
    if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ 
            message: customMessage || 'Validation error',
            errors 
        });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
            message: customMessage || 'Duplicate entry found' 
        });
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ 
            message: customMessage || 'Invalid reference data' 
        });
    }

    // Default server error
    return res.status(500).json({ 
        message: customMessage || 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
};

module.exports = { handleError };