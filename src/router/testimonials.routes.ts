import { Router } from "express"
import {
  createTestimonialController,
  getTestimonialsController,
  getTestimonialByIdController,
  updateTestimonialController,
  deleteTestimonialController,
} from "../controller/testimonialsController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin, requireAnyRole } from "../middlewares/roleValidateMiddleware.js"

const testimonialsRouter = Router()

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Criar um novo depoimento
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author_name
 *               - content
 *               - rating
 *               - is_featured
 *               - is_active
 *             properties:
 *               guest_id:
 *                 type: integer
 *                 description: ID do hóspede (opcional)
 *               author_name:
 *                 type: string
 *                 description: Nome do autor do depoimento
 *               author_location:
 *                 type: string
 *                 description: Localização do autor (opcional)
 *               content:
 *                 type: string
 *                 description: Conteúdo do depoimento
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Avaliação de 1 a 5
 *               author_image_url:
 *                 type: string
 *                 description: URL da imagem do autor (opcional)
 *               is_featured:
 *                 type: boolean
 *                 description: Se o depoimento é destacado
 *               is_active:
 *                 type: boolean
 *                 description: Se o depoimento está ativo
 *     responses:
 *       201:
 *         description: Depoimento criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
testimonialsRouter.post("/testimonials", tokenValidateMiddleware, requireAdmin(), createTestimonialController)

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Listar todos os depoimentos
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas depoimentos ativos
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas depoimentos destacados
 *     responses:
 *       200:
 *         description: Lista de depoimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro interno do servidor
 */
testimonialsRouter.get("/testimonials", getTestimonialsController)

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Buscar depoimento por ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do depoimento
 *     responses:
 *       200:
 *         description: Depoimento encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Depoimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
testimonialsRouter.get("/testimonials/:id", getTestimonialByIdController)

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Atualizar depoimento
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do depoimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guest_id:
 *                 type: integer
 *               author_name:
 *                 type: string
 *               author_location:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               author_image_url:
 *                 type: string
 *               is_featured:
 *                 type: boolean
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Depoimento atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Depoimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
testimonialsRouter.put("/testimonials/:id", tokenValidateMiddleware, requireAnyRole(), updateTestimonialController)

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Deletar depoimento
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do depoimento
 *     responses:
 *       200:
 *         description: Depoimento deletado com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Depoimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
testimonialsRouter.delete("/testimonials/:id", tokenValidateMiddleware, requireAdmin(), deleteTestimonialController)

export default testimonialsRouter
