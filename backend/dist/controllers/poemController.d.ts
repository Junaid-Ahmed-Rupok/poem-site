import { Request, Response } from 'express';
import { Pool } from 'pg';
export declare class PoemController {
    private db;
    constructor(db: Pool);
    getPoems(req: Request, res: Response): Promise<void>;
    getPoemBySlug(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createPoem(req: Request, res: Response): Promise<void>;
    updatePoem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePoem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=poemController.d.ts.map