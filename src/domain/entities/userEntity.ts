import { CustomerError } from "../errors/customError";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly emailValidated: boolean,
    public readonly password: string,
    public readonly role: string[],
    public readonly img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidated, password, role, img } =object;


   if(!_id&&id){
   throw CustomerError.badRequest(`Missing id`);
  }

  if(!name) throw CustomerError.badRequest(`Missing name`);
  if(!email) throw CustomerError.badRequest(`Missing email`);
  if(emailValidated===undefined) throw CustomerError.badRequest(`Missing emailValidated`);
  if(!password) throw CustomerError.badRequest(`Missing password`);
  if(!role) throw CustomerError.badRequest(`Missing role`);
 
  return new UserEntity(id || _id, name, email, emailValidated, password, role, img);

}
}
