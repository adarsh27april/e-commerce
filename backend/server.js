const app = require('./app')
const dotenv = require("dotenv")
dotenv.config({ path: "backend/config/config.env" });
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
   console.log("Error : ", err.message);
   console.log(`Shutting down the server due to Uncaught Exception`);
   process.exit(1);
})

//connecting to DB
connectDatabase();

// console.log(youtube);
const server = app.listen(process.env.PORT, () => {
   console.log(`Server running on http://localhost:${process.env.PORT}`)
})
// we are using variable `server` to get the response of app.listen so that we will have the
// capacity to shut down the server.

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
   console.log('error: ', err.message);
   console.log("shutting down the server due to `Unhandled Promise Rejection`");
   server.close(() => {
      process.exit(1)
   })
})