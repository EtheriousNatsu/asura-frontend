<template>
  <span>
    <div>
      <variables-display 
        :stepResult="stepResult"/>
    </div>
  </span>
</template>



<script>
import VariablesDisplay from "@/components/test/results/child/nav/child/step/base/VariablesDisplay";

export default {
  name: "RandomSetupResultDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  components: {
    VariablesDisplay
  }
};
</script>


<style scoped>
</style>

