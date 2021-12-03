require("dotenv").config();

const Express = require("express");

const dbConnection = require("./db");

const app = Express();

app.use(require("./middleware/headers"));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.usercontroller)

app.use(require("./middleware/validate-jwt"));
app.use("/recipe", controllers.recipecontroller);

dbConnection.authenticate()
   //.then(() => dbConnection.sync({force: true}))
  .then(() => dbConnection.sync()) // => {force: true}
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server: ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server:] Server Crashed");
    console.error(err);
  });

// app.listen(3000, () => {
//     console.log(`[Server]: App is listening on 3000.`);
//   });
