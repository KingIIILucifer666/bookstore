import colors from 'colors';
import { Request, Response, NextFunction } from 'express';

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const methodColors: Record<string, keyof typeof colors> = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
  };

  const color = methodColors[req.method] || 'white';

  const message = `${req.method} ${req.protocol}://${req.get('host')}${
    req.originalUrl
  }`;
  console.log((colors as any)[color](message));

  next();
};
