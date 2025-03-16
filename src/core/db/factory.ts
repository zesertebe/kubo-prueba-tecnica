import * as dotenv from "dotenv";
import type { DatabaseInterface } from "../types/types";
import { PoolPG } from "./db.pg";
import { STORE } from "../store/store";
import { ApiError } from "../errors/api.error";

dotenv.config();

export class DBFactory {
  static createRepository(): DatabaseInterface {
    const currentDb = STORE.DB;
    if (currentDb == 0) {
      return new PoolPG();
    }
    throw ApiError.errorList.INTERNAL_SERVER_ERROR;
  }
}
