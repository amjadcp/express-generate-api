import { Request } from "express";

export interface RequestWithUser extends Request {
  user: {
    _id: string;
    email: string;
    isAdmin: boolean;
    org: string;
  };
}

export interface sendMailData {
  to: string[] | string;
  subject: string;
  htmlBody: string;
}

export interface DeleteMany { 
  acknowledged: boolean;
  deletedCount: number ;
}