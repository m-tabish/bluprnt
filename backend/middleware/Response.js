const Response = require("./utils/Response");

app.use((req, res, next) => {
    res.success = (msg, data = null, code = 200) => {
        return res.status(code).json(Response.success(msg, data, code));
    };

    res.fail = (msg = "Failed", error = null, code = 500) => {
        return res.status(code).json(Response.fail(error, code, msg));
    };

    next();
});