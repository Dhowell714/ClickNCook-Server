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

dbConnection.authenticate()
   //.then(() => dbConnection.sync({force: true}))
  .then(() => dbConnection.sync())
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
