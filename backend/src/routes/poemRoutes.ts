import { Router } from 'express';
import { PoemController } from '../controllers/poemController';
import { requireAuth, requireAdmin } from '../middleware/auth';

export function createPoemRoutes(poemController: PoemController): Router {
  const router = Router();

  // Public routes
  router.get('/', poemController.getPoems.bind(poemController));
  router.get('/:slug', poemController.getPoemBySlug.bind(poemController));

  // Admin routes
  router.post('/', requireAuth, requireAdmin, poemController.createPoem.bind(poemController));
  router.put('/:id', requireAuth, requireAdmin, poemController.updatePoem.bind(poemController));
  router.delete('/:id', requireAuth, requireAdmin, poemController.deletePoem.bind(poemController));

  return router;
}
