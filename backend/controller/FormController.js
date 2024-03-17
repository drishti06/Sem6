import { Email } from "../model/Email.js";
import { Form } from "../model/FormModel.js";

export const newForm = async (req, res) => {
  try {
    const { formItems } = req.body;
    const form_name = req.body.formItems.form_name;
    if (await Form.findOne({ form_name: form_name })) {
      res.status(500).json("Form already exist!");
    } else {
      const form = await Form.create(formItems);
      res.status(200).json(form);
    }
  } catch (error) {
    res.status(400).json({ errorInNewForm: error.message });
  }
};

export const examForm = async (req, res) => {
  try {
    const name = req.body.examName;
    const time = await Email.findOne({ form_name: name });
    
    const currentDateTime = new Date(); // Get current date and time
    
    if (currentDateTime < time.startDate) {
      res.status(403).json({message:"Exam has not yet started."});
    } else if (currentDateTime > time.endDate) {
        res.status(403).json({message:"Exam has ended."});
    } else {
      console.log("Exam is currently ongoing.");
      const form = await Form.findOne({ form_name: name });
      res.status(200).json(form);
    }
  } catch (error) {
    res.status(400).json({ errorInExamForm: error.message });
  }
};

export const allForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ errorInShowingAllForms: error.message });
  }
};

export const formDetails = async (req, res) => {
  try {
    const formName = req.body.formName;
    const formDetails = await Form.find({ form_name: formName });
    res.status(200).json(formDetails);
  } catch (error) {
    res.status(400).status({ errorInFormDetails: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteForm = await Form.findByIdAndDelete({ _id: id });
    res.status(200).json("succesfully deleted template");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
