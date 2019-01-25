<template>
<base-http-display 
    :result="result"
    :type="type"/>
</template>




<script>
import BaseHttpDisplay from "@/components/test/results/child/nav/child/http/base/BaseHttpDisplay";

export default {
  name: "ResponseDisplay",
  props: {
    result: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    BaseHttpDisplay
  }
};
</script>


<style scoped>
</style>

