import {createWorker} from "tesseract.js";

export const load = async () => {
  const worker = createWorker({
    // workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
    langPath:
      "https://raw.githubusercontent.com/naptha/tessdata/gh-pages/4.0.0_best/",
    // corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
    logger: (m) => console.log(m)
  });
  await worker.load();
  await worker.loadLanguage("vie");
  await worker.initialize("vie");
  return worker;
};

export const postProcessing = (rawInput) => {
  return new Promise((resolve, reject) => {
    let detail = "";
    let value = 0;
    rawInput.forEach((line) => {
      detail += line.text
    })
    console.log(rawInput.slice(-1)[0].text.replace(/[^\d.-]/g, ""))
    const lastLines = rawInput.slice(-1)[0].words.slice(-1)[0];
    value = Number(
      lastLines.text
        .trim()
        .replace(/[^0-9-]+/g, "")
    )
    if (isNaN(value)) {
      reject(new Error('Sorry please input the value manually'));
    }
    resolve({detail, value})
  })
}

