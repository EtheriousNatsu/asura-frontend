<template>
    <b-form-group>
        <b-form-group class="text-left">
            <template slot="label">
                <label style="padding:0rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">
                    Start Date
                </label>
            </template>
            <date-time-picker 
                :format="'yyyy/MM/dd h:mm tt'"
                v-model="computedSelectedDate"
                :value="computedSelectedDate"
                style="width: 100%"
                :min="minDate"
                :open="openTimeView"/>
        </b-form-group>
        <b-form-group class="text-left">
          <template slot="label">
            <label style="padding:.375rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">
              Frequency
            </label>
          </template>
          <b-form-select 
            v-model="computedSelectedFrequency"
            :options="frequencyOptions">
          </b-form-select>
        </b-form-group>
        <b-form-group class="text-left">
          <template slot="label">
            <label style="padding:.375rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">
              Environment
            </label>
          </template>
          <b-form-select
            v-model="computedSelectedEnvironment"
            :options="environmentOptions">
          </b-form-select>
        </b-form-group>
        <b-form-group 
          v-if="schedule"
          style="padding-top: 10px;">
          <b-btn
            @click="cancelUpdateSchedule"
            class="float-left"
            variant="outline-secondary">
            Cancel
          </b-btn>
          <b-btn
            @click="updateScheduleSetting"
            class="float-right"
            variant="primary">
            Save changes
          </b-btn>
        </b-form-group>
        <b-form-group 
          v-else
          style="padding-top: 10px;">
          <b-btn
            @click="cancelCreateSchedule"
            class="float-left"
            variant="outline-secondary">
            Cancel
          </b-btn>
          <b-btn
            @click="createSchedule"
            class="float-right"
            variant="primary">
            Create schedule
          </b-btn>
        </b-form-group>
    </b-form-group>
</template>



<script>
import { mapActions } from "vuex";

import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
import { DateTimePicker } from "@progress/kendo-dateinputs-vue-wrapper";

import { frequencyOpts } from "@/constant/schedules";

export default {
  name: "ScheduleSetting",
  props: {
    schedule: {
      type: Object
    }
  },
  components: {
    DateTimePicker
  },
  beforeCreate() {
    //   获取production环境的id
    this.productionEnvId = this.$store.getters.getEnvironment(
      "production",
      this.$route.params.serviceId
    ).id;
  },
  mounted() {
    // 设置datetimepick不可编辑
    document
      .getElementsByClassName("k-input")
      .item(0)
      .setAttribute("readonly", true);
  },
  data() {
    return {
      minDate: this.getMinDate(),
      defaultDate: this.$moment().format("YYYY/MM/DD h:mm A"),
      selectedDate: "",
      defaultFrequency: "ScheduleDaily",
      selectedFrequency: "",
      frequencyOptions: frequencyOpts,
      selectedEnvironment: "",
      defaultEnvironment: this.productionEnvId
    };
  },
  computed: {
    environmentOptions() {
      // 返回 [{text: env.name, value: env.id}]
      return this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .map(item => {
          const o = Object();
          o.text = item.name;
          o.value = item.id;
          return o;
        });
    },
    computedSelectedDate: {
      get() {
        if (this.selectedDate) {
          return this.selectedDate;
        } else if (this.schedule) {
          return this.schedule.startDate;
        }
        return this.defaultDate;
      },
      set(newVal) {
        this.selectedDate = newVal;
      }
    },
    computedSelectedFrequency: {
      get() {
        if (this.selectedFrequency) {
          return this.selectedFrequency;
        } else if (this.schedule) {
          return this.schedule.frequency;
        }
        return this.defaultFrequency;
      },
      set(newVal) {
        this.selectedFrequency = newVal;
      }
    },
    computedSelectedEnvironment: {
      get() {
        if (this.selectedEnvironment) {
          return this.selectedEnvironment;
        } else if (this.schedule) {
          return this.schedule.environment;
        }
        return this.defaultEnvironment;
      },
      set(newVal) {
        this.selectedEnvironment = newVal;
      }
    }
  },
  methods: {
    ...mapActions(["updateThisSchedule"]),
    updateScheduleSetting() {
      const schedule = {
        environment: this.computedSelectedEnvironment,
        frequency: this.computedSelectedFrequency,
        id: this.schedule.id,
        service: this.$route.params.serviceId,
        startDate: this.computedSelectedDate
      };
      this.updateThisSchedule(schedule).then(() => this.cancelUpdateSchedule());
    },
    cancelUpdateSchedule() {
      this.$emit("hide-scheduleForm");
    },
    cancelCreateSchedule() {
      this.$emit("destroy-modal");
    },
    createSchedule() {
      this.$emit("createSchedule", {
        selectedFrequency: this.computedSelectedFrequency,
        selectedEnvironment: this.computedSelectedEnvironment,
        selectedDate: this.computedSelectedDate
      });
    },
    openTimeView(event) {
      if (event.view === "time") {
        // set time range
        event.sender.timeView.options.max = new Date(2099, 23, 59);

        // generate dates
        const dates = this.generateDates();
        event.sender.timeView.dataBind(dates);
      }
    },
    generateDates() {
      const dates = [];
      let baseDate = new Date();
      const breakMonth = baseDate.getMonth();
      const breakDay = baseDate.getDay();

      dates.push(baseDate);

      while (true) {
        let nextDate = new Date(baseDate.getTime());
        nextDate.setMinutes(baseDate.getMinutes() + 30);

        if (
          nextDate.getMonth() != breakMonth ||
          nextDate.getDay() != breakDay
        ) {
          break;
        }

        dates.push(nextDate);
        baseDate = nextDate; // 以下一个日期为基准
      }
      return dates;
    },
    getMinDate() {
      const currentDate = new Date();

      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
    }
  }
};
</script>


<style scoped>
</style>

