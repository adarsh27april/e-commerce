const mongoose = require("mongoose")

const connectDatabase = () => {
   // { useNewURLParser: true, useUnifiedTopology: true, useCreateIndex: true } <- these are not necessary from mongoose ver 6
   mongoose.connect(process.env.DB_URI)
      .then((data) => {
         let { host, port, name } = data.connection
         console.log(`mongodb connected with server: ${host}:${port}/${name}`);
      })
   // .catch(e => console.log(e))
}

module.exports = connectDatabase;