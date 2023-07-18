
export interface IParams {
    id: string
    title: string
    description: string
    completed_at?: Date | string | null
}

export interface IFile {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}