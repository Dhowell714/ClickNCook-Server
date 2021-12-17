require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
app.use(require("./middleware/headers"));
app.use(Express.json());

app.use("/user", controllers.usercontroller)
app.use(require("./middleware/validate-jwt"));

app.use("/recipe", controllers.recipecontroller);

<<<<<<< HEAD
db.authenticate()
  .then(() => db.sync()) // => {force: true}
  // .then(() => db.sync({force: true}) )
=======
dbConnection.authenticate()
   //.then(() => dbConnection.sync({force: true}))
  .then(() => dbConnection.sync())
>>>>>>> 84d0a6b15f0c44fae7445ce0bc2a4d6a9f9b1925
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`[Server: ] App is listening on Port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("[Server:] Server Crashed");
    console.error(err);
  });

// app.listen(3000, () => {
//     console.log(`[Server]: App is listening on 3000.`);
//   });
