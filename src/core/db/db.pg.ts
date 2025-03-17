// @ts-ignore
import pg from "pg";
import type { DatabaseInterface } from "../types/types";
import { STORE } from "../store/store";
import { ApiError } from "../errors/api.error";
const { Pool } = pg;

export class PoolPG implements DatabaseInterface {
  private pool;

  constructor() {
    let objPool = {};
    if (STORE.ENV == 0) {
      // estamos en local
      console.log("local");
      objPool = {
        user: STORE.PG.USER,
        password: STORE.PG.PASSWORD,
        host: STORE.PG.HOST,
        database: STORE.PG.NAME,
        port: parseInt(STORE.PG.PORT),
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      };
    } else {
      // estamos en heroku
      objPool = {
        connectionString: STORE.PG.HOST,
        ssl: {
          rejectUnauthorized: true,
        },
      };
    }
    this.pool = new Pool(objPool);
  }

  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } catch (error: any) {
      console.log("fallo: ", error);
      if (error.code == 23505) {
        const e = ApiError.errorList.ALREADY_EXISTS;
        e.message = "Ya existe el registro. (Registro Duplicado) ";
        throw e;
      }
      throw ApiError.errorList.INTERNAL_SERVER_ERROR;
    } finally {
      client.release();
    }
  }
}
