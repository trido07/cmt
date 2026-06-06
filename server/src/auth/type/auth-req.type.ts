import { FastifyRequest } from "fastify";
export interface AuthReq extends FastifyRequest {
  user: {
    accountType: string;
    userId: string;
  };
}
