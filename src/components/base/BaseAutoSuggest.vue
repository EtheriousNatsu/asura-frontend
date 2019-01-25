<template>
  <div class="my-auto-suggest-container">
    <vue-autosuggest
      ref="myAutoSuggestRef"
      v-validate.disabled="rules"
      :data-vv-name="name"
      :data-vv-as="alias"
      data-vv-validate-on="input"
      :data-vv-scope="scope"
      :suggestions="filteredSuggestions"
      :getSuggestionValue="getSuggestionValue"
      :inputProps="inputProps">
      <template slot="header">
          <b-card-header>
              Variables
          </b-card-header>
      </template>
      <template slot-scope="{suggestion}">
        <div>
          <div style="margin-bottom: 10px;">
            <var> {{ suggestion.item.key }} </var>
            <b-badge
              class="float-right"
              variant="danger"
              v-show="suggestion.item.overwrite">
              OVERRIDDEN
            </b-badge>
          </div>
          <dl class="row">
            <dt class="col-md-3 flex-wrap">
              <small class="text-muted">Def:</small>
            </dt>
            <dd 
              class="col-md-9 text-truncate"
              style="padding-left: 0px;">
              <small>
                <span>
                  {{ suggestion.item.fromType }}
                  (
                  <i>{{ suggestion.item.fromName }}</i>
                  )
                </span>
              </small>
            </dd>
            <dt class="col-md-3 flex-wrap">
              <small class="text-muted">Val:</small>
            </dt>
            <dd 
              class="col-md-9"
              style="padding-left: 0px;">
              <small>
                <code> {{ suggestion.item.value }} </code>
              </small>
            </dd>
          </dl>
        </div>
      </template>
    </vue-autosuggest>
    <p v-if="errors.first(scope + '.' + name) && showErrors">
      <span style="color: red;">
        {{errors.first(scope + '.' +name)}}
      </span>
    </p>
  </div>
</template>




<script>
import { VueAutosuggest } from "vue-autosuggest";

import { RANDOMSETUPGEN, HTTPREQSETUPGEN } from "@/constant/steps";
import { isOverwrite } from "@/utils/variables";
import { getGenVariableDesc } from "@/utils/steps";
import { clone } from "@/config/utils";

export default {
  name: "BaseAutoSuggest",
  components: {
    VueAutosuggest
  },
  inject: ["$validator"], // inject parent validator
  props: {
    showErrors: {
      type: Boolean,
      default: true
    },
    initialValue: {
      type: String,
      default: ""
    },
    rules: {
      type: [String, Object],
      default: ""
    },
    name: {
      type: String,
      default: "autosuggest-name"
    },
    alias: {
      type: String
    },
    scope: {
      type: String,
      default: "autosuggest"
    }
  },
  data() {
    return {
      filteredSuggestions: [],
      localValue: "",
      variableTemple: {
        key: "",
        value: "",
        fromName: "",
        fromType: "",
        overwrite: false
      }
    };
  },
  computed: {
    evironment() {
      return this.$store.getters.getEnvironment(
        this.$store.state.env,
        this.$route.params.serviceId
      );
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    },
    setups() {
      if (this.$store.state.steps) {
        return this.$store.state.steps.setups.map(setupStep => {
          return this.$store.getters
            .getSetups(this.$route.params.serviceId)
            .find(setup => setup.id === setupStep.id);
        });
      }

      return [];
    },
    variables() {
      return [].concat(this.testVars, this.setupVars, this.envVars);
    },
    testVars() {
      const variables = [];

      this.test.variables.forEach(variable => {
        const o = clone(this.variableTemple);

        o.key = variable.key;
        o.value = variable.value;
        o.fromName = "Test";
        o.fromType = this.test.name;

        variables.push(o);
      });

      return variables;
    },
    setupVars() {
      const variables = [];

      this.setups.forEach(setup => {
        setup.variables.forEach(variable => {
          const o = clone(this.variableTemple);

          o.fromType = "setup";
          o.fromName = setup.name;
          o.key = variable.name;
          o.value = getGenVariableDesc(setup.generator.type, variable);
          // 是否test中变量覆盖
          o.overwrite = isOverwrite(this.testVars, o);

          variables.push(o);
        });
      });

      return variables;
    },
    envVars() {
      const variables = [];

      this.evironment.variables.forEach(variable => {
        const o = clone(this.variableTemple);

        o.key = variable.key;
        o.value = variable.value;
        o.fromType = "Evironment";
        o.fromName = this.evironment.name;
        o.overwrite =
          isOverwrite(this.testVars, o) || isOverwrite(this.setupVars, o);

        variables.push(o);
      });

      return variables;
    },
    inputProps() {
      return {
        id: "autosuggest__input",
        onInputChange: this.fetchResults,
        initialValue: this.initialValue,
        name: this.name,
        class: this.stateClass
      };
    },
    stateClass() {
      return this.errors.has(this.scope + "." + this.name) ? "is-invalid" : "";
    }
  },
  watch: {
    initialValue(newVal) {
      this.$refs.myAutoSuggestRef.searchInput = newVal;
    },
    localValue(newVal) {
      this.$emit("input", newVal);
    }
  },
  methods: {
    fetchResults(text) {
      this.setLocalValue(text);

      this.$validator.validate(this.scope + "." + this.name).then(res => {
        if (res) {
          if (!text.includes("${")) {
            this.filteredSuggestions = [];
            return;
          }

          // 只能匹配单个正则表达式,例如 ${xxxx，则匹配为 xxxx，如果为${，则匹配为 ""，
          const pattern = /\$\{(.*)\}?/;
          const matched = pattern.exec(text)[1];

          let filteredData = null;
          if (matched === "") {
            filteredData = this.variables;
          } else {
            filteredData = this.variables.filter(variable => {
              return variable.key.includes(matched);
            });
          }

          this.filteredSuggestions = [{ data: filteredData }];
        }
      });
    },
    getSuggestionValue(suggestion) {
      const variable = suggestion.item;
      const replaced = "${" + variable.key + "}";

      this.setLocalValue(this.localValue.replace(/\$\{(.*)\}?/, replaced));

      return this.localValue;
    },
    setLocalValue(val) {
      this.localValue = val;
    }
  }
};
</script>


<style scope>
</style>


