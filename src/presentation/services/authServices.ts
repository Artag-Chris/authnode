import { UserModel } from "../../data";
import { CustomerError, RegisterUserDto } from "../../domain";


export class AuthService {


constructor() {}

public async registerUser(registerUserDto:RegisterUserDto) {

    const existUser= await UserModel.findOne({email:registerUserDto.email});
    if(existUser) throw CustomerError.badRequest(`Email already exist`);

    return "todo ok";

}



}