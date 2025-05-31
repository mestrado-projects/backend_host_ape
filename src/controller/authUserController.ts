import type { Request, Response } from "express"
import type { Users } from "../models/index.js"
import SignUpUserUseCase from "../useCase/users/signUpUser.js"
import SignInUserUseCase from "../useCase/users/signInUser.js"
import HeadersResponseHelper from "../utils/headerResponse.js"
import DeleteUserUseCase from "../useCase/users/deleteUser.js"
import UpdateUserUseCase from "../useCase/users/updateUser.js"
import GetUserUseCase from "../useCase/users/getUser.js"

async function signUpController(req: Request, res: Response) {
  try {
    const userData = req.body

    const result = await new SignUpUserUseCase().execute(userData)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(201).send(result)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function signInController(req: Request, res: Response) {
  try {
    const user: Users = req.body

    const result = await new SignInUserUseCase().execute(user)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(200).send(result)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function deleteUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid user Id ${req.params?.id}`,
      })
      return
    }

    const message = await new DeleteUserUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    const newData = req.body

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid user Id ${req.params?.id}`,
      })
      return
    }

    const message = await new UpdateUserUseCase().execute(id, newData)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getUserController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid user Id ${req.params?.id}`,
      })
      return
    }

    const user = await new GetUserUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(200).send({ ...user })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export { signInController, signUpController, deleteUserController, updateUserController, getUserController }
