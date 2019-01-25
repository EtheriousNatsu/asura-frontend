<template>
    <b-row>
        <b-col 
            md="12"
            style="padding-top: 10px; padding-bottom: 15px;">
            <div>
                <div>
                    <small>{{label}}</small>
                </div>
                <b-progress 
                    v-on:click.native="showAssertionsDetail = !showAssertionsDetail"
                    :max=max
                    style="cursor: pointer;">
                        <b-progress-bar 
                            variant="warning"
                            :value="warnValue"
                            animated/>
                        <b-progress-bar 
                            variant="danger"
                            :value="dangerValue"/>
                        <b-progress-bar 
                            variant="success"
                            :value="successValue"/>
                </b-progress>
            </div>
            <span v-if="showAssertionsDetail">
              <br>
              <div v-if="isResultPending">
                <div 
                  v-for="(assertion, index) in pendingAssertions" 
                  :key="index">
                  <user-assertion-result-display 
                    :assertion="assertion"
                    badgeVariant="warning"
                    badgeLabel="PENDING"
                    :isAssertionFail="false"/>
                </div>
              </div>
              <div v-else>
                <div
                  v-for="(assertion, index) in failedAssertions" 
                  :key="index + 'failed'">
                  <component 
                    :is="getAssertionDisplayComponent(assertion)" 
                    :assertion="assertion"
                    badgeVariant="danger"
                    badgeLabel="FAIL"
                    :isAssertionFail="true" />
                </div>
                <div
                    v-for="(assertion, index) in passedAssertions"
                    :key="index + 'passed'">
                  <component 
                    :is="getAssertionDisplayComponent(assertion)" 
                    :assertion="assertion"
                    badgeVariant="success"
                    badgeLabel="PASS"
                    :isAssertionFail="false" />
                </div>
              </div>
            </span>
        </b-col>
    </b-row>
</template>




<script>
import UserAssertionResultDisplay from "@/components/test/results/child/progress/child/UserAssertionResultDisplay";
import BuiltAssertionResultDisplay from "@/components/test/results/child/progress/child/BuiltAssertionResultDisplay";
import { ASSERTIONSOPTIONS } from "@/constant/assertions";

export default {
  name: "ResultProgress",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  components: {
    UserAssertionResultDisplay,
    BuiltAssertionResultDisplay
  },
  data() {
    return {
      showAssertionsDetail: true
    };
  },
  computed: {
    isResultPending() {
      return this.result.result === "TestPending";
    },
    isResultFail() {
      return this.result.result === "TestFail";
    },
    isResultPass() {
      return this.result.result === "TestPass";
    },
    label() {
      if (this.isResultPending) {
        return "Running assertions";
      } else if (this.isResultFail) {
        return `${this.result.assertions.failed.length} failed assertions`;
      } else if (this.isResultPass) {
        return `${this.result.assertions.passed.length} total assertion`;
      }
    },
    max() {
      if (this.isResultPending) {
        return this.warnValue;
      }

      const failedCount = this.result.assertions.failed.length;
      const passedCount = this.result.assertions.passed.length;
      return failedCount + passedCount;
    },
    warnValue() {
      return this.isResultPending ? 100 : 0;
    },
    successValue() {
      return this.isResultPending ? 0 : this.result.assertions.passed.length;
    },
    dangerValue() {
      return this.isResultPending ? 0 : this.result.assertions.failed.length;
    },
    pendingAssertions() {
      const assertions = this.$store.getters.getAssertions(
        this.$route.params.testId
      );
      return assertions;
    },
    failedAssertions() {
      return this.result.assertions.failed;
    },
    passedAssertions() {
      return this.result.assertions.passed;
    }
  },
  methods: {
    getAssertionDesc(assertion) {
      return ASSERTIONSOPTIONS.find(
        option => option.source === assertion.source
      ).label;
    },
    getAssertionDisplayComponent(assertion) {
      const type = ASSERTIONSOPTIONS.find(
        option => option.source === assertion.source
      ).type;

      return type === "user"
        ? "UserAssertionResultDisplay"
        : "BuiltAssertionResultDisplay";
    }
  }
};
</script>



<style scope>
</style>

