<template>
  <add-layout title="Add Transaction" @save="save">
    <form class="flex flex-col m-auto gap-3 px-7 py-5">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <input
              v-model="transaction.value"
              class="add-input text-4xl font-bold text-center"
              type="text"
          />
        </label>
        <p class="text-center w-full ml-3">or</p>
        <label for="image">
          <img
              alt=""
              class="ml-3 grayscale"
              src="https://img.icons8.com/metro/26/000000/camera.png"/>
        </label>
        <input
            id="image"
            ref="fileInput"
            accept="image/*"
            capture="environment"
            class="hidden"
            type="file"
            @change="uploadImage"
        />
        <cropper
            v-if="transaction.image"
            :src="transaction.image"
            class="cropper"
            @change="change"
        ></cropper>
        <button v-if="transaction.image" type="button" @click="crop">
          Crop it
        </button>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold self-start" for="note">Note</label>
        <textarea
            id="note"
            v-model="transaction.detail"
            class="add-input"
            rows="5"
        ></textarea>
        <label class="font-bold" for="wallet">Wallet</label>
        <select id="wallet" v-model="transaction.wallet" class="add-input">
          <option value="">Sacombank</option>
          <option value="">Overview</option>
          <option value="">Saving</option>
        </select>
        <label class="font-bold" for="category">Category</label>
        <select id="category" v-model="transaction.category" class="add-input">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
        </select>
        <label class="font-bold" for="createdDate">Date</label>
        <input id="createdDate" v-model="transaction.date" class="add-input" type="date"/>
      </div>
    </form>
  </add-layout>

</template>

<script>
import AddLayout from "@/layout/AddLayout";
import { createWorker } from "tesseract.js";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

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

export default {
  data() {
    return {
      transaction: {
        value: 0,
        time: new Date(),
        category: "",
        detail: "",
        image: "",
        wallet: ""
      },
      cropper: {}
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
          this.transaction.detail += `${ words[0].text } ${ words[1].text } ${
              words.slice(-1)[0].text
          }\n`;
        });
        this.transaction.value = result.data.words
            .slice(-1)[0]
            .text.trim()
            .replace(new RegExp("[\u{0080}-\u{FFFF}]", "gu"), "");
        this.$helpers.close();
      } catch (err) {
        this.$helpers.showError(err);
      } finally {
        await worker.terminate();
      }
    },
    save() {
      console.log(this.transaction);
    }
  },
  components: {
    Cropper,
    AddLayout
  }
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