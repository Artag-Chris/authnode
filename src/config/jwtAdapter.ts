import jwt from 'jsonwebtoken';
import { envs } from './envs';


const secret = envs.JWT_SEED;

export class JwtAdapter {

    static async generateToken( payload:any, duration: string = '2h' ) {

        return new Promise((resolve) => {
    jwt.sign(payload,secret,{expiresIn: duration},(err, token) => {
        
        if (err) return resolve(null);

        resolve(token);
    })

        })
        
    }

    static verifyToken( token: string ) {
        return new Promise((resolve)=>{

            jwt.verify(token,secret,(err, decoded) => {
              if (err) return resolve(null);
              resolve(decoded)
            })
          })
    }

}