import {genSaltSync, hashSync}from 'bcryptjs';

export const bcryptAdapter = {

    // aqui se encripta la contraseña
hash: (password: string) => {
    const salt = genSaltSync(); 

    return hashSync(password, salt);
},

}