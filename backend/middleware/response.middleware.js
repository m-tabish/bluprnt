export const responseMiddleware = (req, res, next) => {

    res.success = (
        message = "Success",
        data = null,
        statusCode = 200
    ) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    };

    res.fail = (
        message = "Failed",
        error = null,
        statusCode = 500
    ) => {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    };

    next();
};