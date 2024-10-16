import { regularExps } from "../../../config";


export class RegisterUserDto{

private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
){}

static fromObject(object: { [key: string]: any }):[string?,RegisterUserDto?] {
    const { name, email, password } = object;

    if(!name) return[`Missing name`];
    if(!email) return[`Missing email`];
    if(!regularExps.email.test(email)) return[`Email not valid`];
    if(password.length<6) return[`Password must be at least 6 characters`];
    
    return [undefined, new RegisterUserDto(name, email, password)];
}

}