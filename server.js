const fs = require("fs");
const Pdfmake = require("pdfmake");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

let fonts = {
  Roboto: {
    normal: "./fonts/roboto/Roboto-Regular.ttf",
    bold: "./fonts/roboto/Roboto-Medium.ttf",
    italics: "./fonts/roboto/Roboto-Italic.ttf",
    bolditalics: "./fonts/roboto/Roboto-MediumItalic.ttf",
  },
};

let pdfmake = new Pdfmake(fonts);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("pages/form");
});

app.get("/result", (req, res) => {
  res.render("pages/result");
});

app.get("/confirm", (req, res) => {
  res.render("pages/confirmation");
});

app.post("/", (req, res) => {
  const inputData = req.body.text;
  const imageLink = req.body.imageLink;
  let docDefination = {
    content: [
      {
        text: "PDF file",
        style: "headingStyle",
      },
      {
        text: inputData,
        style: "textStyle",
      },
      {
        image: imageLink,
      },
    ],

    styles: {
      headingStyle: {
        fontSize: 20,
        alignment: "center",
      },
      textStyle: {
        fontSize: 15,
        alignment: "center",
        color: "#003893",
        margin: [0, 30, 0, 20],
      },
    },
  };

  let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
  pdfDoc.pipe(fs.createWriteStream("pdfs/myPdf.pdf"));
  pdfDoc.end();

  res.redirect("/result");
});

app.post("/sendMail", (req, res) => {
  let sendTo = req.body.email;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amitroyy8@gmail.com",
      pass: "vuwmkukhsbmsmfds",
    },
  });

  let mailDetails = {
    from: "amitroyy8@gmail.com",
    to: sendTo,
    subject: "Pdf file",
    text: "This mail has been sent from pdf generater, find the pdf file attached below",
    attachments: [
      {
        filename: "pdf file",
        path: __dirname + "/pdfs/myPdf.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log("Error Occurs", err);
      res.statusCode(500).send("error occured");
    } else {
      res.redirect("/confirm");
    }
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is up...");
});
