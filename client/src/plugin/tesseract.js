import { createWorker, PSM, OEM } from "tesseract.js";
let worker;
export const loading = async () => {
  worker = createWorker({
    logger: (m) => console.log(m),
  });

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng", OEM.LSTM_ONLY);
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  });

  return worker;
};

export const recognize = async (img) => {
  const {
    data: { text },
  } = await worker.recognize(img);
  return text;
};
