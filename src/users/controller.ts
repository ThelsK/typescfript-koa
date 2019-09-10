import { JsonController, Get, Post, Put, Param, Body, HttpCode, NotFoundError } from "routing-controllers"
import User from "./entity"

@JsonController()
export default class UserController {
  @Get("/users")
  allUsers() {
    return User.find()
      .then(users => ({ users }))
      .catch(console.error)
  }

  @Get("/users/:id")
  getUser(
    @Param("id") id: number
  ) {
    return User.findOne(id)
  }

  @Post("/users")
  @HttpCode(201)
  async createUser(
    @Body() user: User
  ) {
    const { password, ...rest } = user
    const entity = User.create(rest)
    return entity.setPassword(password)
      .then(() => entity.save())
      .catch(console.error)
  }

  @Put("/users/:id")
  async updateUser(
    @Param("id") id: number,
    @Body() update: Partial<User>
  ) {
    return User.findOne(id).then(user => {
      if (!user) throw new NotFoundError("Cannot find user")
      const { password, ...rest } = user
      const entity = User.create(rest)
      return entity.setPassword(password)
        .then(() => User.merge(user, update).save())
        .catch(console.error)
    })
  }
}