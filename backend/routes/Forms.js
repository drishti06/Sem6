import express from "express"
import { allForms, examForm, newForm } from "../controller/FormController.js"
import { responses } from "../controller/ResponseController.js"
import { newEmail } from "../controller/EmailController.js"

const router = express.Router()

router.post('/createForm', newForm)
    .post('/examForm', examForm)
    .post('/examResponse', responses)
    .get('/allForms', allForms)
    .post('/email',newEmail)
export default router