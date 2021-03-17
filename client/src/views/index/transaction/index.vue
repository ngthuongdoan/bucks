<template>
  <div class="h-screen overflow-auto w-screen">
    <div
      class="bg-gray-600 text-white flex justify-around items-center w-full py-5"
    >
      <img src="~@/assets/back.png" class="w-7" @click="$helpers.back" />
      <h1 class="text-lg">Add Transaction</h1>
      <button class="font-bold text-lg">Save</button>
    </div>
    <form class="flex flex-col m-auto gap-3 px-7 py-5">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <input
          type="number"
          min="0"
          step="1000"
          value="0"
          class="add-input text-4xl font-bold text-center"
        />
        <p class="text-center w-full ml-3">or</p>
        <img
          class="ml-3 grayscale"
          src="https://img.icons8.com/metro/26/000000/camera.png"
          @click="recognize"
        />
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label for="username" class="font-bold self-start">Note</label>
        <textarea class="add-input" rows="5"></textarea>
        <label for="username" class="font-bold">Wallet</label>
        <select class="add-input" name="" id="">
          <option value="">Sacombank</option>
          <option value="">Overview</option>
          <option value="">Saving</option>
        </select>
        <label for="username" class="font-bold">Category</label>
        <select class="add-input" name="" id="">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
          c
        </select>
        <label for="username" class="font-bold">Date</label>
        <input type="date" class="add-input" />
      </div>
      <img src="~@/assets/img/test.png" id="text-img" class="hidden" />
    </form>
  </div>
</template>

<script>
import { createWorker, PSM, OEM } from "tesseract.js";
const worker = createWorker({
  // workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
  langPath:
    "https://raw.githubusercontent.com/naptha/tessdata/gh-pages/4.0.0_best/",
  // corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
  logger: (m) => console.log(m),
});
export default {
  methods: {
    async recognize() {
      const img = document.getElementById("text-img");

      await worker.load();
      await worker.loadLanguage("vie");
      await worker.initialize("vie");
      const result = await worker.recognize(img);
      console.log(result.data.lines);
      await worker.terminate();
    },
  },
};
</script>

<style>
</style>