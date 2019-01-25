<template>
  <div>
    <b-card-body v-if="newSetup">
      <div>
        <step-form
          :title="formTitle"
          :stepTypeLabel="stepTypeLabel"
          :stepNameLabel="stepNameLabel"
          :options="options"
          :defaultGen="defaultGen"
          stepType="setup"
          v-on:cancel-new-or-update-step="cancelNewOrUpdateSetup"/>
      </div>
    </b-card-body>
    <b-list-group 
      tag="ul"
      v-else-if="setups.length"
      flush>
      <div v-if="setupSteps.length">
        <draggable 
          @start="onStart"
          @end="onEnd"
          v-model="setupSteps">
          <transition-group>
            <b-list-group-item 
              tag="li"
              v-for="(setupStep, index) in setupSteps"
              :key="setupStep.id">
              <div class="drag">
                <i 
                  class="oi oi-grid-four-up"
                  style="margin-right: 0px; font-size: 12px; cursor: move;"/>
                  <small class="text-muted">
                    <span style="position: absolute; bottom: 5px; left: 8px;">{{ index + 1 }}</span>
                  </small>
              </div>
              <div style="padding-left: 25px;">
                <step-display 
                  :step="getSetup(setupStep.id)"
                  stepType="setup"
                  :title="formTitle"
                  :stepTypeLabel="stepTypeLabel"
                  :stepNameLabel="stepNameLabel"
                  :options="options"
                  :initialChecked="true"/>
              </div>
            </b-list-group-item>
          </transition-group>
        </draggable>
      </div>

      <b-list-group-item v-if="unenableSetups.length">
        <small class="text-muted">
          <strong>Enable 
            <span v-if="setupSteps.length && unenableSetups.length">another</span>
            <span v-else>a</span>
            setup step for this test
          </strong>
        </small>
      </b-list-group-item>

      <b-list-group-item 
        v-for="setup in unenableSetups"
        :key="setup.id">
        <step-display 
          :step="setup"
          stepType="setup"
          :title="formTitle"
          :stepTypeLabel="stepTypeLabel"
          :stepNameLabel="stepNameLabel"
          :options="options"/>
      </b-list-group-item>

      <b-list-group-item>
        <b-btn 
          variant="primary"
          size="sm"
          @click="newSetup=true">
          Create a new setup step
        </b-btn>
      </b-list-group-item>
    </b-list-group>
    <step-prompt 
      v-else
      v-on:create-step="newSetup = $event"
      :promptText="promptText"
      :btnText="btnText" />
  </div>
</template>



<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";

import StepForm from "../base/StepForm";
import StepDisplay from "../base/StepDisplay";
import StepPrompt from "../base/StepPrompt";

import { SETUPGENERATOROPTIONS } from "@/constant/steps";
import { clone } from "@/config/utils";

export default {
  name: "Setups",
  components: {
    draggable,
    StepForm,
    StepDisplay,
    StepPrompt
  },
  data() {
    return {
      newSetup: false,
      promptText:
        "Setup steps are run before the test. Create variables from HTTP requests or random data to use in the test.",
      btnText: "Add a setup step",
      formTitle: "New setup step",
      stepTypeLabel: "Setup step type",
      stepNameLabel: "Setup step name",
      options: SETUPGENERATOROPTIONS,
      defaultGen: "RandomSetupGenerator"
    };
  },
  computed: {
    setups() {
      return this.$store.getters.getSetups(this.$route.params.serviceId);
    },
    setupSteps: {
      get() {
        return this.$store.state.steps.setups;
      },
      set(value) {
        this.updateSteps(value);
      }
    },
    unenableSetups() {
      return this.setups.filter(element1 => {
        return this.setupSteps.find(element2 => element1.id === element2.id)
          ? false
          : true;
      });
    }
  },
  methods: {
    ...mapActions(["updateThisSteps"]),
    updateSteps(data) {
      const steps = clone(this.$store.state.steps);
      steps.setups = data.map((step, index) => {
        step.step_number = index;
        return step;
      });

      this.updateThisSteps(steps);
    },
    getSetup(setupId) {
      return this.setups.find(setup => setup.id === setupId);
    },
    onStart(event) {
      event.item.style.opacity = 0.1;
    },
    onEnd(event) {
      event.item.style.opacity = 1;
    },
    cancelNewOrUpdateSetup() {
      this.newSetup = false;
    }
  }
};
</script>



<style scoped>
.drag {
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 25px;
  background-color: rgb(236, 238, 239);
  height: 100%;
  text-align: center;
}
</style>

