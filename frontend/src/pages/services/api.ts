import { signOut } from "@/contexts/AuthContext";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupApiClient(ctx: undefined |  GetServerSidePropsContext<ParsedUrlQuery, PreviewData> = undefined) {
    const cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'http://localhost:3333/',
        // Injetar o token
        headers:  {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    // Usuário não autorizado
    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if(error.response?.status === 401) {
            // Qualquer error 401 
            if(typeof window !== undefined) {
                // Chamar função para deslogar
                signOut();
            } else return Promise.reject(new AuthTokenError())
        }
        return Promise.reject(error)
    })

    return api;
}