require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const homepage = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT;
const frontend = process.env.FRONTEND;
//these are middlewares
app.use(
  // helmet for secure http connection helps against attacks
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    referrerPolicy: { policy: "no-referrer" },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000 }, // for secure http connection
    frameguard: { action: "deny" },
  })
);
app.use(express.json()); // for parsing the json body
app.use(
  cors({
    origin: [frontend],
    credentials: "true",
    method: ["POST", "GET"],
  })
);

//routes middlewares
app.use("/api", homepage);

//always place it after all the routes
app.use(errorHandler);

//for database

app.listen(port, (err) => {
  console.log(`server started on ${port}`);
  if (err) {
    console.log("there was an error while starting the server");
  }
});
