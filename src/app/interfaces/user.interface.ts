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

//Interface de la información de los usuarios  
export interface Users {
    id: number,
    username: string,
    role: string
}

//Interface para crear y editar usuarios
export interface UserEdit {
    username: string,
    password: string,
    role: string
}