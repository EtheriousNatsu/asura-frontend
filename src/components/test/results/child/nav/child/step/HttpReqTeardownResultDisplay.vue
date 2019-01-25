<template>
<base-http-req-result-display :stepResult="stepResult"/>
</template>



<script>
import BaseHttpReqResultDisplay from "@/components/test/results/child/nav/child/step/base/BaseHttpReqResultDisplay";

export default {
  name: "HttpReqTeardownResultDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseHttpReqResultDisplay
  }
};
</script>


<style scoped>
</style>

