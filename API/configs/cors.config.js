const cors = require("cors")

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim());

module.exports = cors({

  origin: function (origin, next) {
    //console.log("This is the Origins I am trying to check:", origin)
    if(!origin || allowedOrigins.includes(origin)) {

      next(null, true)

    } else {

      next(new Error('Not allowed by cors'))
      //next(error)
    }   

  },

  credentials: true,

})

