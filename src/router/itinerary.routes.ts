import { Router } from "express"
import {
  createItineraryController,
  getItinerariesController,
  getItineraryByIdController,
  updateItineraryController,
  deleteItineraryController,
} from "../controller/itineraryController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin } from "../middlewares/roleValidateMiddleware.js"

const itineraryRouter = Router()

/**
 * @swagger
 * /itinerary:
 *   post:
 *     summary: Criar um novo roteiro
 *     tags: [Itinerary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - is_active
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do roteiro
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do roteiro
 *               location:
 *                 type: string
 *                 description: Localização do roteiro
 *               duration_days:
 *                 type: integer
 *                 description: Duração em dias (opcional)
 *               estimated_cost:
 *                 type: number
 *                 description: Custo estimado (opcional)
 *               difficulty_level:
 *                 type: string
 *                 description: Nível de dificuldade (opcional)
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: Lista de atividades (opcional)
 *               image_url:
 *                 type: string
 *                 description: URL da imagem do roteiro (opcional)
 *               is_active:
 *                 type: boolean
 *                 description: Se o roteiro está ativo
 *     responses:
 *       201:
 *         description: Roteiro criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
itineraryRouter.post("/itinerary", tokenValidateMiddleware, requireAdmin(), createItineraryController)

/**
 * @swagger
 * /itinerary:
 *   get:
 *     summary: Listar todos os roteiros
 *     tags: [Itinerary]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas roteiros ativos
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtrar por localização
 *     responses:
 *       200:
 *         description: Lista de roteiros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro interno do servidor
 */
itineraryRouter.get("/itinerary", getItinerariesController)

/**
 * @swagger
 * /itinerary/{id}:
 *   get:
 *     summary: Buscar roteiro por ID
 *     tags: [Itinerary]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do roteiro
 *     responses:
 *       200:
 *         description: Roteiro encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Roteiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
itineraryRouter.get("/itinerary/:id", getItineraryByIdController)

/**
 * @swagger
 * /itinerary/{id}:
 *   put:
 *     summary: Atualizar roteiro
 *     tags: [Itinerary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do roteiro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               duration_days:
 *                 type: integer
 *               estimated_cost:
 *                 type: number
 *               difficulty_level:
 *                 type: string
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *               image_url:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Roteiro atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Roteiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
itineraryRouter.put("/itinerary/:id", tokenValidateMiddleware, requireAdmin(), updateItineraryController)

/**
 * @swagger
 * /itinerary/{id}:
 *   delete:
 *     summary: Deletar roteiro
 *     tags: [Itinerary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do roteiro
 *     responses:
 *       200:
 *         description: Roteiro deletado com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Roteiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
itineraryRouter.delete("/itinerary/:id", tokenValidateMiddleware, requireAdmin(), deleteItineraryController)

export default itineraryRouter
