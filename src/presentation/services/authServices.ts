import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { EmailService } from "./emailService";


export class AuthService {


constructor(
  private readonly emailService: EmailService
) {}

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
     await this.sendEmailValidationLink(user.email);

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

  private sendEmailValidationLink =async(email:string)=>{

    const token = await JwtAdapter.generateToken({ email });
    if ( !token ) throw CustomError.internalServer('Error while creating JWT');

   const link=` ${envs.WEBSERVICE_URL}/auth/validate-email/=${token}`
   const html = `
   <h1>Validate your email</h1>
   <p>Click to validate your email</p>
   <a href="${link}">here</a>
   `;

  const options={
    to:email,
    subject:"Validate your email",
    htmlBody:html
  }

  const isSent = await this.emailService.sendEmail(options);
  if(!isSent) throw CustomError.internalServer('Error while sending email');
  
  return true
  }

  public validateEmail = async (token: string) => {

  const payload = await JwtAdapter.verifyToken(token);
  if (!payload) throw CustomError.unauthorized('Invalid token');


  const { email } = payload as { email: string };
  if (!email) throw CustomError.internalServer('Email not exist');

  const user = await UserModel.findOne({ email });
  if (!user) throw CustomError.internalServer('User not exist');

  user.emailvalidated = true;

  await user.save();
  return true

  }


}