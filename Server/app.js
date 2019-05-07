const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const onerror = require("koa-onerror");
const logger = require("koa-logger");

const registerRouter = require("./routes");

app.use(cors());
app.use(bodyParser());
onerror(app);
app.use(logger());

app.use(registerRouter());
app.listen("8088", () => {
  console.log("listen on 8088");
});
