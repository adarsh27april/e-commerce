const app = require("./app")
const dotenv = require("dotenv")
dotenv.config({ path: "backend/config/config.env" });
const connectDatabase = require("./config/database")

//connecting to DB
connectDatabase();

app.listen(process.env.PORT, () => {
   console.log(`Server running on http://localhost:${process.env.PORT}`)
})
