<template>
    <b-row>
      <b-col md="4">
        <small>JSON Path selector</small>
        <base-auto-suggest 
          rules="required"
          name="property"
          alias="property"
          scope="jsonDataAssertion"
          :initialValue="property"
          v-on:input="property = $event"/>
      </b-col>
      <b-col 
        md="4"
        style="padding-left: 0px; padding-right: 0px;">
        <small>Comparison</small>
        <b-form-group>
          <b-form-select 
            :options="options"
            v-model="comparison"/>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <small>Target value</small>
        <base-auto-suggest 
          rules="required"
          name="target"
          alias="target"
          scope="jsonDataAssertion"
          :initialValue="target"
          v-on:input="target = $event"/>
      </b-col>
      <b-col md="12">
        <small class="text-dark">
          Use the
          <i>JSON Path selector</i>
           field to select a value out of a JSON object. For example to assert that a JSON response of:
           <code>{ foo: "bar", things: [1, 2] }</code>
            contains the correct value for
            <code>foo</code>
            , you would use the 
            <i>JSON Path selector</i>
            :
            <code>.foo</code>
             and set the 
             <i>Target value</i>
              as "bar".
        </small>
      </b-col>
    </b-row>
</template>



<script>
import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";

import { JSONDATACOMPARISONOPTIONS } from "@/constant/assertions";

export default {
  name: "JsonDataAssertion",
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
      selectedComparison: "",
      defaultComparison: "AssertEquals",
      inputedProperty: "",
      inputedTarget: "",
      options: JSONDATACOMPARISONOPTIONS
    };
  },
  computed: {
    property: {
      get() {
        if (this.assertion) {
          return this.assertion.property;
        }
        return "";
      },
      set(property) {
        this.inputedProperty = property;
      }
    },
    target: {
      get() {
        if (this.assertion) {
          return this.assertion.target;
        }
        return "";
      },
      set(target) {
        this.inputedTarget = target;
      }
    },
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
    dataPacket() {
      return {
        comparator: this.comparison,
        property: this.inputedProperty,
        target: this.inputedTarget
      };
    }
  }
};
</script>


<style scoped>
</style>

