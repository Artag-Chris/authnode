import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";


export class AuthService {


constructor() {}

public async registerUser(registerUserDto:RegisterUserDto) {

    const existUser= await UserModel.findOne({email:registerUserDto.email});
    if(existUser) throw CustomError.badRequest(`Email already exist`);

    try {
        
     const user = new UserModel(registerUserDto);
     //encriptar contraseña
     user.password = bcryptAdapter.hash(registerUserDto.password);

     //JWT <======= para mantener la autentificacion del usuario
     const token = await JwtAdapter.generateToken({ id: user.id });
     if ( !token ) throw CustomError.internalServer('Error while creating JWT');
     //Email de confirmacion 
     

     await user.save();

     const {password,...userEntity} = UserEntity.fromObject(user);
     return {
        "user":userEntity,
        token: token,
     }

    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }

}

public async loginUser( loginUserDto: LoginUserDto ) {

    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('Email not exist');

    const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
    if ( !isMatching ) throw CustomError.badRequest('Password is not valid');


    const { password, ...userEntity} = UserEntity.fromObject( user );
    
    const token = await JwtAdapter.generateToken({ id: user.id });
    if ( !token ) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    }



  }



}