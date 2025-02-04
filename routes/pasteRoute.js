import express from "express"
import { addPaste, deletePaste, updatePaste,getPastes, getPaste } from "../controllers.js/pasteController.js";

const router=express.Router();

router.post('/addPaste',addPaste);
router.put('/updatePaste/:id',updatePaste);
router.delete('/deletePaste/:id',deletePaste);
router.get('/getPastes',getPastes);
router.get('/getPaste/:id',getPaste);

export default router;

