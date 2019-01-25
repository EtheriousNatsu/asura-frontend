<template>
  <div>
    <b-row>
      <b-col :md="columns">
        <p v-if="isProduction">
          <strong> {{ environmentName }} </strong>
          <span class="text-muted"> {{ environmentUrl }} </span>
          <b-badge class="float-right">Default environment</b-badge>
        </p>
        <div v-else>
          <b-form-group
            :invalid-feedback="errors.first('environmentName')"
            :state="errors.has('environmentName') ? false : null">
            <template slot="label">
              <span>Environment name</span>
              <small class="text-muted">(eg 'staging')</small>
            </template>
            <b-form-input
              name="environmentName"
              v-validate="'required'"
              data-vv-as="environment name"
              data-vv-validate-on="input"
              :state="errors.has('environmentName') ? false : null"
              v-model="environmentName"
              placeholder="staging"/>
          </b-form-group>
          <b-form-group
            :invalid-feedback="errors.first('environmentUrl')"
            :state="errors.has('environmentUrl') ? false : null">
            <template slot="label">
              Environment URL
            </template>
            <b-form-input 
              name="environmentUrl"
              v-validate="'required|url'"
              data-vv-as="environment url"
              data-vv-validate-on="input"
              :state="errors.has('environmentUrl') ? false : null"
              v-model="environmentUrl"
              placeholder="https://staging.example.com"/>
            </b-form-group>
        </div>
        <component 
          v-for="(componentId, index) in childComponents" 
          :key="index"
          :is="componentId" 
          :ref="componentId"
          :environment="environment"/>
      </b-col>
      <b-col :md="columns"></b-col>
    </b-row>
    <div>
      <br>
      <div>
        <b-btn 
          @click="cancel"
          variant="outline-secondary">
          Cancel
        </b-btn>
        <b-btn 
          @click="save"
          variant="success"
          class="float-right">
          Save Environment
        </b-btn>
      </div>
    </div>
  </div>
</template>



<script>
import { mapActions } from "vuex";

import EnvironmentVariablesForm from "./child/EnvironmentVariablesForm";

export default {
  name: "EnvironmentForm",
  components: {
    EnvironmentVariablesForm
  },
  props: {
    environment: {
      type: Object
    }
  },
  data() {
    return {
      environmentName: "",
      environmentUrl: "",
      childComponents: ["EnvironmentVariablesForm"]
    };
  },
  computed: {
    isProduction() {
      return this.environment && this.environment.name === "production"
        ? true
        : false;
    },
    columns() {
      return this.isProduction ? 12 : 6;
    }
  },
  created() {
    if (this.environment) {
      this.environmentName = this.environment.name;
      this.environmentUrl = this.environment.url;
    }
  },
  methods: {
    ...mapActions(["addThisEnvironment", "updateThisEnvironment"]),
    save() {
      this.$validator.validate().then(res => {
        const environment = this.buildEnvironment();
        if (res) {
          this.environment
            ? this.updateEnvironment(environment)
            : this.createEnvironment(environment);
        }
      });
    },
    createEnvironment(environment) {
      this.addThisEnvironment(environment).then(res => {
        this.cancel();
      });
    },
    updateEnvironment(environment) {
      this.updateThisEnvironment(environment).then(res => {
        this.cancel();
      });
    },
    buildEnvironment() {
      let environment = {
        name: this.environmentName,
        url: this.environmentUrl,
        service: Number(this.$route.params.serviceId)
      };

      if (this.environment) {
        environment.id = this.environment.id;
      }
      this.childComponents.forEach(componentId => {
        environment = Object.assign(
          {},
          environment,
          this.$refs[componentId][0].dataPack
        );
      });

      return environment;
    },
    cancel() {
      this.$emit("cancel-create-or-update-environment");
    }
  }
};
</script>


<style scoped>
</style>

