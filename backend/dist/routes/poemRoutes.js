"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPoemRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
function createPoemRoutes(poemController) {
    const router = (0, express_1.Router)();
    // Public routes
    router.get('/', poemController.getPoems.bind(poemController));
    router.get('/:slug', poemController.getPoemBySlug.bind(poemController));
    // Admin routes
    router.post('/', auth_1.requireAuth, auth_1.requireAdmin, poemController.createPoem.bind(poemController));
    router.put('/:id', auth_1.requireAuth, auth_1.requireAdmin, poemController.updatePoem.bind(poemController));
    router.delete('/:id', auth_1.requireAuth, auth_1.requireAdmin, poemController.deletePoem.bind(poemController));
    return router;
}
exports.createPoemRoutes = createPoemRoutes;
//# sourceMappingURL=poemRoutes.js.map