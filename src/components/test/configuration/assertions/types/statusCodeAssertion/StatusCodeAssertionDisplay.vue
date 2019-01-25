<template>
    <div>
        <small>
            Assert
            <span>
                <span>status code</span>
                <i>{{getComparatorDesc()}}</i>
                <code>{{assertion.target}}</code>
            </span>
        </small>
    </div>
</template>



<script>
import { STATUSCODECOMPARISONOPTIONS } from "@/constant/assertions";

export default {
  name: "StatusCodeAssertionDisplay",
  props: {
    assertion: {
      type: Object,
      required: true
    }
  },
  methods: {
    getComparatorDesc() {
      return this.$parent.getComparatorDesc(STATUSCODECOMPARISONOPTIONS);
    }
  }
};
</script>


<style scoped>
</style>

