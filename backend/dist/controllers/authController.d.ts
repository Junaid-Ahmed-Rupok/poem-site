import { Request, Response } from 'express';
import { Pool } from 'pg';
export declare class AuthController {
    private db;
    constructor(db: Pool);
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=authController.d.ts.map