export const errorHandler = (err, req, res, next) => {

    console.error(err);

    return res.fail(
        err.message || "Internal Server Error",
        process.env.NODE_ENV === "development"
            ? err.stack
            : null,
        err.statusCode || 500
    );
};