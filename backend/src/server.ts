import express, { Request, Response, NextFunction } from 'express'
import { router } from './router';
import 'express-async-errors'

const app = express();

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log("Servidor Online!"))