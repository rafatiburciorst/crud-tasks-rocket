import { PrismaRepository } from "../repository/prisma.repository";
import { ZodError, z } from "zod";
import { IParams } from "../../types/request.type";
import csv from 'csv-parser'
import { Prisma, Tasks } from "@prisma/client";
import { createReadStream } from 'fs'
import { NotFoundExceptionError } from '../error/error.notfounderror'

export class TaskService {

    private prismaRepository: PrismaRepository

    constructor() {
        this.prismaRepository = new PrismaRepository()
    }

    create = async (data: any): Promise<Tasks | null> => {
        const taskSchema = z.object({
            title: z.string().min(3).max(255),
            description: z.string().min(3).max(255),
            completed: z.date().optional().nullable(),
        })

        const validatedData = taskSchema.parse(data)

        try {
            const task = await this.prismaRepository.create(validatedData)
            return task
        } catch {
            throw new Error()
        }

    }

    findById = async (id: string): Promise<Tasks | null> => {
        const idSchema = z.string()
        const validatedId = await idSchema.safeParseAsync(id)

        if (validatedId.success) {
            try {
                const task = await this.prismaRepository.findById(validatedId.data)
                return task
            } catch {
                throw new NotFoundExceptionError()
            }
        }
        throw new Error()
    }

    findAll = async (): Promise<Tasks[]> => {
        const tasks = await this.prismaRepository.findAll()
        return tasks
    }

    update = async (id: string, data: IParams): Promise<Tasks | null> => {
        const taskSchema = z.object({
            title: z.string().min(3).max(255),
            description: z.string().min(3).max(255),
            completed: z.date().optional().nullable(),
        })

        const validatedData = taskSchema.parse(data)

        try {
            const task = await this.prismaRepository.update(id, validatedData)
            return task
        } catch {
            throw new Error()
        }
    }

    delete = async (id: string): Promise<void> => {
        try {
            await this.prismaRepository.delete(id)
        } catch {
            throw new Error()
        }
    }

    importFromCsv = async (data: string) => {
        const result: Prisma.TasksUncheckedCreateInput[] = []
        createReadStream(data)
            .pipe(csv({ separator: ';', headers: ['title', 'description', 'completed_at'], skipLines: 1 }))
            .on('data', (item: Prisma.TasksUncheckedCreateInput) => {
                result.push(item)
            }).on('end', async () => {
                await this.prismaRepository.importFromCsv(result)
            })
    }
}