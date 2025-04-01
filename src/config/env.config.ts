export const ENV = {
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://default_user:password@localhost:5432/default_db",
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "temp",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "temp",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "1h",
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
    NODE_ENV: process.env.NODE_ENV || "development",
};