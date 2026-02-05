"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const upload = (0, multer_1.default)({
    dest: './uploads/',
    limits: { fileSize: 52428800 },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/wav', 'audio/mp4'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
function createUploadRoutes(db) {
    const router = (0, express_1.Router)();
    // Upload image
    router.post('/image', upload.single('file'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const filename = `${(0, uuid_1.v4)()}${path_1.default.extname(req.file.originalname)}`;
            const filepath = path_1.default.join('./uploads/', filename);
            fs_1.default.renameSync(req.file.path, filepath);
            res.json({
                message: 'Image uploaded',
                url: `/uploads/${filename}`,
                filename,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Upload failed' });
        }
    });
    // Upload audio
    router.post('/audio', upload.single('file'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const filename = `${(0, uuid_1.v4)()}${path_1.default.extname(req.file.originalname)}`;
            const filepath = path_1.default.join('./uploads/', filename);
            fs_1.default.renameSync(req.file.path, filepath);
            res.json({
                message: 'Audio uploaded',
                url: `/uploads/${filename}`,
                filename,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Upload failed' });
        }
    });
    return router;
}
exports.createUploadRoutes = createUploadRoutes;
//# sourceMappingURL=uploadRoutes.js.map