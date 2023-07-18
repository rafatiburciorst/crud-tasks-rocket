import { Prisma, PrismaClient, Tasks } from "@prisma/client";

export class PrismaRepository {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    create = async (data: Prisma.TasksUncheckedCreateInput): Promise<Tasks> => {
        try {
            const task = await this.prisma.tasks.create({
                data
            })
            return task
        } catch {
            throw new Error()
        }
    }

    findById = async (id: string): Promise<Tasks | null> => {
        try {
            const task = await this.prisma.tasks.findUniqueOrThrow({
                where: {
                    id
                }
            })
            return task
        } catch {
            throw new Error()
        }
    }

    findAll = async (): Promise<Tasks[]> => {
        const tasks = await this.prisma.tasks.findMany()
        return tasks
    }

    update = async (id: string, data: Prisma.TasksUncheckedUpdateInput): Promise<Tasks | null> => {
        try {
            const task = await this.prisma.tasks.update({
                where: {
                    id
                },
                data
            })
            return task
        } catch {
            throw new Error()
        }
    }

    delete = async (id: string) => {
        const task = await this.prisma.tasks.delete({
            where: {
                id
            }
        })
        return task
    }

    importFromCsv = async (data: Prisma.TasksUncheckedCreateInput[]) => {
        data.map(async (task) => {
            await this.prisma.tasks.create({
                data: {
                    title: task.title,
                    description: task.description,
                    completed_at: task.completed_at === "" ? null : task.completed_at
                }
            })
        })
        return true
    }
}