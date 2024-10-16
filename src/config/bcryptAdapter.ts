import {compare, genSaltSync, hashSync}from 'bcryptjs';

export const bcryptAdapter = {

    // aqui se encripta la contraseña
hash: (password: string) => {
    const salt = genSaltSync(); 

    return hashSync(password, salt);
},

compare: (password: string, hash: string) => {
    return compare(password, hash);
},

}