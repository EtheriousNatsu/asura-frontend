<template>
  <div :style="styleObject">
    <span>
      <code><span>${</span>{{variable.name}}<span>}</span></code>
    </span>
    <i 
      class="oi oi-arrow-right" 
      style="margin-right: 5px; font-size: 12px;"/>
    <span> {{ getVariableDesc() }} </span>
    <slot></slot>
    
  </div>
</template>




<script>
import { getRandomGeneratorVariableDesc } from "@/utils/steps";

export default {
  name: "RandomGeneratorVariable",
  props: {
    variable: {
      type: Object
    },
    styleObject: {
      type: Object
    }
  },
  methods: {
    getVariableDesc() {
      return getRandomGeneratorVariableDesc(this.variable);
    }
  }
};
</script>


<style scoped>
</style>

