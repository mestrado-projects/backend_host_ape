import { Router } from "express"
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "../controller/bookingsController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin, requireAnyRole } from "../middlewares/roleValidateMiddleware.js"

const bookingsRouter = Router()

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Criar uma nova reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guest_id
 *               - apartment_id
 *               - check_in_date
 *               - check_out_date
 *               - guests_quantity
 *               - total_price
 *             properties:
 *               guest_id:
 *                 type: integer
 *                 description: ID do hóspede
 *               apartment_id:
 *                 type: integer
 *                 description: ID do apartamento
 *               check_in_date:
 *                 type: string
 *                 format: date
 *                 description: Data de check-in
 *               check_out_date:
 *                 type: string
 *                 format: date
 *                 description: Data de check-out
 *               guests_quantity:
 *                 type: integer
 *                 description: Quantidade de hóspedes
 *               total_price:
 *                 type: number
 *                 description: Preço total
 *               special_requests:
 *                 type: string
 *                 description: Solicitações especiais (opcional)
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     summary: Listar todas as reservas
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 * /bookings/{id}:
 *   get:
 *     summary: Buscar reserva por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Reserva não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     summary: Atualizar reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               check_in_date:
 *                 type: string
 *                 format: date
 *               check_out_date:
 *                 type: string
 *                 format: date
 *               guests_quantity:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               special_requests:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Reserva não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     summary: Deletar reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva deletada com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Reserva não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
bookingsRouter.post("/bookings", tokenValidateMiddleware, requireAdmin(), createBookingController)
bookingsRouter.get("/bookings", tokenValidateMiddleware, requireAdmin(), getBookingsController)
bookingsRouter.get("/bookings/:id", tokenValidateMiddleware, requireAnyRole(), getBookingByIdController)
bookingsRouter.put("/bookings/:id", tokenValidateMiddleware, requireAnyRole(), updateBookingController)
bookingsRouter.delete("/bookings/:id", tokenValidateMiddleware, requireAdmin(), deleteBookingController)

export default bookingsRouter
