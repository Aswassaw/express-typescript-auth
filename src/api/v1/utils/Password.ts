import bcrypt from "bcrypt";

class Password {
  public static hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static compare = (
    reqPassword: string,
    userPassword: string
  ): Promise<boolean> => {
    return bcrypt.compare(reqPassword, userPassword);
  };
}

export default Password;
