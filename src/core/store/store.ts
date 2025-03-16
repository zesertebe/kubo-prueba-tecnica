import "dotenv/config";

export const STORE = {
  BASE: process.env.BASE || "v1",
  APP_PORT: process.env.PORT || 3000,
  DB: process.env.DB || 0,
  PG: {
    USER: process.env.PG_USER || "",
    PASSWORD: process.env.PG_PASSWORD || "",
    PORT: process.env.PG_PORT || "5432",
    HOST: process.env.PG_HOST || "localhost",
    NAME: process.env.PG_DB || "kudo",
  },
};
