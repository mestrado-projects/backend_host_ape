import { Router } from "express"
import {
  createFAQController,
  getFAQsController,
  updateFAQController,
  deleteFAQController,
} from "../controller/faqController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin } from "../middlewares/roleValidateMiddleware.js"

const faqRouter = Router()

/**
 * @swagger
 * /faq:
 *   post:
 *     summary: Criar uma nova pergunta frequente
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *               - is_active
 *             properties:
 *               question:
 *                 type: string
 *                 description: Pergunta
 *               answer:
 *                 type: string
 *                 description: Resposta
 *               category:
 *                 type: string
 *                 description: Categoria (opcional)
 *               order_position:
 *                 type: integer
 *                 description: Posição de ordenação (opcional)
 *               is_active:
 *                 type: boolean
 *                 description: Se a FAQ está ativa
 *     responses:
 *       201:
 *         description: FAQ criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

faqRouter.post("/faq", tokenValidateMiddleware, requireAdmin(), createFAQController)
 /**
 * @swagger
 *   get:
 *     summary: Listar todas as perguntas frequentes
 *     tags: [FAQ]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas FAQs ativas
 *     responses:
 *       200:
 *         description: Lista de FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro interno do servidor
 */
faqRouter.get("/faq", getFAQsController)
 /**
 * @swagger
 * /faq/{id}:
 *   put:
 *     summary: Atualizar pergunta frequente
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da FAQ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               category:
 *                 type: string
 *               order_position:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: FAQ atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: FAQ não encontrada
 *       500:
 *         description: Erro interno do servidor
*/
faqRouter.put("/faq/:id", updateFAQController)
 /**
 * @swagger
 *   delete:
 *     summary: Deletar pergunta frequente
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da FAQ
 *     responses:
 *       200:
 *         description: FAQ deletada com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: FAQ não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
faqRouter.delete("/faq/:id", deleteFAQController)

export default faqRouter
