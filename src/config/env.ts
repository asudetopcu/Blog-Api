import dotenv from "dotenv";
dotenv.config();

const required = ( name: string ) => {
    const v = process.env[name];
    if(!v) throw new Error(`issing env: ${name}`);
    return v;
};

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 5000),
    MONGO_URI: required("MONGO_URI"),
    JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET"),
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES ?? "15m",
    JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES ?? "7d"
};