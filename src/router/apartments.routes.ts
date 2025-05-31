import { Router } from "express"
import { createApartmentsController } from "../controller/createApartmentsController.js"
import validateSchemaMiddleware from "../middlewares/schemaValidateMiddleware.js"
import { createApartmentSchema } from "../schemas/createApartmentSchema.js"
import { getApartmentsController } from "../controller/getApartmentControlle.js"
import { fetchApartmentsController } from "../controller/fetchApartmentsController.js"
import { createApartmentImagesController } from "../controller/createApartmentImages.js"
import upload from "../services/multerConfig.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin } from "../middlewares/roleValidateMiddleware.js"

const apartmentsRouter = Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /apartments:
 *   post:
 *     summary: Criar um novo apartamento
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - simpleLocation
 *               - basicPrice
 *               - type
 *               - bathroom
 *               - bedroom
 *               - kitchen
 *               - beds
 *               - about
 *               - details
 *               - commodities
 *               - rules
 *               - contacts
 *               - property_security
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do apartamento
 *               simpleLocation:
 *                 type: string
 *                 description: Localização simples
 *               basicPrice:
 *                 type: number
 *                 description: Preço básico
 *               type:
 *                 type: string
 *                 enum: [Apartment, Studio]
 *                 description: Tipo do apartamento
 *               bathroom:
 *                 type: integer
 *                 description: Número de banheiros
 *               bedroom:
 *                 type: integer
 *                 description: Número de quartos
 *               kitchen:
 *                 type: boolean
 *                 description: Se possui cozinha
 *               beds:
 *                 type: integer
 *                 description: Número de camas
 *               about:
 *                 type: string
 *                 description: Descrição sobre o apartamento
 *     responses:
 *       200:
 *         description: Apartamento criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
apartmentsRouter.post(
  "/apartments",
  tokenValidateMiddleware,
  requireAdmin(),
  validateSchemaMiddleware(createApartmentSchema),
  createApartmentsController,
)
/**
 * @swagger
* /apartments/{apartmentId}/images:
*   post:
*     summary: Adicionar imagens ao apartamento
*     tags: [Apartments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: apartmentId
*         required: true
*         schema:
*           type: integer
*         description: ID do apartamento
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               main:
*                 type: string
*                 format: binary
*                 description: Imagem principal
*               thumb:
*                 type: string
*                 format: binary
*                 description: Imagem thumbnail
*               images:
*                 type: array
*                 items:
*                   type: string
*                   format: binary
*                 description: Imagens adicionais (máximo 30)
*     responses:
*       200:
*         description: Imagens adicionadas com sucesso
*       400:
*         description: Dados inválidos
*       401:
*         description: Não autorizado
*       500:
*         description: Erro interno do servidor
*
*/
apartmentsRouter.post(
  "/apartments/:apartmentId/images/",
  tokenValidateMiddleware,
  requireAdmin(),
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 30 },
  ]),
  createApartmentImagesController,
)
/**
 * @swagger
* /apartments:
*   get:
*     summary: Listar todos os apartamentos
*     tags: [Apartments]
*     responses:
*       200:
*         description: Lista de apartamentos
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*       500:
*         description: Erro interno do servidor
*/
apartmentsRouter.get("/apartments", fetchApartmentsController)
/**
 * @swagger
* /apartments/{id}:
*   get:
*     summary: Buscar apartamento por ID
*     tags: [Apartments]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID do apartamento
*     responses:
*       200:
*         description: Apartamento encontrado
*       400:
*         description: ID inválido
*       404:
*         description: Apartamento não encontrado
*       500:
*         description: Erro interno do servidor
*/
apartmentsRouter.get("/apartments/:id", getApartmentsController)

export default apartmentsRouter
