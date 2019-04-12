<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">Schedules</b-card-header>
        <div class="card-body">
          <div v-if="schedules.length == 0">
            <small>Monitor your web service with test schedules.</small>
            <b-link :to="linkTo">Add one now</b-link>
          </div>
            <div 
              v-for="(schedule, index) in schedules" 
              :key="index"
              class="text-truncate">
              <b-form-checkbox
                v-on:input="handleInput($event, schedule.id)"
                v-model="schedule.isChecked">
                <strong>{{getScheduleFrequencyText(schedule.frequency)}}</strong>
              </b-form-checkbox>
              <br>
              <small 
                style="margin-left: 25px;"
                class="text-muted">
                <strong>Started:</strong>
                {{schedule.startDate}}
                <span>
                  - 
                  <strong>Next Run:</strong>
                  {{$moment(schedule.nextRunTime).format("YYYY/MM/DD h:mm A")}}
                </span>
              </small>
              <br>
              <small 
                class="text-muted"
                style="margin-left: 25px;">
                <span>
                  {{getScheduleDescription(schedule)}}
                  <br>
                  <b-link 
                    v-if="schedule.lastRunId"
                    :to="getDetailLink(schedule)"
                    style="padding-left: 25px;">
                    View details
                  </b-link>
                </span>
              </small>
            </div>
        </div>
    </div>    
</template>



<script>
import { mapActions } from "vuex";

import { frequencyOpts } from "@/constant/schedules";

export default {
  name: "TestSchedule",
  data() {
    return {
      frequencyOptions: frequencyOpts
    };
  },
  computed: {
    schedules() {
      const serviceSchedules = this.$store.state.schedules.filter(
        schedule => schedule.service == this.$route.params.serviceId
      );

      serviceSchedules.map(schedule => {
        if (schedule.tests.find(test => test.id == this.$route.params.testId)) {
          // 该用例被定时任务选中
          schedule.isChecked = true;
        } else {
          // 该用例没被定时任务选中
          schedule.isChecked = false;
        }
      });

      return serviceSchedules;
    },
    linkTo() {
      return {
        name: "monitoring",
        params: { serviceId: this.$route.params.serviceId }
      };
    }
  },
  methods: {
    ...mapActions([
      "removeAssociateTestAndSchedule",
      "associateTestAndSchedule"
    ]),
    handleInput(checked, scheduleId) {
      if (checked) {
        // 关联用例与定时任务
        this.associateTestAndSchedule({
          scheduleId: scheduleId,
          testId: this.$route.params.testId
        });
      } else {
        // 取消用例和定时任务的关联
        this.removeAssociateTestAndSchedule({
          scheduleId: scheduleId,
          testId: this.$route.params.testId
        });
      }
    },
    getScheduleFrequencyText(value) {
      return this.frequencyOptions.find(option => {
        return option.value === value;
      }).text;
    },
    getScheduleDescription(schedule) {
      const scheduleTestsCount = schedule.tests.length;
      const scheduleEnvironmentName = this.getEnvironmentName(
        schedule.environment
      );
      return `${scheduleTestsCount} tests are enabled for this schedule. (${scheduleEnvironmentName})`;
    },
    getEnvironmentName(envId) {
      return this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .find(env => {
          return env.id == envId;
        }).name;
    },
    getDetailLink(schedule) {
      return { name: "results", params: { runId: schedule.lastRunId } };
    }
  }
};
</script>

<style scoped>
</style>

