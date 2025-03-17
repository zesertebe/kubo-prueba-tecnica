import "dotenv/config";

export const STORE = {
  ENV: process.env.APP_ENV || 0,
  BASE: process.env.BASE || "v1",
  APP_PORT: process.env.PORT || 3000,
  DB: process.env.DB || 0,
  PG: {
    USER: process.env.PG_USER || "",
    PASSWORD: process.env.PG_PASSWORD || "",
    PORT: process.env.PG_PORT || "5432",
    HOST: process.env.PG_HOST || process.env.DATABASE_URL || "localhost",
    NAME: process.env.PG_DB || "kubo",
  },
};
