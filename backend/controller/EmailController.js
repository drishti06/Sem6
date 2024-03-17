import { Email } from "../model/Email.js";
import { createTransport } from "nodemailer";
import Mailgen from "mailgen";
import { Form } from "../model/FormModel.js";
export const newEmail = async (req, res) => {
  try {
    // console.log("inside newEmail")
    const { formItems } = req.body;
    const form_name = formItems.form_name;
    // Check if the form already exists
    let existingForm = await Email.findOne({ form_name });

    if (existingForm) {
      // Update existing form data
      existingForm.form_name = formItems.form_name;
      existingForm.startDate = formItems.startDate;
      existingForm.endDate = formItems.endDate;
      formItems.email.forEach(element => {
          existingForm.email.push(element);
        
      });
      
       await existingForm.save();
      SendMail(existingForm.email, existingForm.form_name,existingForm.startDate,existingForm.endDate);
      res.status(200).json(existingForm);
    } else {
      // Create a new form
      const form = await Email.create(formItems);
      SendMail(existingForm.email, existingForm.form_name,existingForm.startDate,existingForm.endDate);
      res.status(200).json(form);
    }
  } catch (error) {
    res.status(400).json({ errorInNewForm: error.message });
  }
};

function SendMail(emails, form_name, startDate, endDate) {
    const startTime = startDate.toLocaleString(); // Convert startDate to a readable format
    const endTime = endDate.toLocaleString(); // Convert endDate to a readable format
  
    let config = {
      service: "gmail",
      port: 587,
      auth: {
        user: "photography181102@gmail.com",
        pass: "qotj jmom gbal nrab",
      },
    };
  
    let transport = createTransport(config);
  
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "FormJam",
        link: "https://lk5pz0d3-3000.inc1.devtunnels.ms/",
      },
    });
  
    let response = {
      body: {
        name: "Students",
        // Include start and end time in the email body
        start_time: `Start Time: ${startTime}`,
        end_time: `End Time: ${endTime}`,
        outro: `https://lk5pz0d3-3000.inc1.devtunnels.ms/exam?name=${encodeURIComponent(form_name)}`,
      },
    };
  
    let mail = {
      body: {
        // Include start and end time in the email body
        title: "Exam Details",
        intro: [
          response.body.start_time,
          response.body.end_time,
        ],
        outro: response.body.outro,
      },
    };
  
    let emailBody = MailGenerator.generate(mail);
  
    let message = {
      from: "FormJam <photography181102@gmail.com>",
      to: emails,
      subject: `Exam Link For ${form_name}`,
      html: emailBody,
    };
  
    transport
      .sendMail(message)
      .then(() => {
        console.log("Mail Sent Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
