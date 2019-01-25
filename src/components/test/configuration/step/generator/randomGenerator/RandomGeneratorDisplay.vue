<template>
    <div v-if="step.variables.length">
        <div>
            <small>Captured variables</small>
        </div>
        <span 
            v-for="(variable, index) in step.variables"
            :key="index">
            <random-generator-variable :variable="variable"/>
        </span>
    </div>
</template>



<script>
import RandomGeneratorVariable from "./RandomGeneratorVariable";

export default {
  name: "RandomGeneratorDisplay",
  props: {
    step: {
      type: Object
    }
  },
  components: {
    RandomGeneratorVariable
  }
};
</script>



<style scoped>
</style>

