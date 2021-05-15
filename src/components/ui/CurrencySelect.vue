<template>
  <div>
    <label id="listbox-label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative z-0">
      <button
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-labelledby="listbox-label"
          class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="button"
          @click="isSelect=!isSelect"
      >
              <span class="flex items-center">
                <div
                    :class="['currency-icon currency-flag currency-flag-lg',` currency-flag-${currency.key.toLowerCase()}`]"
                ></div>
                <span class="ml-3 block truncate">
                  {{ currency.key }}
                </span>
              </span>
        <select-icon/>
      </button>
      <ul
          v-show="isSelect"
          aria-activedescendant="listbox-option-3"
          aria-labelledby="listbox-label"
          class="absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
          tabindex="-1">
        <li
            v-for="cur in currencies"
            id="listbox-option-0"
            :key="cur.key"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
            role="option"
            @click="selectHandle(cur)"
        >
          <div class="flex items-center">
            <div
                :class="['currency-icon currency-flag currency-flag-lg',`currency-flag-${cur.key.toLowerCase()}`]"
            ></div>
            <span class="font-normal ml-3 block truncate">
                    {{ cur.key }}
                  </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SelectIcon from "@/components/ui/SelectIcon";

export default {
  name: 'custom-select',
  components: { SelectIcon },
  data() {
    return {
      isSelect: false
    };
  },
  computed: {
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    selectHandle(currency) {
      this.$emit("select-handle", currency);
      this.isSelect = !this.isSelect;
    }
  },
  props: {
    label: {
      type: String,
    },
    currency: {}
  }
};
</script>