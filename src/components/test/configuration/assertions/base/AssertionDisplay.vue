<template>
    <div>
        <assertion-form 
            v-if="showAssertionForm"
            :assertion="assertion"
            v-on:cancel-create-or-update-assertion="showAssertionForm = false"/>
        <b-row v-else>
            <b-col md="6">
                <i 
                    class="oi oi-media-stop"
                    :style="styleObj"/>
                <strong>{{getAssertionDesc(assertion)}}</strong>
            </b-col>
            <b-col md="6">
                <small class="float-right">
                    <i 
                        @click="showAssertionForm = true"
                        v-b-tooltip.hover title="Edit Assertion"
                        class="oi oi-pencil"
                        style="margin-right: 5px; font-size: 12px; cursor: pointer;"/>
                    <b-link class="text-dark">
                        <i 
                            @click="deleteAssertion"
                            v-b-tooltip.hover title="Delete Assertion"
                            class="oi oi-trash"
                            style="margin-right: 5px; font-size: 12px;"/>
                    </b-link>
                </small>
            </b-col>
            <b-col md="12">
                <component 
                    :is="getComponent"
                    :assertion="assertion"/>
            </b-col>
        </b-row>
    </div>
</template>



<script>
import { mapActions } from "vuex";

import { ASSERTIONSOPTIONS } from "@/constant/assertions";
import AssertionForm from "../base/AssertionForm";
import StatusCodeAssertionDisplay from "../types/statusCodeAssertion/StatusCodeAssertionDisplay";
import JsonDataAssertionDisplay from "../types/jsonDataAssertion/JsonDataAssertionDisplay";

export default {
  name: "AssertionDisplay",
  components: {
    AssertionForm,
    StatusCodeAssertionDisplay,
    JsonDataAssertionDisplay
  },
  props: {
    assertion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAssertionForm: false
    };
  },
  computed: {
    getComponent() {
      return this.getAssertionOption(this.assertion).component + "Display";
    },
    testLastedResult() {
      const results = this.$store.getters.getResults(
        this.assertion.test,
        this.$store.state.env
      );

      return results.length ? results[0] : null;
    },
    styleObj() {
      // 未运行
      let color = "#6c757d";

      if (this.testLastedResult) {
        if (this.testLastedResult.result == "TestPending") {
          // 运行中
          color = "rgb(240, 173, 78)";
        } else if (
          this.testLastedResult.assertions.failed.find(
            element => element.id == this.assertion.id
          )
        ) {
          // 失败
          color = "rgb(217, 83, 79)";
        } else if (
          this.testLastedResult.assertions.passed.find(
            element => element.id == this.assertion.id
          )
        ) {
          // 成功
          color = "rgb(92, 184, 92)";
        }
      }

      return {
        marginRight: "5px",
        fontSize: "12px",
        color: color
      };
    }
  },
  methods: {
    ...mapActions(["deleteThisAssertion"]),
    deleteAssertion() {
      this.deleteThisAssertion(this.assertion.id);
    },
    getAssertionOption(assertion) {
      return ASSERTIONSOPTIONS.find(
        option => option.source === assertion.source
      );
    },
    getAssertionDesc(assertion) {
      return this.getAssertionOption(assertion).label;
    },
    // 供子组件使用
    getComparatorDesc(options) {
      return options
        .find(option => option.value === this.assertion.comparator)
        .text.toLowerCase();
    }
  }
};
</script>


<style scoped>
</style>

