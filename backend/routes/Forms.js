import express from "express"
import { examForm, newForm } from "../controller/FormController.js"

const router = express.Router()

router.post('/createForm', newForm)
    .post('/examForm', examForm)

export default router