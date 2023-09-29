//Interface de la iformación que retorna la API
export interface User{
    id: number,
    token: string,
    role: string,
    message: string
}

//Interface de la inforación que se manda a la API
export interface LoginRequest {
    username: string,
    password: string
}