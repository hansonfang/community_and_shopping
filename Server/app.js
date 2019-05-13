const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const BodyParser = require("koa-body");
const onerror = require("koa-onerror");
const logger = require("koa-logger");

const registerRouter = require("./routes");

app.use(cors());
app.use(
  BodyParser({
    formLimit: "50mb",
    jsonLimit: "50mb",
    textLimit: "50mb",
    parsedMethods: ["POST", "PUT", "DELETE"],
    multipart: true,
    formidable: {
      maxFieldsSize: 50 * 1024 * 1024
    }
  })
);
onerror(app);
app.use(logger());

app.use(registerRouter());
app.listen("8088", () => {
  console.log("listen on 8088");
});
