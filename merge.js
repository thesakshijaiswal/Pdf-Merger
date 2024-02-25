const mergePdfs = async (p1, p2) => {
  const PDFMerger = await import("pdf-merger-js");
  var merger = new PDFMerger.default();
  await merger.add(p1); //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  return d;
};
module.exports = { mergePdfs };
