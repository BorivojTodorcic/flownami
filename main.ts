// @ts-types="npm:@types/express"
import express from "npm:express";
import bodyParser from "npm:body-parser";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function (_, res) {
  res.render("pages/index");
});

type Column = {
  name: string;
  tasks: Array<Task>;
};

type Task = {
  name: string;
};

app.get("/board", async function (_req, res) {
  const text = await Deno.readTextFile("./database.json");
  const columns: Array<Column> = JSON.parse(text);

  res.render("pages/board", { columns});
});

app.get("/add_task", function (_req, res) {
  res.render("pages/add_task")
})

app.post("/add_task", function (req, _res) {
  console.log(req.body?.title);
})

const port = Deno.env.get("PORT") || 8080;
app.listen(port);
console.log(`Server is listening on port ${port}`);
