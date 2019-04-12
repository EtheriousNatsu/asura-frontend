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
import TestSchedule from "./TestSchedule";

export default {
  name: "Settings",
  components: {
    TestManage,
    TestTrigger,
    TestSchedule
  },
  data() {
    return {
      components: ["TestSchedule", "TestTrigger", "TestManage"]
    };
  }
};
</script>


<style scoped>
</style>
