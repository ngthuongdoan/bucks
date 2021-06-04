<template>
  <div class="flex flex-col justify-start items-start gap-3">
    <div v-for="(s,index) in setting" :key="s.name" class="w-full flex gap-2">
      <label class="flex-grow">{{ s.name }}</label>
      <toggle-button :color="{checked: '#52734d', unchecked: '#d5ecca'}"
                     :value="settingValue[index]"
                     @click="settingValue[index] = !settingValue[index]"
      />
    </div>
    <div class="w-full flex gap-2">
      <label class="flex-grow">{{ $t("modal.language") }}</label>
      <div
          :class="['currency-icon currency-flag currency-flag-lg currency-flag-vnd', lang==='vi'?'':'grayscale']"
          @click="changeLanguage('vi')"
      ></div>
      <div
          :class="['currency-icon currency-flag currency-flag-lg currency-flag-usd', lang==='en'?'':'grayscale']"
          @click="changeLanguage('en')"
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
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  },
  components: {
    ToggleButton,
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    },
    reset() {
      this.settingValue = [...this.defaultSetting]
    }
  }
}
</script>

<style scoped>

</style>