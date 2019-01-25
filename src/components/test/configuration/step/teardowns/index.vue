<template>
  <div>
    <b-card-body v-if="createTeardown">
      <div>
        <step-form
          :title="formTitle"
          :stepTypeLabel="stepTypeLabel"
          :stepNameLabel="stepNameLabel"
          :options="options"
          :defaultGen="defaultGen"
          stepType="teardown"
          v-on:cancel-new-or-update-step="cancelNewOrUpdateSetup"/>
      </div>
    </b-card-body>
    <b-list-group 
      tag="ul"
      v-else-if="teardowns.length"
      flush>
      <div v-if="teardownSteps.length">
        <draggable 
          @start="onStart"
          @end="onEnd"
          v-model="teardownSteps">
          <transition-group>
            <b-list-group-item 
              tag="li"
              v-for="(teardownStep, index) in teardownSteps"
              :key="teardownStep.id">
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
                  :step="getTeardown(teardownStep.id)"
                  stepType="teardown"
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

      <b-list-group-item v-if="unenableTeardowns.length">
        <small class="text-muted">
          <strong>Enable 
            <span v-if="teardownSteps.length && unenableTeardowns.length">another</span>
            <span v-else>a</span>
            teardown step for this test
          </strong>
        </small>
      </b-list-group-item>

      <b-list-group-item 
        v-for="teardown in unenableTeardowns"
        :key="teardown.id">
        <step-display 
          :step="teardown"
          stepType="teardown"
          :title="formTitle"
          :stepTypeLabel="stepTypeLabel"
          :stepNameLabel="stepNameLabel"
          :options="options"/>
      </b-list-group-item>

      <b-list-group-item>
        <b-btn 
          variant="primary"
          size="sm"
          @click="createTeardown=true">
          Create a new teardown step
        </b-btn>
      </b-list-group-item>
    </b-list-group>
    <step-prompt 
      v-else
      v-on:create-step="createTeardown = $event"
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

import { TEARDOWNGENOPTIONS } from "@/constant/steps";
import { clone } from "@/config/utils";

export default {
  name: "Teardowns",
  components: {
    draggable,
    StepForm,
    StepDisplay,
    StepPrompt
  },
  data() {
    return {
      createTeardown: false,
      promptText:
        "Teardown steps run after the test has completed, and can be used to clean up data from the test.",
      btnText: "Add a teardown step",
      formTitle: "New teardown step",
      stepTypeLabel: "Teardown step type",
      stepNameLabel: "Teardown step name",
      options: TEARDOWNGENOPTIONS,
      defaultGen: "HttpReqTeardownGenerator"
    };
  },
  computed: {
    teardowns() {
      return this.$store.getters.getTeardowns(this.$route.params.serviceId);
    },
    teardownSteps: {
      get() {
        return this.$store.state.steps.teardowns;
      },
      set(value) {
        this.updateSteps(value);
      }
    },
    unenableTeardowns() {
      return this.teardowns.filter(element1 => {
        return this.teardownSteps.find(element2 => element1.id === element2.id)
          ? false
          : true;
      });
    }
  },
  methods: {
    ...mapActions(["updateThisSteps"]),
    updateSteps(data) {
      const steps = clone(this.$store.state.steps);
      steps.teardowns = data.map((step, index) => {
        step.step_number = index;
        return step;
      });

      this.updateThisSteps(steps);
    },
    getTeardown(teardownId) {
      return this.teardowns.find(teardown => teardown.id === teardownId);
    },
    onStart(event) {
      event.item.style.opacity = 0.1;
    },
    onEnd(event) {
      event.item.style.opacity = 1;
    },
    cancelNewOrUpdateSetup() {
      this.createTeardown = false;
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

