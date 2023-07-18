import { FastifyReply, FastifyRequest } from 'fastify'
import { TaskService } from '../services/tasks.service'
import { IFile, IParams } from '../../types/request.type'
import { upload } from '../../app'
import { NotFoundExceptionError } from '../error/error.notfounderror'

class TaskController {
    taskService: TaskService
    constructor() {
        this.taskService = new TaskService()
    }

    create = async (req: FastifyRequest, res: FastifyReply) => {
        try {
            const data = await this.taskService.create(req.body)
            res.status(201).send(data)
        } catch (e: any) {
            res.status(400).send(e)
        }
    }

    findById = async (req: FastifyRequest, res: FastifyReply) => {
        const { id } = req.params as IParams

        try {
            const data = await this.taskService.findById(id)
            res.status(200).send(data)
        } catch (e) {
            if (e instanceof NotFoundExceptionError) {
                res.status(400).send({
                    message: `id ${id} not found`
                })
            } else {
                res.status(400).send(e)
            }
        }
    }

    findAll = async (req: FastifyRequest, res: FastifyReply) => {
        const data = await this.taskService.findAll()
        res.status(200).send(data)
    }

    update = async (req: FastifyRequest, res: FastifyReply) => {
        const { id } = req.params as IParams
        const payload = req.body as IParams
        const data = await this.taskService.update(id, payload)
        res.status(200).send(data)
    }

    delete = async (req: FastifyRequest, res: FastifyReply) => {
        const { id } = req.params as IParams
        const data = await this.taskService.delete(id)
        res.status(200).send(data)
    }

    importFromCsv = async (req: FastifyRequest, res: FastifyReply) => {
        //@ts-ignore
        const file = req.file as IFile
        await this.taskService.importFromCsv(file.path)
        res.status(201).send({
            message: 'Database imported successfully'
        })
    }
}

export default new TaskController()

