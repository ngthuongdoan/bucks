<template>
  <add-layout :title="$t('addBudget')">
    <app-modal
        v-if="isSubOpen"
        :is-category="true"
        @away="toggleSubModal"
    >
      <component
          :is="modal"
          @change-category="changeCategory($event)"
      ></component>
    </app-modal>
    <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addBudget">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <currency-input
              v-model="budget.total"
              :currency="null"
              :precision="0"
              :value-as-integer="true"
              class="add-input text-4xl font-bold text-center m-0"
          />
        </label>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold mt-2">{{ $t("category") }}</label>
        <div class="add-input" @click="toggleSubModal('category-modal')">
          {{ budget.category.name[$i18n.locale] || "" }}
        </div>
        <label class="font-bold mt-2">{{ $t("modal.budgetModal.startDate") }}</label>
        <input v-model="tempStartDate" class="add-input" type="date"/>
        <label class="font-bold mt-2">{{ $t("modal.budgetModal.dueDate") }}</label>
        <input v-model="tempDueDate" class="add-input" type="date"/>
      </div>
    </form>
  </add-layout>
</template>

<script>
import AppModal from "@/components/modal/AppModal";
import CategoryModal from "@/components/modal/CategoryModal";
import {Timestamp} from "@/plugin/db";
import {mapGetters} from "vuex";
import Budget from "@/model/Budget.model";
import {BudgetService} from "@/service/Budget.service";
import AddLayout from "@/layout/AddLayout";

export default {
  data() {
    return {
      budget: new Budget(),
      tempStartDate: "",
      tempDueDate: "",
      modal: "",
      isSubOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      isOpen: "modalModule/isOpen"
    }),

  },
  methods: {
    toggleSubModal(modal = "") {
      this.modal = modal;
      this.isSubOpen = !this.isSubOpen;
    },
    changeCategory(category) {
      if (category.type === "expense") {
        this.budget.category = {id: category.id, ...category}
      } else {
        this.$helpers.showError(new Error("Cannot use debt/loan type"))
      }
      this.toggleSubModal()
    },
    async addBudget() {
      this.$helpers.loading();
      try {
        //Refined Data
        this.budget.beginDate = Timestamp.fromDate(new Date(Date.parse(this.tempStartDate)));
        this.budget.dueDate = Timestamp.fromDate(new Date(Date.parse(this.tempDueDate)));
        this.budget.total = Math.abs((this.budget.total))

        await BudgetService.addNew(this.budget);
        this.$helpers.showSuccess();
        await this.$store.dispatch("modalModule/changeModal");
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    AddLayout,
    AppModal,
    CategoryModal,
  },
};
</script>