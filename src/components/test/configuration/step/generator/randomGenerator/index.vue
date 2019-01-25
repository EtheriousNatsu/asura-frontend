<template>
  <div>
    <h6>
      <strong>Variable capture</strong>
    </h6>
    <b-row>
      <b-col
        md="12"
        style="margin-bottom: 10px;">
        <div
          v-for="(variable, index) in variables"
          :key="variable.uniqueKey">
          <b-row>
            <b-col 
              md="2"
              style="text-align: center;">
              <label 
                for="form" 
                class="label">
                Type
              </label>
            </b-col>
            <b-col 
              md="5"
              style="padding-left:10px;">
              <label 
                for="name" 
                class="label">
                Name
              </label>
            </b-col>
          </b-row>
          <b-form-group
            :state="errors.has('name' + index) ? false : null"
            :invalid-feedback="errors.first('name' + index)">
            <b-input-group>
              <b-dropdown
                variant="outline-secondary"
                slot="prepend"
                :text="getText(variable)">
                <b-dropdown-item
                  @click="variable.type = option.type"
                  v-for="(option, index) in randomGeneratorOptions"
                  :key="index">
                  {{option.text}}
                </b-dropdown-item>
              </b-dropdown>
              <b-form-input
                :name="'name' + index"
                v-validate="'required'"
                data-vv-as="name"
                data-vv-validate-on="input"
                :state="errors.has('name' + index) ? false : null"
                v-model="variable.name"
                id="name"
                placeholder="variableName">
              </b-form-input>
              <b-btn
                @click="deleteVar(index)"
                slot="append"
                variant="outline-secondary">
                ×
              </b-btn>
            </b-input-group>
          </b-form-group>

        </div>
      </b-col>
      <b-col md="12">
        <b-btn
          @click="addVar"
          size="sm"
          variant="outline-secondary">
          Capture
          <span v-if="variables.length">another</span>
          <span v-else>a</span>
          variable
        </b-btn>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col md="6">
        <b-btn
          @click="cancel"
          variant="outline-secondary">
          Cancel
        </b-btn>
      </b-col>
      <b-col
        class="text-md-right"
        md="6">
        <b-btn
          @click="save"
          variant="success">
          Save
        </b-btn>
      </b-col>
    </b-row>
  </div>    
</template>



<script>
import { clone } from "@/config/utils";
import { RANDOMGENERATOROPTIONS } from "@/constant/steps";

let id = 0;

export default {
  name: "RandomGenerator",
  props: {
    step: {
      type: Object
    }
  },
  data() {
    return {
      variables: []
    };
  },
  computed: {
    randomGeneratorOptions() {
      return RANDOMGENERATOROPTIONS;
    }
  },
  mounted() {
    this.preload();
  },
  methods: {
    cancel() {
      this.$emit("cancel-new-or-update-step");
    },
    save() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.$emit("save", this.variables);
        }
      });
    },
    getText(variable) {
      return this.randomGeneratorOptions.find(
        option => option.type === variable.type
      ).text;
    },
    addVar() {
      this.variables.push({ name: "", type: "TextVar", uniqueKey: id++ });
    },
    deleteVar(index) {
      this.variables.splice(index, 1);
    },
    preload() {
      if (this.step) {
        this.variables = this.variables.concat(
          clone(this.step.variables).map(variable => {
            this.$set(variable, "uniqueKey", id++);
            return variable;
          })
        );
      }
    }
  }
};
</script>



<style scoped>
</style>


