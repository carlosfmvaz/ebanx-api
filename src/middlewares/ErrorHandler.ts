import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/ApiError";

export const errorHandler = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode ?? 500;
    if (statusCode == 404) {
        return res.status(404).json(0);
    } else {
        return res.status(statusCode).json({ message: error.message });
    }
}