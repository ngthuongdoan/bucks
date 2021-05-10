<template>
  <div class="flex gap-3">
    <button :class="['btn ', activeOverview==='week'&&'btn-active main-btn']" @click="changeView('week')">Week
    </button>
    <button :class="['btn ', activeOverview==='month'&&'btn-active main-btn']" @click="changeView('month')">Month
    </button>
    <button :class="['btn ', activeOverview==='year'&&'btn-active main-btn']" @click="changeView('year')">Year
    </button>
  </div>
</template>
<script>
export default {
  name: 'change-view',
  props: {
    activeOverview: {
      type: String,
      validate(value) {
        return ["week", "month", "year"].includes(value);
      }
    }
  },
  methods: {
    changeView(view) {
      this.activeOverview = view
    }
  }
}
</script>
