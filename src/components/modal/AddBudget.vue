<template>
  <div>
    <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addBudget">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <input
              v-model.number="budget.value"
              v-unsigned
              class="add-input text-4xl font-bold text-center m-0"
              type="text"
          />
        </label>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold self-start" for="note">Note</label>
        <textarea
            id="note"
            v-model="budget.detail"
            class="add-input"
            rows="5"
        ></textarea>
        <label class="font-bold mt-2" for="wallet">Wallet</label>
        <div class="add-input " @click="toggleSubModal('budget-wallet-modal')">
          {{ wallet.name || "" }}
        </div>
        <label class="font-bold mt-2" for="category">Category</label>
        <div class="add-input" @click="toggleSubModal('category-modal')">
          {{ budget.category.name || "" }}
        </div>
        <label class="font-bold mt-2" for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
        <label v-if="isDebtLoan" class="font-bold mt-2">Person</label>
        <div v-if="isDebtLoan" class="add-input" @click="toggleSubModal('person-modal')">{{
            budget.person.name || ""
          }}
        </div>
      </div>

      <div class="flex w-full items-center justify-center gap-3">
        <input
            class="main-btn p-3 w-2/6"
            type="submit"
            value="Create">
        <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
                type="button"
                @click="$store.dispatch('modalModule/changeModal')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AppModal from "@/components/modal/AppModal";
import CategoryModal from "@/components/modal/CategoryModal";
import {Timestamp} from "@/plugin/db";
import {TransactionService} from "@/service/Transaction.service";
import TransactionWalletModal from "@/components/modal/TransactionWalletModal";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      budget: {},
      tempDate: "",
      modal: "",
      isSubOpen: false,
      isDebtLoan: false
    };
  },
  computed: {
    ...mapGetters({
      isOpen: "modalModule/isOpen"
    })
  },
  methods: {
    toggleSubModal(modal = "") {
      this.modal = modal;
      this.isSubOpen = !this.isSubOpen;
    },
    async addBudget() {
      this.$helpers.loading();
      try {
        //Refined Data
        this.budget.time = Timestamp.fromDate(new Date(Date.parse(this.tempDate)));
        this.budget.value = Number.parseFloat(this.budget.value) *
            (this.$getConst("INCREASE_DICT").includes(this.budget.category.type) ? 1 : -1)

        if (this.$getConst("DEBT_DICT").includes(this.budget.category.type)) {
          this.budget.person.totalDebt += this.budget.value;
        } else if (this.$getConst("LOAN_DICT").includes(this.budget.category.type)) {
          this.budget.person.totalLoan += this.budget.value;
        }

        await TransactionService.addNew(this.budget);
        this.$helpers.showSuccess();
        await this.$store.dispatch("modalModule/changeModal");
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    Cropper,
    AppModal,
    CategoryModal,
    TransactionWalletModal,
    PersonModal
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