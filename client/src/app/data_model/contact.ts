export class Contact {
    firstname: string;
    lastname: string;
    tel : number;
    email : string;
    agree : boolean;
    contacttype: string;
    message : string;
};

export const CONTACT_TYPE = ['none', 'Telephone', 'Email']; 