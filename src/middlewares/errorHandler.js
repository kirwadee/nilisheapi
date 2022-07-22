
const errorHandler = (err, req, res, next) =>{
    const errorStatusCode = res.statusCode == 200 ? 500 : res.statusCode;
     res.status(errorStatusCode)

     res.json({
         message:err?.message,
         stack:process.env.NODE_ENV == "production" ? null : err?.stack,
     })
}

const notFound = (req, res, next) => {
    const wrongEndPoint = new Error(`Not Found - ${req?.originalUrl}`)
    res.status(404);
    next(wrongEndPoint)
}

module.exports = {errorHandler, notFound}