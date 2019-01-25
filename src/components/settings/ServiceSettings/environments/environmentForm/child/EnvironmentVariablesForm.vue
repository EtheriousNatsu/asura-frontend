<template>
    <base-environment-form 
        ref="environmentVariables"
        title="Environment variables"
        label="Variable name"
        type="variables"
        btnText="Add environment variable"
        :list="variables"/>
</template>

<script>
import BaseEnvironmentForm from "../base/BaseEnvironmentForm";

export default {
  name: "EnvironmentVariablesForm",
  inject: ["$validator"],
  props: {
    environment: Object
  },
  components: {
    BaseEnvironmentForm
  },
  computed: {
    variables() {
      return this.environment ? this.environment.variables : [];
    },
    dataPack() {
      return {
        variables: this.$refs.environmentVariables.dataPack
      };
    }
  }
};
</script>
