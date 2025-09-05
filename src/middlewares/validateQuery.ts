import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateQuery = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      convert: true, 
    });
    if (error) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", details: error.details.map(d => d.message) },
      });
    }
    (res.locals as any).query = value;
    next();
  };
};