<template>
    <div>
        <b-row v-if="result.result === 'TestPending'">
          <b-col
            md="12"
            class="text-center">
            <div style="transform: scaleX(-1);">
              <i 
                class="oi oi-loop-circular"
                style="margin-right: 5px; font-size: 42px; animation-name: spin; animation-duration: 1s; animation-iteration-count: infinite; animation-timing-function: linear; animation-direction: reverse; margin-top: 25px; margin-bottom: 25px; color: rgb(129, 138, 145);"/>
            </div>
          </b-col>
        </b-row>
        <b-card 
          v-else-if="stepResults.length === 0"
          style="background-color: rgb(247, 247, 249); padding: 0.75rem; margin-bottom:.75rem;">
          <p class="text-center">
            <i 
              class="oi oi-shield"
              style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
          </p>
          <p class="text-center">
            No {{localType}} steps were run for this test.
          </p>
        </b-card>
        <b-row v-else-if="stepResults.length">
          <b-col md="12">
            <small>
              <strong class="text-muted">
                {{localType}} steps
              </strong>
            </small>
            <div
              v-for="(stepResult, index) in stepResults"
              :key="index">
              <div @click="showOrHiddenStepResultDetail(stepResult.id)">
                <span class="float-right text-muted">
                  <i 
                    :class="getClassObj(stepResult.id)"
                    style="margin-right: 5px; font-size: 10px; vertical-align: initial;"/>
                </span>
                <p
                  class="text-truncate"
                  style="cursor: pointer; padding-right: 20px;">
                  <span 
                    class="text-muted"
                    style="padding-right: 5px;">
                    <small>
                      <strong>{{index + 1}}</strong>
                      .
                    </small>
                  </span>
                  <strong v-if="getStep(stepResult.id)">{{getStep(stepResult.id).name}}</strong>
                  <span v-else>
                    <del v-b-tooltip.hover :title="deletedStepTitle">Deleted setup</del>
                  </span>
                  <small 
                    class="text-muted"
                    style="padding-left: 5px;">
                    {{getStepDesc(stepResult.type)}}
                  </small>
                </p>
              </div>
              <div 
                style="padding-left: 25px;">
                <component 
                  v-if="isShowStepResultDetail(stepResult.id)"
                  :is="getComponent(stepResult)"
                  :stepResult="stepResult"/>
              </div>
            </div>
          </b-col>
        </b-row>
    </div>
</template>



<script>
import { getGeneratorOption } from "@/utils/steps";
import RandomSetupResultDisplay from "@/components/test/results/child/nav/child/step/RandomSetupResultDisplay";
import HttpReqSetupResultDisplay from "@/components/test/results/child/nav/child/step/HttpReqSetupResultDisplay";
import HttpReqTeardownResultDisplay from "@/components/test/results/child/nav/child/step/HttpReqTeardownResultDisplay";

export default {
  name: "StepResultDisplay",
  props: {
    result: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    RandomSetupResultDisplay,
    HttpReqSetupResultDisplay,
    HttpReqTeardownResultDisplay
  },
  data() {
    return {
      resultDetailArray: []
    };
  },
  computed: {
    localType() {
      return this.type.toLowerCase();
    },
    stepResults() {
      return this.localType === "setup"
        ? this.result.setups
        : this.result.teardowns;
    },
    deletedStepTitle() {
      return "The " + this.localType + " was deleted after this result";
    }
  },
  methods: {
    showOrHiddenStepResultDetail(stepResultId) {
      const index = this.resultDetailArray.findIndex(element => {
        return element == stepResultId;
      });

      // 如果存在，说明已经打开了，则移开，表示不显示结果详情
      if (index != -1) {
        this.resultDetailArray.splice(index, 1);
      } else {
        this.resultDetailArray.push(stepResultId);
      }
    },
    isShowStepResultDetail(stepResultId) {
      const index = this.resultDetailArray.findIndex(element => {
        return element == stepResultId;
      });

      return index != -1;
    },
    getComponent(stepResult) {
      return stepResult.type + "Display";
    },
    getClassObj(stepResultId) {
      const index = this.resultDetailArray.findIndex(element => {
        return element == stepResultId;
      });

      return {
        oi: true,
        "oi-chevron-right": index == -1 ? true : false,
        "oi-chevron-bottom": index != -1 ? true : false
      };
    },
    getStep(stepId) {
      let step = null;

      if (this.localType === "setup") {
        const setups = this.$store.getters.getSetups(
          this.$route.params.serviceId
        );

        step = setups.find(setup => {
          return setup.id == stepId;
        });
      } else if (this.localType === "teardown") {
        const teardowns = this.$store.getters.getTeardowns(
          this.$route.params.serviceId
        );

        step = teardowns.find(teardown => {
          return teardown.id == stepId;
        });
      }

      return step ? step : null;
    },
    getStepDesc(stepResultType) {
      const type = stepResultType.replace("Result", "Generator");

      return getGeneratorOption(type).text;
    }
  }
};
</script>

<style scope>
</style>
