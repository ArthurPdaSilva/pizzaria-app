import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if(!authToken) return res.status(401).end();
    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(token, process.env.SECRET_KEY as string) as Payload
        // Recuperar o id do token e salvar em um atributo enjetado no request
        req.userId = sub;
        return next();
    } catch (error) {
        return res.status(401).end();
    }
    next();
}

