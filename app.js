require("dotenv").config();

const Express = require("express");

const db = require("./db");

const app = Express();

// app.use(require("./middleware/headers"));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController)

// app.use(require("./middleware/validate-jwt"));
app.use("/recipe", controllers.recipecontroller);

db.authenticate()
  .then(() => db.sync()) // => {force: true}
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