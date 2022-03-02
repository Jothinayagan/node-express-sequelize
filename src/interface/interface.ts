export interface GenerateToken {
    id: string;
    email: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
}

export interface Token {
    accessToken: string;
}

// Sequelize pool
export interface Pool {
    max: number;
    min: number;
    acquire: number;
    idle: number;
}
