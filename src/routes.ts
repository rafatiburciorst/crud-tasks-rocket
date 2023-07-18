import { FastifyInstance } from "fastify";

import TaskController from './http/controllers/task.controller'
import { upload } from "./app";

export async function appRoutes(app: FastifyInstance) {
    app.post('/tasks', TaskController.create)
    app.get('/tasks', TaskController.findAll)
    app.get('/tasks/:id', TaskController.findById)
    app.patch('/tasks/:id', TaskController.update)
    app.delete('/tasks/:id', TaskController.delete)
    app.post('/tasks/upload', { preHandler: upload.single('file')}, TaskController.importFromCsv)
}