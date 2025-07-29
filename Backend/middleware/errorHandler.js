

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err.toString() || 'Internal Server Error';

    console.error('-- Error Handler ---');
    console.error(err.stack || err);

    res.status(status).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack || err })
        }
    });
};

module.exports = errorHandler;
