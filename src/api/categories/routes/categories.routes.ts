import { CategoriesRepository } from "@/repositories/categories/categories.repository";
import { CategoriesService } from "@/services/categories/categories.service";
import { Hono } from "hono";
import { CategoriesController } from "../controller/categories.controller";

export const categoriesRoutes = new Hono();

const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const categoriesController = new CategoriesController(categoriesService);
categoriesRoutes.get("/:id", categoriesController.getCategoryById);
categoriesRoutes.post("/", categoriesController.createCategory);
categoriesRoutes.get("/", categoriesController.getCategories);
