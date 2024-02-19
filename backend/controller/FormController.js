import { Form } from "../model/FormModel.js"

export const newForm = async (req, res) => {
    try {
        const formItems = req.body
        const form_name = req.body.form_name
        if (await Form.findOne({ form_name: form_name })) {
            res.status(500).json("Form already exist!")
            console.log('already exist')
        } else {
            const form = await Form.create(formItems)
            res.status(200).json(form)
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}