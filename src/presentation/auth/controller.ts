import { Request, Response } from 'express';

export class AuthController {

constructor() {}

registerUser= async (req:Request, res:Response, ) => {

    res.json(`register`);
}

loginUser= async (req:Request, res:Response, ) => {

    res.json(`Login User`);
}

validateEmail= async (req:Request, res:Response, ) => {

    res.json(`Validate Email`);
}

}