<template>
  <div>
    <b-form-checkbox v-model="checked" @change="onSelect">
      <strong>{{ step.name }}</strong>
    </b-form-checkbox>
    <span class="float-right">
      <i
        @click="showOrHiddenStepForm"
        v-b-tooltip.hover
        title="Edit this step"
        class="oi oi-pencil"
        style="margin-right: 5px; font-size: 12px; cursor: pointer;"
      />
      <b-link class="text-dark">
        <i
          @click="showModal"
          v-b-tooltip.hover
          title="delete this step"
          class="oi oi-trash"
          style="margin-right: 5px; font-size: 12px;"
        />
      </b-link>
    </span>

    <div style="padding-left: 25px;">
      <small>Used on {{ step.tests.length }} tests</small>
      ·
      <small>{{ getGeneratorDesc() }}</small>
    </div>

    <step-form
      v-if="showStepForm"
      :step="step"
      :stepType="stepType"
      :title="''"
      :stepTypeLabel="stepTypeLabel"
      :stepNameLabel="stepNameLabel"
      :options="options"
      v-on:cancel-new-or-update-step="showOrHiddenStepForm"
    />
    <div 
      v-else
      style="padding-left: 25px;">
      <component :is="generatorDisplay" :step="step">
        <br>
      </component>
    </div>
    <base-modal ref="myModalRef" v-on:delete="deleteStep">
      <template slot="title">Do you really want to delete this step?</template>
      <template
        slot="body"
      >This step is used on {{ step.tests.length }} test. Deleting it will remove it from all tests.</template>
    </base-modal>
  </div>
</template>



<script>
import { mapActions } from "vuex";

import BaseModal from "@/components/base/BaseModal";
import StepForm from "./StepForm";
import RandomGeneratorDisplay from "../generator/randomGenerator/RandomGeneratorDisplay";
import HttpReqGeneratorDisplay from "../generator/httpReqGenerator/HttpReqGeneratorDisplay";

import { getGeneratorOption } from "@/utils/steps";
import { clone } from "@/config/utils";

export default {
  name: "StepDisplay",
  props: {
    step: {
      type: Object,
      required: true
    },
    stepType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    stepTypeLabel: {
      type: String,
      required: true
    },
    stepNameLabel: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    initialChecked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseModal,
    StepForm,
    RandomGeneratorDisplay,
    HttpReqGeneratorDisplay
  },
  data() {
    return {
      showStepForm: false,
      checked: this.initialChecked
    };
  },
  computed: {
    generatorDisplay() {
      return this.getGeneratorType() + "Display";
    }
  },
  methods: {
    ...mapActions([
      "deleteThisSetup",
      "deleteSetupStep",
      "createNewSetupStep",
      "deleteThisTeardown",
      "createNewTeardownStep",
      "deleteTeardownStep"
    ]),
    deleteStep() {
      if (this.stepType === "setup") {
        this.deleteSetup();
      } else if (this.stepType === "teardown") {
        this.deleteTeardown();
      }
    },
    deleteSetup() {
      this.deleteThisSetup(this.step.id);
    },
    deleteTeardown() {
      this.deleteThisTeardown(this.step.id);
    },
    onSelect() {
      if (this.stepType === "setup") {
        return this.checked ? this.uncheckSetup() : this.checkSetup();
      } else if (this.stepType === "teardown") {
        return this.checked ? this.uncheckTeardown() : this.checkTeardown();
      }
    },
    checkSetup() {
      this.createNewSetupStep({
        setupId: this.step.id,
        testId: Number(this.$route.params.testId)
      }).then(res => (this.checked = true));
    },
    uncheckSetup() {
      this.deleteSetupStep({
        setupId: this.step.id,
        testId: Number(this.$route.params.testId)
      });
    },
    checkTeardown() {
      this.createNewTeardownStep({
        teardownId: this.step.id,
        testId: Number(this.$route.params.testId)
      }).then(res => (this.checked = true));
    },
    uncheckTeardown() {
      this.deleteTeardownStep({
        teardownId: this.step.id,
        testId: Number(this.$route.params.testId)
      });
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    showOrHiddenStepForm() {
      this.showStepForm = !this.showStepForm;
    },
    getGeneratorDesc() {
      return getGeneratorOption(this.step.generator.type).text;
    },
    getGeneratorType() {
      return getGeneratorOption(this.step.generator.type).type;
    }
  }
};
</script>



<style scoped>
</style>


