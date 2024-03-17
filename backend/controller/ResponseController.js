import { Response } from "../model/ResponseModel.js";

export const responses = async (req, res) => {
    try {
        const { examName, answers, studentName, correctAns, totalMarks } = req.body;
        const matchingCount = answers.filter(answer => correctAns.includes(answer)).length;
        // console.log(answers)
        // console.log(correctAns)
        // console.log(matchingCount)
        const response = await Response.create({
            total_marks: totalMarks,
            score: correctAns.length - matchingCount,
            exam_name: examName,
            student_name: studentName,
            answers: answers
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}