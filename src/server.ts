import { app } from "./app";
import 'dotenv/config'

const port = Number(process.env.PORT) || 3333
app.listen({
    host: '0.0.0.0',
    port: port
}).then(() => {
    console.info(`Server running on port ${port}`)
})