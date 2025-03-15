import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { STORE } from "@/core/store/store";
import { setRoutes } from "./routes";

const base = STORE.BASE && STORE.BASE !== "" ? STORE.BASE : "v1"; // api version
const port = (process.env.APP_PORT || 3000) as number;

const app = new Hono().basePath("/" + base);

setRoutes(app); // set the routes

app.get("/test", (c) => {
  return c.json({
    status: true,
    content: "working!",
  });
});

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on port: ${info.port}`);
  },
);
