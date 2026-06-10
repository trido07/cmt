import { HttpException, Logger } from "@nestjs/common";

export const HttpErr: (err: any) => never = (err: any) => {
  if (err instanceof HttpException) {
    throw err;
  } else {
    Logger.log(err.message);
    throw new Error("Internal server error");
  }
};
