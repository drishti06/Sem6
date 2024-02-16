import { Form } from "../model/FormModel.js"

export const newForm = async (req, res) => {
    try {
        const formItems = req.body
        if (Form.find(formItems.form_name)) {
            res.status(500).json("Form already exist!")
        } else {
            const form = Form.create(formItems)
            res.status(200).json(form)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}