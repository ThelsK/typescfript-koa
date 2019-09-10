import "reflect-metadata"
import { createKoaServer, Action } from "routing-controllers"
import setupDb from "./db"
import { verify } from "./jwt"
import PageController from "./pages/controller"
import UserController from "./users/controller"
import LoginController from "./logins/controller"

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    PageController,
    UserController,
    LoginController,
  ],
  authorizationChecker: (action: Action) => {
    const args = action.request.headers.authorization.split(" ")
    return args && args[0] === "Bearer" && args[1] && verify(args[1])
      && true || false
  }
})

setupDb()
  .then(() => app.listen(port, () => console.log(`Listening on :${port}`)))
  .catch(console.error)