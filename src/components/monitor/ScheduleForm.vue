<template>
  <b-row style="margin-top: 20px;">
    <b-col md="7">
      <p>
        <i 
          class="oi oi-list-rich"
          style="margin-right: 5px; font-size: 12px;"/>Tests
        <br>
        <small class="text-muted">Enable or disable tests on this schedule</small>
      </p>
      <schedule-tests 
        :showBtn="false"
        :schedule="schedule"/>
    </b-col>
    <b-col md="5">
      <p>
        <i 
          class="oi oi-pulse"
          style="margin-right: 5px; font-size: 12px;"/>Settings
        <br>
        <small class="text-muted">Edit this schedule's settings</small>
      </p>
      <schedule-setting 
        :showTimePicker="false"
        v-on:hide-scheduleForm="hideScheduleForm"
        :schedule="schedule"/>
    </b-col>
  </b-row>
</template>




<script>
import ScheduleTests from "@/components/monitor/ScheduleTests";
import ScheduleSetting from "@/components/monitor/ScheduleSetting";

export default {
  name: "ScheduleForm",
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  components: {
    ScheduleTests,
    ScheduleSetting
  },
  methods: {
    hideScheduleForm() {
      this.$emit("hide-scheduleForm");
    }
  }
};
</script>


<style scoped>
</style>

