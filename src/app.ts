import fastify from 'fastify'

import { appRoutes } from './routes'
import multer from 'fastify-multer'

export const app = fastify()
export const upload = multer({
    dest: './uploads'
})

app.register(multer.contentParser)
app.register(appRoutes)

// app.post('/upload', { preHandler: upload.single('file') }, (req, res) => {
//     console.log(req.file);
// })
