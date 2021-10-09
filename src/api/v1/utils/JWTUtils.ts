import JWT from "jsonwebtoken";

class JWTUtils {
  public static generateJwtToken = (id: number): string => {
    const secretKey = process.env.JWT_SECRET || "secret_basic_7&e$%dj2@0";
    const jwtToken = JWT.sign({ user: { id } }, secretKey, {
      expiresIn: 18000, // Waktu kedaluwarsa lima jam
    });

    return jwtToken;
  };
}

export default JWTUtils;
