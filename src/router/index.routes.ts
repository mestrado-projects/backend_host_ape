import { Request, Response, Router } from "express";
import apartmentsRouter from "./apartments.routes.js";
import authGuestRouter from "./auth.routes.js";
import bookingsRouter from "./bookings.routes.js";
import faqRouter from "./faq.routes.js";
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Host Ape',
          version: '1.0.0',
          description: 'Documentação gerada automaticamente com swagger-jsdoc',
      },
      servers: [
          {
              url: 'http://localhost:3000',
              description: 'Servidor local',
          },
      ],
    },
    apis: ['../router/*.js'],
}

const swaggerSpec = swaggerJSDoc(options);

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "healthy" });
});
router.use(apartmentsRouter);
router.use(authGuestRouter);
router.use(bookingsRouter)
router.use(faqRouter)
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default router;
