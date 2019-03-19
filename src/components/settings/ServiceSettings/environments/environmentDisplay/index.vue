<template>
    <b-list-group-item class="text-truncate">
        <environment-form 
            v-if="showEnvironmentForm"
            :environment="environment"
            v-on:cancel-create-or-update-environment="showEnvironmentForm = false"/>
        <div v-else>
            <b-row>
                <b-col 
                    md="11"
                    class="text-truncate">
                    <i 
                        class="oi oi-media-stop"
                        :style="getStyleObj(environment.name)"/>
                    <strong> {{ environment.name }} </strong>
                    <b-link
                        class="text-muted"
                        target="_blank"
                        :href="service.schemes + '://' + environment.url">
                        {{ environment.url }}
                    </b-link>
                </b-col>
                <b-col md="1">
                    <i 
                        @click="showEnvironmentForm = true"
                        class="oi oi-pencil"
                        v-b-tooltip.hover title="Edit environment"
                        style="margin-right: 5px; font-size: 12px; cursor: pointer;"/>
                    <i 
                      v-show="environment.name != 'production'"
                        @click="deleteEnvironment"
                        class="oi oi-trash"
                        v-b-tooltip.hover title="Delete environment"
                        style="margin-right: 5px; font-size: 12px; cursor: pointer;"/>
                </b-col>
            </b-row>
            <div style="margin-left: 20px;">
                <div v-show="isProduction">
                    <b-badge>Default environment</b-badge>
                </div>
                <div>
                    <component 
                        v-for="(componentId, index) in childComponents"
                        :key="index"
                        :environment="environment"
                        :is="componentId"/>
                </div>
            </div>
        </div>
    </b-list-group-item>
</template>


<script>
import { mapActions } from "vuex";

import EnvironmentForm from "../environmentForm";
import EnvironmentVariablesDisplay from "./child/EnvironmentVariablesDisplay";

export default {
  name: "EnvironmentDisplay",
  components: {
    EnvironmentForm,
    EnvironmentVariablesDisplay
  },
  props: {
    environment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showEnvironmentForm: false,
      childComponents: ["EnvironmentVariablesDisplay"]
    };
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    isProduction() {
      return this.environment.name === "production";
    },
    tests() {
      return this.$store.state.tests.filter(
        test => test.service == this.$route.params.serviceId
      );
    }
  },
  methods: {
    ...mapActions(["deleteThisEnvironment"]),
    deleteEnvironment() {
      this.deleteThisEnvironment(this.environment.id);
    },
    getServiceStatusOnEnv(envName) {
      const allTestsLastestResults = this.tests.map(test => {
        const testResults = this.$store.getters.getResults(test.id, envName);
        return testResults.length ? testResults[0] : null;
      });

      // 未运行
      if (allTestsLastestResults.every(result => Object.is(result, null))) {
        return "noRun";
      }

      // 去掉未运行
      const allTestsLastestResults2 = allTestsLastestResults.filter(
        result => result
      );

      if (
        allTestsLastestResults2.some(result =>
          Object.is(result.result, "TestPending")
        )
      ) {
        return "pending";
      }
      if (
        allTestsLastestResults2.every(result =>
          Object.is(result.result, "TestPass")
        )
      ) {
        return "passing";
      }

      if (
        allTestsLastestResults2.some(result =>
          Object.is(result.result, "TestFail")
        )
      ) {
        return "failing";
      }
    },
    getStyleObj(envName) {
      // 没有运行过
      let color = "#6c757d";
      const serviceStatus = this.getServiceStatusOnEnv(envName);

      if (serviceStatus === "pending") {
        color = "rgb(240, 173, 78)";
      } else if (serviceStatus === "failing") {
        color = "rgb(217, 83, 79)";
      } else if (serviceStatus === "passing") {
        color = "rgb(92, 184, 92)";
      }
      return {
        marginRight: "10px",
        fontSize: "12px",
        color: color
      };
    }
  }
};
</script>


<style scoped>
</style>

