import express, { Request, Response, NextFunction } from 'express'
import { router } from './router'
import cors from 'cors'
import 'express-async-errors'

const app = express();

app.use(express.json())
app.use(cors())
app.use(router)
//Tratar erros de uma maneira elegante
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) return res.status(400).json({error: err.message})
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3000, () => console.log("Servidor Online!"))