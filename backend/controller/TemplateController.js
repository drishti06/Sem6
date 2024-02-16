import csv from "csvtojson"
import { Template } from "../model/TemplateModel.js"

export const parseExcel = async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(req.file.path);
        res.status(200).json(jsonArray)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const uploadExcel = async (req, res) => {
    try {
        const { temp_name, mcqs } = req.body
        const data = await Template.create({ temp_name, mcqs })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const allTemplates = async (req, res) => {
    try {
        const templates = await Template.find()
        res.status(200).json(templates)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const allQuestionsById = async (req, res) => {
    try {
        const id = req.params.id
        const questions = await Template.find({ _id: id }, 'mcqs').exec()
        res.send(questions[0].mcqs)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const randomNoOfQuestions = async (req, res) => {
    try {
        const template_name = req.body.template_name;
        if (!template_name) {
            return res.status(400).json({ error: 'Template name is required in the request body' });
        }
        const number = req.body.quantity
        // console.log(number)
        const questions = await Template.aggregate([
            { $match: { temp_name: template_name } }, // Filter documents by template_name
            { $project: { random_mcqs: { $slice: ["$mcqs", number] } } } // Select random elements from 'mcqs' field
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ error: 'No documents found with the specified template_name' });
        }
        res.status(200).json(questions[0].random_mcqs)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const allTempName = async (req, res) => {
    try {
        const result = await Template.distinct('temp_name');
        res.json(result);
    } catch (err) {
        console.error('Error fetching template names:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const deletTemplate = async (req, res) => {
    try {
        const id = req.params.id
        const deleteTemp = await Template.findByIdAndDelete({ _id: id })
        res.status(200).json("succesfully deleted template")
    } catch (error) {
        res.status(400).json(error.message)

    }
}