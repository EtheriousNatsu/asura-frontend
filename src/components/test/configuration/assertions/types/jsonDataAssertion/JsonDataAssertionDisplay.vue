<template>
    <div>
        <small>
            Assert
            <span>
                <span>JSON path</span>
                <code>{{assertion.property}}</code>
                <i>{{getComparatorDesc()}}</i>
                <code>{{assertion.target}}</code>
            </span>
        </small>
    </div>
</template>



<script>
import { JSONDATACOMPARISONOPTIONS } from "@/constant/assertions";

export default {
  name: "JsonDataAssertionDisplay",
  props: {
    assertion: {
      type: Object,
      required: true
    }
  },
  methods: {
    getComparatorDesc() {
      return this.$parent.getComparatorDesc(JSONDATACOMPARISONOPTIONS);
    }
  }
};
</script>


<style scoped>
</style>

