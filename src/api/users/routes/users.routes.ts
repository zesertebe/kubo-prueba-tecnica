import { UsersRepository } from "@/repositories/users/users.repository";
import { UsersService } from "@/services/users/users.service";
import { Hono } from "hono/quick";
import { UsersController } from "../controller/users.controller";

export const usersRoutes = new Hono();

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

usersRoutes.get("/", usersController.getUsers);
usersRoutes.get("/:id", usersController.getUsersById);
usersRoutes.post("/", usersController.createUser);
