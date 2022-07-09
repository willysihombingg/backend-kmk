exports.serverError = (err, req, res, next) => {
    res.status(500).json({
        status: false,
        errors: err.message
    })
}

exports.notFound = async (req, res, next) => {
    res.status(404).json({
        status: false,
        errors: "Not found!"
    })
}