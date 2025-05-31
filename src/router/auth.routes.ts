import { Router } from "express"
import {
  deleteUserController,
  getUserController,
  signInController,
  signUpController,
  updateUserController,
} from "../controller/authUserController.js"
import {
  createGuestProfileController,
  getGuestProfileController,
  updateGuestProfileController,
} from "../controller/guestsController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin, requireAnyRole, requireGuest } from "../middlewares/roleValidateMiddleware.js"

const authUserRouter = Router()

// User routes
authUserRouter.post("/users/sign-up", signUpController)
authUserRouter.post("/users/sign-in", signInController)
authUserRouter.get("/user/:id", tokenValidateMiddleware, requireAnyRole(), getUserController)
authUserRouter.put("/user/:id", tokenValidateMiddleware, requireAnyRole(), updateUserController)
authUserRouter.delete("/user/:id", tokenValidateMiddleware, requireAdmin(), deleteUserController)

// Guest profile routes
authUserRouter.post("/guest/profile", tokenValidateMiddleware, requireGuest(), createGuestProfileController)
authUserRouter.get("/guest/profile", tokenValidateMiddleware, requireGuest(), getGuestProfileController)
authUserRouter.put("/guest/profile", tokenValidateMiddleware, requireGuest(), updateGuestProfileController)

export default authUserRouter
