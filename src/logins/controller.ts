import { JsonController, Post, Body, BadRequestError } from "routing-controllers"
import { IsString } from "class-validator"
import User from "../users/entity"
import { sign } from "../jwt"

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    return User.findOne({ where: { email } })
      .then(user => {
        if (!user) throw new BadRequestError("A user with this email does not exist")
        return user.checkPassword(password)
          .then((passwordIsCorrect: boolean) => {
            if (!passwordIsCorrect) throw new BadRequestError("The password is not correct")
            const jwt = user.id && sign({ id: user.id })
            return { jwt }
          })
      })
  }
}