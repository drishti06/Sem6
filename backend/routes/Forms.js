import express from "express"
import { newForm } from "../controller/FormController.js"

const router = express.Router()

router.post('/createForm', newForm)

export default router