import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
              email: email
            }
          })
      
        if(!userAlreadyExists) throw new Error("User/password incorrect")

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if(!passwordMatch) throw new Error("User/password incorrect")

        // Gerar token
        const token = sign({
            name: userAlreadyExists.name,
            email: userAlreadyExists.email
        }, process.env.SECRET_KEY as string, {
            subject: userAlreadyExists.id,
            expiresIn: '30d'
        })

        return {
            id: userAlreadyExists.id,
            name: userAlreadyExists.name,
            email: userAlreadyExists.email,
            token: token
        }
    }
}

export { AuthUserService };