<template>
    <div style="margin-top: 10px; margin-bottom: 10px;">
        <span v-if="logs.length">
            <div
                class="text-truncate" 
                v-for="(log, index) in logs" 
                :key="index">
                {{log.msg}}
            </div>
        </span>
        <p v-else>
            No variables captured
        </p>
    </div>
</template>



<script>
export default {
  name: "VariablesDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  computed: {
    logs() {
      return this.stepResult.log;
    }
  }
};
</script>


<style scoped>
</style>

