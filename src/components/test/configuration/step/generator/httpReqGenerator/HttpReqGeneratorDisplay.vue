<template>
    <div>
      <div>
        <small>
          <strong class="text-muted">{{step.generator.settings.requestMethod}}</strong>
          <b-link 
            :href="url"
            target="_blank">
            {{url}}
          </b-link>
        </small>
      </div>
      <div v-if="step.variables.length">
        <div>
          <small>Captured variables</small>
        </div>
        <span 
            v-for="(variable, index) in step.variables"
            :key="index">
            <http-req-generator-variable :variable="variable"/>
        </span>
      </div>
      <slot v-if="step.variables.length"></slot>
    </div>
</template>



<script>
import HttpReqGeneratorVariable from "./HttpReqGeneratorVariable";

export default {
  name: "HttpReqGeneratorDisplay",
  props: {
    step: {
      type: Object
    }
  },
  components: {
    HttpReqGeneratorVariable
  },
  computed: {
    url() {
      return (
        this.step.generator.settings.requestScheme +
        "://" +
        this.step.generator.settings.requestHost +
        this.step.generator.settings.requestPath
      );
    }
  }
};
</script>



<style scoped>
</style>

