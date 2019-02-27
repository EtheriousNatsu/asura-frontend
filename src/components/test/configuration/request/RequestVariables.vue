<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">
            Variables
        </b-card-header>
        <div>
            <b-list-group flush>
                <b-list-group-item
                    v-for="(item, index) in existedVars" 
                    :key="index">
                    <b-form 
                        data-vv-scope="updateForm"
                        @submit.prevent="updateTestByUpdateVars"
                        v-if="editingVars.includes(index)">
                        <b-form-group
                            :invalid-feedback="errors.first('updateForm.variableKey' + index)"
                            :state="!errors.has('updateForm.variableKey' + index)">
                            <b-input 
                                class="mr-md-2"
                                :name="'variableKey' + index"
                                data-vv-validate-on="input"
                                v-validate="'required'"
                                data-vv-as="variable key"
                                v-model="item.key"
                                :state="!errors.has('updateForm.variableKey' + index)"/>                            
                        </b-form-group>
                        <b-form-group>
                            <b-input 
                                name="value"
                                v-model="item.value"/>
                        </b-form-group>
                        <b-btn 
                            class="mr-md-2"
                            type="submit"
                            variant="primary">
                            Save Variable
                        </b-btn>
                        <b-link
                            @click="deleteEditingVariable(index)">
                            Cancel
                        </b-link>
                    </b-form>
                    <div v-else>
                        <span>
                            <code>
                                <span>${</span>{{item.key | truncate}}<span>}</span>
                            </code>
                        </span>
                        <i 
                            class="oi oi-arrow-right edit-icon"
                            style="cursor:none;" />    
                        <code>{{ item.value | truncate}}</code> 
                        <small class="float-right">
                            <i 
                                class="oi oi-pencil edit-icon"
                                v-b-tooltip.hover title="Edit variable"
                                @click="addEditingVariable(index)"/>
                            <b-link
                                class="text-dark">
                                <i 
                                    @click="updateTestByDeleteVar(index)"
                                    v-b-tooltip.hover title="Delete Variable"
                                    class="oi oi-trash" />
                            </b-link>
                        </small> 
                    </div>
          
                </b-list-group-item>
            </b-list-group>
            <b-card-body>
                <b-form 
                    @submit.prevent="updateTestByAddVars"
                    data-vv-scope="addForm">
                    <b-row>
                        <b-col md="12">
                            <b-row
                                v-for="(variable, index) in variables"
                                :key="variable.uniqueKey">
                                <b-col md="5">
                                    <b-form-group
                                        label="Variable"
                                        :invalid-feedback="errors.first('addForm.variableKey' + index)"
                                        :state="errors.has('addForm.variableKey' + index) ? false : null">
                                        <b-form-input
                                            :name="'variableKey' + index"
                                            v-model.trim="variable.key"
                                            data-vv-as="variable key"
                                            v-validate="'required'"
                                            data-vv-validate-on="input"
                                            :state="errors.has('addForm.variableKey' + index) ? false : null" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="5">
                                    <b-form-group label="Value">
                                        <b-form-input v-model.trim="variable.value" />
                                    </b-form-group>
                                </b-col>
                                <b-col 
                                    md="2"
                                    style="padding-top: 15px;">
                                    <br>
                                    <b-link 
                                        @click="deleteVariable(index)"
                                        style="color: #373a3c;">
                                        <i 
                                            class="oi oi-trash"
                                            style="margin-right: 5px; font-size: 12px;"></i>
                                    </b-link>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col md="12">
                            <p>
                                <small>
                                    <b-link @click="addVariable">
                                        Add variable
                                    </b-link>
                                </small>
                            </p>

                        </b-col>
                    </b-row>
                    <b-row v-show="variables.length">
                        <b-col md="10">
                            <b-btn
                                class="float-left"
                                @click="cancelAddVariables"
                                variant="outline-secondary">Cancel</b-btn>
                            <b-btn
                                type="submit"
                                class="float-right"
                                variant="primary">
                                <span>
                                    Add Variables
                                    <i 
                                        class="oi oi-check"
                                        style="margin-right: 5px; font-size: 12px;"></i>
                                </span>

                            </b-btn>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card-body>
            <div 
                v-for="(setup, index) in setups"
                :key="index">
                <b-container v-if="setup.variables.length">
                    <p style="margin-left: 5px;">
                        <small class="text-muted">
                            Variables from
                            <strong> {{ setup.name }}</strong>
                            setup step
                        </small>
                        <small class="float-right">
                            <b-link @click="$emit('switch-to-setup')">
                                <i 
                                    class="oi oi-pencil"
                                    style="margin-right: 5px; font-size: 12px; color: rgb(55, 58, 60);"/>
                            </b-link>
                        </small>
                    </p>
                </b-container>
                <b-list-group flush>
                    <b-list-group-item
                        v-for="(variable,index) in getSetupVars(setup)"
                        :key="index">
                        <component 
                            :ref="'setup' + setup.id + index"
                            :is="getGenVariableComponent(setup)"
                            :variable="variable"
                            :styleObject="getSetupVariableStyleObject(variable)">
                        </component>
                        <b-tooltip 
                            v-if="variable.overwrite"
                            :target="() => $refs['setup' + setup.id + index][0]">
                            This variable is overridden by a test variable
                        </b-tooltip>
                    </b-list-group-item>
                </b-list-group>

            </div>
            <div v-if="currentEnvVars.length > 0">
                <b-container>
                    <p style="margin-left: 5px;">
                        <small class="text-muted">
                            Variables from 
                            <strong> {{ currentEnv }} environment</strong>
                        </small>
                        <small class="float-right">
                            <b-link :to="{name: 'settings', params: {serviceId: $route.params.serviceId}}">
                                <i 
                                    class="oi oi-pencil"
                                    style="margin-right: 5px; font-size: 12px; color: rgb(55, 58, 60);"/>
                            </b-link>
                        </small>
                    </p>
                </b-container>
                <b-list-group flush>
                    <b-list-group-item 
                        v-for="(variable, index) in currentEnvVars" 
                        :key="index">
                        <span 
                            :style="getEnvVariableStyleObject(variable)"
                            :id="'variable' + index">
                            <code>
                                <span>${</span>{{variable.key}}<span>}</span>
                            </code>
                            <i 
                                class="oi oi-arrow-right"
                                style="margin-right: 5px; font-size: 12px;"/>
                            <code> {{variable.value | truncate}} </code>
                        </span>
                        <b-tooltip
                            v-if="variable.overwrite"
                            :target="'variable' + index">
                            This variable is overridden by a {{variable.overwriteBy}} variable
                        </b-tooltip>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>



<script>
import { mapActions } from "vuex";

import HttpReqGeneratorVariable from "../step/generator/httpReqGenerator/HttpReqGeneratorVariable";
import RandomGeneratorVariable from "../step/generator/randomGenerator/RandomGeneratorVariable";

import { getGeneratorOption } from "@/utils/steps";
import { isOverwrite } from "@/utils/variables";
import { clone } from "@/config/utils";

let id = 0;

export default {
  name: "RequestVariables",
  components: {
    HttpReqGeneratorVariable,
    RandomGeneratorVariable
  },
  data() {
    return {
      variables: [],
      editingVars: []
    };
  },
  computed: {
    existedVars() {
      return clone(this.test.variables);
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    },
    setups() {
      if (this.$store.state.steps) {
        return this.$store.state.steps.setups.map(setupStep => {
          return this.$store.getters
            .getSetups(this.$route.params.serviceId)
            .find(setup => {
              return setup.id === setupStep.id;
            });
        });
      }

      return [];
    },
    setupsVars() {
      const variables = [];

      this.setups.forEach(setup => {
        setup.variables.forEach(variable => {
          variables.push(variable);
        });
      });

      return variables;
    },
    currentEnv() {
      return this.$store.state.env === "All"
        ? "production"
        : this.$store.state.env;
    },
    currentEnvVars() {
      const variables = [];
      this.$store.getters
        .getEnvironment(this.currentEnv, this.$route.params.serviceId)
        .variables.forEach(variable1 => {
          const variable2 = clone(variable1);

          if (isOverwrite(this.test.variables, variable2)) {
            variable2.overwrite = true;
            variable2.overwriteBy = "test";
          } else if (
            isOverwrite(this.setupsVars, variable2, "name", undefined)
          ) {
            variable2.overwrite = true;
            variable2.overwriteBy = "setup";
          }

          variables.push(variable2);
        });

      return variables;
    }
  },
  methods: {
    ...mapActions(["updateThisTest"]),
    updateTestByAddVars() {
      this.$validator.validateAll("addForm").then(res => {
        if (res) {
          const test = clone(this.test);
          const newVariables = clone(this.variables).map(variable => {
            this.$delete(variable, "uniqueKey");
            return variable;
          });
          test.variables = test.variables.concat(newVariables);

          this.updateThisTest(test).then(res => {
            this.cancelAddVariables();
          });
        }
      });
    },
    updateTestByDeleteVar(index) {
      const test = clone(this.test);
      test.variables.splice(index, 1);
      this.updateThisTest(test);
    },
    updateTestByUpdateVars(index) {
      this.$validator.validateAll("updateForm").then(res => {
        if (res) {
          const test = clone(this.test);
          test.variables = this.existedVars;
          this.updateThisTest(test).then(res => {
            this.deleteEditingVariable(index);
          });
        }
      });
    },
    addVariable() {
      this.variables.push({ key: "", value: "", uniqueKey: id++ });
    },
    deleteVariable(index) {
      this.variables.splice(index, 1);
    },
    cancelAddVariables() {
      this.variables.splice(0);
    },
    addEditingVariable(varIndex) {
      this.editingVars.push(varIndex);
    },
    deleteEditingVariable(varIndex) {
      const index = this.editingVars.findIndex(element => element === varIndex);
      this.editingVars.splice(index, 1);

      for (let attr in this.test.variables[varIndex]) {
        if (this.existedVars[varIndex].hasOwnProperty(attr))
          this.existedVars[varIndex][attr] = this.test.variables[varIndex][
            attr
          ];
      }
    },
    getGenVariableComponent(setup) {
      return getGeneratorOption(setup.generator.type).type + "Variable";
    },
    getSetupVars(setup) {
      const variables = [];

      setup.variables.forEach(variable1 => {
        const variable2 = clone(variable1);

        variable2.overwrite = isOverwrite(
          this.test.variables,
          variable2,
          undefined,
          "name"
        );
        variables.push(variable2);
      });

      return variables;
    },
    getSetupVariableStyleObject(variable) {
      return {
        display: "inline-block",
        textDecoration: variable.overwrite ? "line-through" : "none"
      };
    },
    getEnvVariableStyleObject(variable) {
      return {
        textDecoration: variable.overwrite ? "line-through" : "none"
      };
    }
  }
};
</script>



<style scoped>
</style>


