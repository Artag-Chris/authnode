import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';

export class AuthController {

constructor() {}

registerUser= async (req:Request, res:Response, ) => {
const registerUserDto = RegisterUserDto.create(req.body);
    res.json(registerUserDto);
}

loginUser= async (req:Request, res:Response, ) => {

    res.json(`Login User`);
}

validateEmail= async (req:Request, res:Response, ) => {

    res.json(`Validate Email`);
}

}