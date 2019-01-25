<template>
    <base-environment-display icon="oi-puzzle-piece">
        <template slot="header">
            Environment variables
        </template>
        <template slot="body">
            <div
                v-for="(variable, index) in environment.variables"
                :key="index">
                <span>
                    <code>
                        <span>${</span>{{variable.key}}<span>}</span>
                    </code>
                    <i 
                        class="oi oi-arrow-right"
                        style="margin-right: 5px; font-size: 12px;"/>
                    {{ variable.value }}
                </span>
            </div>            
        </template>
        <template 
            v-if="environment.variables.length === 0"
            slot="footer">
            No environment variables
        </template>
    </base-environment-display>
</template>


<script>
import BaseEnvironmentDisplay from "../base/BaseEnvironmentDisplay";

export default {
  name: "EnvironmentVariables",
  props: {
    environment: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseEnvironmentDisplay
  }
};
</script>



<style scoped>
</style>

