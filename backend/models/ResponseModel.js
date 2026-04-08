class Response {
    constructor(statusCode = 200, msg = "Default response", error = null, data = null) {
        this.statusCode = statusCode;
        this.msg = msg;
        this.error = error;
        this.data = data;
    }

    static success(msg = "Success", data = null, statusCode = 200) {
        return new Response(statusCode, msg, null, data);
    }

    static fail(error = "Something went wrong", statusCode = 500, msg = "Failed") {
        return new Response(statusCode, msg, error, null);
    }

    setStatus(code) {
        this.statusCode = code;
        return this;
    }

    setMessage(message) {
        this.msg = message;
        return this;
    }

    setError(error) {
        this.error = error;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            msg: this.msg,
            error: this.error,
            data: this.data
        };
    }
}

module.exports = Response;