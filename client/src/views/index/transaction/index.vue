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
          type="text"
          class="add-input text-4xl font-bold text-center"
          v-model="transaction.value"
        />
        <p class="text-center w-full ml-3">or</p>
        <label for="image">
          <img
            class="ml-3 grayscale"
            src="https://img.icons8.com/metro/26/000000/camera.png"
          />
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          ref="fileInput"
          capture="environment"
          @change="uploadImage"
          class="hidden"
        />
        <cropper
          class="cropper"
          :src="transaction.image"
          @change="change"
          v-if="transaction.image"
        ></cropper>
        <button type="button" @click="crop" v-if="transaction.image">
          Crop it
        </button>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label for="username" class="font-bold self-start">Note</label>
        <textarea
          class="add-input"
          rows="5"
          v-model="transaction.detail"
        ></textarea>
        <label for="username" class="font-bold">Wallet</label>
        <select class="add-input" v-model="transaction.wallet">
          <option value="">Sacombank</option>
          <option value="">Overview</option>
          <option value="">Saving</option>
        </select>
        <label for="username" class="font-bold">Category</label>
        <select class="add-input" v-model="transaction.category">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
        </select>
        <label for="username" class="font-bold">Date</label>
        <input type="date" class="add-input" v-model="transaction.date" />
      </div>
    </form>
  </div>
</template>

<script>
import { createWorker, PSM, OEM } from "tesseract.js";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
const worker = createWorker({
  // workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
  langPath:
    "https://raw.githubusercontent.com/naptha/tessdata/gh-pages/4.0.0_best/",
  // corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
  logger: (m) => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage("vie");
  await worker.initialize("vie");
})();

export default {
  data() {
    return {
      transaction: {
        value: 0,
        time: new Date(),
        category: "",
        detail: "",
        image: "",
        wallet: "",
      },
      cropper: {},
    };
  },
  methods: {
    change(result) {
      this.cropper = Object.assign({}, result);
    },
    crop() {
      this.transaction.image = this.cropper.canvas.toDataURL("image/png", 1);
      this.recognize();
    },
    uploadImage() {
      const image = this.$refs.fileInput.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (evt) => {
        let img = evt.target.result;
        this.transaction.image = img;
      };
    },
    async recognize() {
      this.$helpers.loading();
      try {
        const result = await worker.recognize(this.transaction.image);
        const lines = result.data.lines;
        lines.forEach((line) => {
          const words = line.words;
          this.transaction.detail += `${words[0].text} ${words[1].text} ${
            words.slice(-1)[0].text
          }\n`;
        });
        this.transaction.value = result.data.words
          .slice(-1)[0]
          .text.trim()
          .replace(new RegExp("[\u{0080}-\u{FFFF}]", "gu"), "");
        console.log(result.data);
        this.$helpers.close();
      } catch (err) {
        this.$helpers.showError(err);
      } finally {
        await worker.terminate();
      }
    },
  },
  components: {
    Cropper,
  },
};
</script>

<style>
/*
  Maybe you need to set the limits for the cropper sizes or its container sizes
  otherwise a cropping image will try to fill all available space
*/
.cropper {
  height: fit-content;
  max-height: 600px;
  background: #ddd;
}
</style>