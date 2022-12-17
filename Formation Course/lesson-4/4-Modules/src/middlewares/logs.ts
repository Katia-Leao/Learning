import { NextFunction, Request, Response } from "express";

export default async function logsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, url } = req;
  const trace = `${method} ${url}`;

  console.info(trace);
  console.time();
  await next();
  console.timeEnd();
}
