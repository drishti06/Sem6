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
      existingForm.formItems = formItems;
      await existingForm.save();
      SendMail(existingForm.email, existingForm.form_name);
      res.status(200).json(existingForm);
    } else {
      // Create a new form
      const form = await Email.create(formItems);
      SendMail(formItems.email, formItems.form_name);
      res.status(200).json(form);
    }
  } catch (error) {
    res.status(400).json({ errorInNewForm: error.message });
  }
};

function SendMail(emails, form_name) {
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
  // https://42ktm36f-3000.inc1.devtunnels.ms/
  let response = {
    body: {
      name: "Students",
      outro: ` https://42ktm36f-3000.inc1.devtunnels.ms/exam`,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "FormJam <photography181102@gmail.com>",
    to: emails,
    subject: `Exam Link For ${form_name} `,
    html: mail,
  };

  transport
    .sendMail(message)
    .then(() => {
      console.log("Mail Send Succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
