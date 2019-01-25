<template>
  <div>
    <slot></slot>
    <b-row>
      <b-col md="12">
        <small>Assertion type</small>
        <br>
        <div style="width:300px;">
          <v-select 
            placeholder="Assertion type"
            :options="options"
            v-model="assertionObject" />
        </div>
        <br>
      </b-col>
      <b-col md="12">
        <component 
          :ref="assertionRef"
          v-if="assertionObject"
          :is="assertionObject.component"
          :assertion="assertion"/>
        <br>
        <b-btn
          @click="cancel"
          class="float-left"
          variant="outline-secondary">
          Cancel
        </b-btn>
        <span 
          v-show="assertionObject"
          class="float-right">
          <b-btn
            variant="primary"
            @click="save">
            <span>Save assertion</span>
          </b-btn>
        </span>
      </b-col>
    </b-row>
  </div>
</template>



<script>
import { mapActions } from "vuex";

import { ASSERTIONSOPTIONS } from "@/constant/assertions";
import StatusCodeAssertion from "../types/statusCodeAssertion";
import JsonDataAssertion from "../types/jsonDataAssertion";

export default {
  name: "AssertionForm",
  props: {
    assertion: {
      type: Object
    }
  },
  components: {
    StatusCodeAssertion,
    JsonDataAssertion
  },
  data() {
    return {
      selectedAssertion: null
    };
  },
  computed: {
    options() {
      return ASSERTIONSOPTIONS.filter(option => {
        return option.type === "user";
      });
    },
    assertionObject: {
      // 返回Object
      get() {
        if (this.selectedAssertion) {
          return this.selectedAssertion;
        } else if (this.assertion) {
          return ASSERTIONSOPTIONS.find(
            option => option.source === this.assertion.source
          );
        }
        return null;
      },
      set(assertion) {
        this.selectedAssertion = assertion;
      }
    },
    assertionRef() {
      return this.assertionObject.source;
    }
  },
  methods: {
    ...mapActions(["createThisAssertion", "updateThisAssertion"]),
    cancel() {
      this.$emit("cancel-create-or-update-assertion");
    },
    save() {
      this.$validator.validate().then(res => {
        if (res) {
          const data = this.buildData();
          if (this.assertion) {
            this.updateAssertion(data);
          } else {
            this.createAssertion(data);
          }
        }
      });
    },
    createAssertion(data) {
      this.createThisAssertion(data).then(res => {
        this.cancel();
      });
    },
    updateAssertion(data) {
      this.updateThisAssertion(data).then(res => {
        this.cancel();
      });
    },
    buildData() {
      const o1 = {
        source: this.assertionObject.source,
        test: Number(this.$route.params.testId)
      };
      const o2 = this.$refs[this.assertionRef].dataPacket;

      const data = Object.assign({}, o1, o2);
      if (this.assertion) {
        data.id = this.assertion.id;
      }

      return data;
    }
  }
};
</script>


<style>
.v-select.dropdown .dropdown-toggle::after {
  display: none;
}
</style>

