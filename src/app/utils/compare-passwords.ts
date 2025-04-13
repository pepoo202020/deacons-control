import bcrypt from "bcrypt";
export const comparePasswords = ( password: string, confirmPassword: string ) => {
    const isPasswordMatch = bcrypt.compare( password, confirmPassword );
    return isPasswordMatch;
}

