declare const app: import("express-serve-static-core").Express;
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}
export default app;
//# sourceMappingURL=index.d.ts.map