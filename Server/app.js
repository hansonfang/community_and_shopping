const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const onerror = require("koa-onerror");
const logger = require("koa-logger");

const Routers = require("./routes/index");

app.use(cors());
app.use(bodyParser());
onerror(app);
app.use(logger());

app.use(Routers.routes()).use(Routers.allowedMethods());
app.listen("8088");
