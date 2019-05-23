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
    formLimit: "1mb",
    jsonLimit: "1mb",
    textLimit: "1mb",
    parsedMethods: ["POST", "PUT", "DELETE"],
    multipart: true,
    formidable: {
      maxFieldsSize: 1024
    }
  })
);
onerror(app);
app.use(logger());

app.use(registerRouter());

app.on("error", e => {
  console.error("koa app error!", e);
});
app.listen("8088", () => {
  console.log("listen on 8088");
});
