<template>
  <div>
    <div>
      <p class="font-bold">Name</p>
      <input v-model="category.name" type="text">
      <p class="font-bold">Upload an image to Firebase:</p>
      <input accept="image/*" type="file" @change="previewImage">
      <p class="font-bold">Type</p>
      <select v-model="category.type">
        <option value="">None</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="debt-loan">Debt-Loan</option>
      </select>
    </div>
    <div v-if="imageData!=null">
      <button class="p-3 bg-blue-400" @click="onUpload">Upload</button>
    </div>
  </div>
</template>
<script>
import Category from "@/model/Category.model";
import {categoryStore} from "@/plugin/db";
import firebase from 'firebase';

export default {
  name: 'Upload',
  data() {
    return {
      imageData: null,
      uploadValue: 0,
      category: new Category()
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
    },

    async onUpload() {
      this.$helpers.loading();
      try {
        const metadata = {
          contentType: 'image/png'
        };

        this.picture = null;
        const storageRef = firebase.storage().ref(`category/${ this.imageData.name }`).put(this.imageData, metadata);
        storageRef.on(`state_changed`, snapshot => {
              this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, error => {console.log(error.message);},
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.category.icon = url;
                categoryStore.add(Object.assign({}, this.category));
                this.$helpers.showSuccess();
              });
            }
        );
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  }
};
</script>