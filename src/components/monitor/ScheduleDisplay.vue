<template>
    <b-list-group-item>
        <strong> {{getSelectedFrequencyText(schedule.frequency)}} </strong>
        <small class="text-muted">
            <strong>Started:</strong>{{schedule.startDate}}
            <span v-show="schedule.nextRunTime">
                - <strong>Next: Run:</strong>{{schedule.nextRunTime}}
            </span>
        </small>
        <span class="float-right">
            <i 
                @click="showOrHideScheduleForm"
                v-b-tooltip.hover title="Edit schedule and tests"
                style="margin-right: 5px; font-size: 12px; cursor: pointer;"
                class="oi oi-pencil"/>
            <b-link class="text-dark">
                <i 
                    @click="deleteThisSchedule(schedule.id)"
                    v-b-tooltip.hover title="Delete schedule"
                    class="oi oi-trash"
                    style="margin-right: 5px; font-size: 12px;"/>
            </b-link>
        </span>
        <span>
            <div v-if="!isShowScheduleForm">
                <small>Environment: {{getSelectedEnvName(schedule.environment)}}</small>
                <br>
                <small>Enabled tests: {{schedule.tests.length}}</small>
                <small v-show="schedule.lastRunId">
                    <br>
                    <b-link :to="{name: 'results', params: {runId: schedule.lastRunId}}">View last result</b-link>
                </small>
            </div>
            <schedule-form 
                v-else
                v-on:hide-scheduleForm="showOrHideScheduleForm"
                :schedule="schedule"/>
        </span>
    </b-list-group-item>
</template>




<script>
import { mapActions } from "vuex";

import { frequencyOpts } from "@/constant/schedules";

import ScheduleForm from "@/components/monitor/ScheduleForm";

export default {
  name: "ScheduleDisplay",
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  components: {
    ScheduleForm
  },
  data() {
    return {
      frequencyOptions: frequencyOpts,
      isShowScheduleForm: false
    };
  },
  methods: {
    ...mapActions(["deleteSchedule"]),
    deleteThisSchedule(scheduleId) {
      this.deleteSchedule(scheduleId);
    },
    showOrHideScheduleForm() {
      this.isShowScheduleForm = !this.isShowScheduleForm;
    },
    getSelectedFrequencyText(value) {
      return this.frequencyOptions.find(option => {
        return option.value === value;
      }).text;
    },
    getSelectedEnvName(envId) {
      return this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .find(env => {
          return env.id == envId;
        }).name;
    }
  }
};
</script>



<style scoped>
</style>

