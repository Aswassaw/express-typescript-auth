import { check } from "express-validator";

class AuthValidation {
  // @POST     | /api/v1/auth/register
  public registerValidation = [
    check("username", "Username is required").not().isEmpty(),
    check(
      "username",
      "Username only can contains alphabet and number"
    ).isAlphanumeric(),
    check("username", "Username maximum length is 30 characters").isLength({
      max: 30,
    }),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password require 8 or more characters").isLength({
      min: 8,
    }),
  ];

  // @POST     | /api/v1/auth/login
  public loginValidation = [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ];
}

export default new AuthValidation();
