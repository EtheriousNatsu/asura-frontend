<template>
  <b-row>
    <b-col md="6">
      <small>Comparison</small>
      <b-form-group>
        <b-form-select 
          v-model="comparison"
          :options="options"/>
      </b-form-group>
    </b-col>
    <b-col md="6">
      <small>Target value</small>
      <base-auto-suggest 
        rules="required"
        name="target"
        alias="target"
        scope="statusCodeAssertion"
        :initialValue="target"
        v-on:input="target = $event"/>
    </b-col>
  </b-row>
</template>



<script>
import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";

import { STATUSCODECOMPARISONOPTIONS } from "@/constant/assertions";

export default {
  name: "StatusCodeAssertion",
  props: {
    assertion: {
      type: Object
    }
  },
  inject: ["$validator"], // inject parent validator
  components: {
    BaseAutoSuggest
  },
  data() {
    return {
      selectedComparison: null,
      defaultComparison: "AssertEquals",
      inputedTarget: null,
      defaultTarget: "200",
      options: STATUSCODECOMPARISONOPTIONS
    };
  },
  computed: {
    comparison: {
      get() {
        if (this.selectedComparison) {
          return this.selectedComparison;
        } else if (this.assertion) {
          return this.assertion.comparator;
        }
        return this.defaultComparison;
      },
      set(comparison) {
        this.selectedComparison = comparison;
      }
    },
    target: {
      get() {
        if (this.assertion) {
          return this.assertion.target;
        }
        return this.defaultTarget;
      },
      set(target) {
        this.inputedTarget = target;
      }
    },
    dataPacket() {
      return {
        comparator: this.comparison,
        target: this.inputedTarget
      };
    }
  }
};
</script>


<style scoped>
</style>

