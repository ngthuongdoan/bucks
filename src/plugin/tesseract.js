import { createWorker } from "tesseract.js";

const worker = createWorker({
	// workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
	langPath:
		"https://raw.githubusercontent.com/naptha/tessdata/gh-pages/4.0.0_best/",
	// corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
	logger: (m) => console.log(m)
});

(async () => {
	await worker.load();
	await worker.loadLanguage("vie");
	await worker.initialize("vie");
})();

export default worker;