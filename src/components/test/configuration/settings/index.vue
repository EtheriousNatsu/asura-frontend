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
import EmailHooks from "./EmailHooks";

export default {
  name: "Settings",
  components: {
    TestManage,
    TestTrigger,
    TestSchedule,
    EmailHooks
  },
  data() {
    return {
      components: ["EmailHooks", "TestSchedule", "TestTrigger", "TestManage"]
    };
  }
};
</script>


<style scoped>
</style>
