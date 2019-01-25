<template>
    <div>
        <component 
            v-for="(component,index) in components"
            :key="index"
            :is="component" />
    </div>
</template>



<script>
import TestManage from "./TestManage";
import TestTrigger from "./TestTrigger";

export default {
  name: "Settings",
  components: {
    TestManage,
    TestTrigger
  },
  data() {
    return {
      components: ["TestTrigger", "TestManage"]
    };
  }
};
</script>


<style scoped>
</style>
