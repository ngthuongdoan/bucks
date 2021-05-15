<template>
  <div class="flex flex-col justify-start items-start gap-3">
    <div v-for="(s,index) in setting" :key="s.name" class="w-full flex gap-2">
      <label class="flex-grow" for="">{{ s.name }}</label>
      <toggle-button :color="{checked: '#52734d', unchecked: '#d5ecca'}"
                     :value="settingValue[index]"
                     @click="settingValue[index] = !settingValue[index]"
      />
    </div>
    <div class="w-full flex gap-2">
      <label class="flex-grow" for="">Choose Language</label>
      <div
          :class="['currency-icon currency-flag currency-flag-lg currency-flag-vnd', defaultLang==='vi'?'grayscale':'']"
      ></div>
      <div
          :class="['currency-icon currency-flag currency-flag-lg currency-flag-usd', defaultLang==='en'?'grayscale':'']"
      ></div>
    </div>
    <div class="mt-3 w-full">
      <button
          class="main-btn p-3 w-full"
          @click="reset"
      > RESET
      </button>
    </div>
  </div>
</template>

<script>
import {ToggleButton} from 'vue-js-toggle-button';
import setting from "@/config/settings.json"

export default {
  name: "SettingModal",
  data() {
    return {
      setting,
      defaultSetting: [false, true, false],
      settingValue: [false, true, false],
      defaultLang: 'vi'
    }
  },
  components: {
    ToggleButton,
  },
  methods: {
    changeLanguage(lang) {
      console.log(lang)
    },
    reset() {
      this.settingValue = [...this.defaultSetting]
    }
  }
}
</script>

<style scoped>

</style>