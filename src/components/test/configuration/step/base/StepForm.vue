<template>
  <div>
    <h5 class="card-title" v-show="title">{{ title }}</h5>
    <b-form-group label-for="generator">
      <template slot="label">
        <div style="padding-left: 12px; padding-right:12px">{{stepTypeLabel}}</div>
      </template>
      <b-form-select id="generator" v-model="genType" :options="options"/>
      <b-form-group label-for="stepName">
        <template slot="label">
          <div style="padding-left: 12px; padding-right:12px">{{stepNameLabel}}</div>
        </template>
        <b-form-input id="stepName" :value="stepName" @change="stepName = $event"/>
      </b-form-group>
    </b-form-group>
    <component
      :is="currentGen"
      :step="step"
      :stepType="stepType"
      v-on:cancel-new-or-update-step="cancel"
      v-on:save="save"
    />
  </div>
</template>



<script>
import { mapActions } from "vuex";

import HttpReqGenerator from "../generator/httpReqGenerator";
import RandomGenerator from "../generator/randomGenerator";

import { clone } from "@/config/utils";

export default {
  name: "StepForm",
  props: {
    step: {
      type: Object
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
    defaultGen: {
      type: String
    }
  },
  components: {
    HttpReqGenerator,
    RandomGenerator
  },
  data() {
    return {
      selectGen: "",
      inputedSetupName: ""
    };
  },
  computed: {
    genType: {
      get() {
        if (this.selectGen) {
          return this.selectGen;
        } else if (this.step) {
          return this.step.generator.type;
        }
        return this.defaultGen;
      },
      set(generator) {
        this.selectGen = generator;
      }
    },
    stepName: {
      get() {
        if (this.inputedSetupName) {
          return this.inputedSetupName;
        } else if (this.step && this.step.generator.type === this.genType) {
          return this.step.name;
        }
        return this.options.find(option => option.value === this.genType).name;
      },
      set(newVal) {
        this.inputedSetupName = newVal;
      }
    },
    currentGen() {
      return this.options.find(option => option.value === this.genType).type;
    }
  },
  methods: {
    ...mapActions([
      "createNewSetup",
      "createNewSetupStep",
      "updateThisSetup",
      "createNewTeardown",
      "createNewTeardownStep",
      "updateThisTeardown"
    ]),
    save(variables = [], settings = {}) {
      const step = this.buildStep(variables, settings);

      if (this.stepType === "setup") {
        this.createOrUpdateSetup(step);
      } else if (this.stepType === "teardown") {
        this.createOrUpdateTeardown(step);
      }
    },
    createOrUpdateSetup(step) {
      if (this.step) {
        // 修改
        this.updateThisSetup(step).then(res => {
          this.cancel();
        });
      } else {
        // 新增
        this.createNewSetup(step).then(newSetup => {
          this.createNewSetupStep({
            setupId: newSetup.id,
            testId: Number(this.$route.params.testId)
          }).then(res => {
            this.cancel();
          });
        });
      }
    },
    createOrUpdateTeardown(step) {
      if (this.step) {
        this.updateThisTeardown(step).then(res => {
          this.cancel();
        });
      } else {
        this.createNewTeardown(step).then(newTeardown => {
          this.createNewTeardownStep({
            teardownId: newTeardown.id,
            testId: Number(this.$route.params.testId)
          }).then(res => {
            this.cancel();
          });
        });
      }
    },
    buildStep(variables, settings) {
      // 去除uniqueKey
      const vars = clone(variables).map(variable => {
        this.$delete(variable, "uniqueKey");
        return variable;
      });

      const step = {
        service: Number(this.$route.params.serviceId),
        generator: {
          type: this.genType,
          settings: settings
        },
        tests: [],
        name: this.stepName,
        variables: vars
      };

      if (this.step) {
        step.id = this.step.id;
        this.step.tests.forEach(test => {
          step.tests.push(test.id);
        });
      }

      return step;
    },
    cancel() {
      this.$emit("cancel-new-or-update-step");
    }
  }
};
</script>



<style scoped>
.label {
  padding-top: 0.375rem;
  /* padding-bottom: 0.375rem; */
}
</style>


