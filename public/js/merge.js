const mergePdfs = async (pdf1, pdf2) => {
  const PDFMerger = await import("pdf-merger-js");
  var merger = new PDFMerger.default();
  await merger.add(pdf1);
  await merger.add(pdf2);
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  return d;
};
module.exports = { mergePdfs };
