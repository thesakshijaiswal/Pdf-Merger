const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const multer = require("multer");
const { mergePdfs } = require("./public/js/merge");
const upload = multer({ dest: "uploads/" });
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  try {
    if (req.files.length !== 2) {
      throw new Error("please select exactly two PDFs to merge");
    }

    let generationTimestamp = await mergePdfs(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path),
    );
    const mergedPdfPath = path.join(
      __dirname,
      `public/generatedPdfs/${generationTimestamp}.pdf`,
    );
    fs.readFile(mergedPdfPath, (err, data) => {
      if (err) {
        throw new Error("Failed to read the merged PDF file.");
      }
      // res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="merged.pdf"`);
      res.send(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.listen(3000);
