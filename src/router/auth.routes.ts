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

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Criar uma nova conta de usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               role:
 *                 type: string
 *                 enum: [ROLE_ADMIN, ROLE_GUEST]
 *                 description: Papel do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *
 * /users/sign-in:
 *   post:
 *     summary: Realizar login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *                 user:
 *                   type: object
 *                   description: Dados do usuário
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 *
 * /guest/profile:
 *   post:
 *     summary: Criar perfil de hóspede
 *     tags: [Guest Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Telefone do hóspede
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *               document_number:
 *                 type: string
 *                 description: Número do documento
 *               preferences:
 *                 type: string
 *                 description: Preferências do hóspede
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     summary: Buscar perfil de hóspede
 *     tags: [Guest Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perfil não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     summary: Atualizar perfil de hóspede
 *     tags: [Guest Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               document_number:
 *                 type: string
 *               preferences:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perfil não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

// User routes
authUserRouter.post("/users/sign-up", signUpController)
authUserRouter.post("/users/sign-in", signInController)
authUserRouter.get("/user/:id", tokenValidateMiddleware, requireAnyRole(), getUserController)
authUserRouter.put("/user/:id", tokenValidateMiddleware, requireAnyRole(), updateUserController)
authUserRouter.delete("/user/:id", tokenValidateMiddleware, requireAnyRole(), deleteUserController)

// Guest profile routes
authUserRouter.post("/guest/profile", tokenValidateMiddleware, requireGuest(), createGuestProfileController)
authUserRouter.get("/guest/profile", tokenValidateMiddleware, requireGuest(), getGuestProfileController)
authUserRouter.put("/guest/profile", tokenValidateMiddleware, requireGuest(), updateGuestProfileController)

export default authUserRouter
