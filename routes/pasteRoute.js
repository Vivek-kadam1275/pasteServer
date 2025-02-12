import express from "express"
import { addPaste, deletePaste, updatePaste,getPastes, getPaste } from "../controllers/pasteController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router=express.Router(); 

router.post('/addPaste',auth,addPaste);
router.put('/updatePaste/:id',auth,updatePaste);
router.delete('/deletePaste/:id',auth,deletePaste);
router.get('/getPastes',auth,getPastes);
router.get('/getPaste/:id',auth,getPaste);

export default router;

