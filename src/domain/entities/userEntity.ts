export class UserEntity {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly emailValidated: boolean,
        public readonly password: string,
        public readonly img: string,
        public readonly role: string
    ) {}
    
}