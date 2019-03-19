<template>
  <b-modal 
    centered
    ref="myMonitorModal"
    hide-footer
    size="lg"
    id="myMonitorModal">
    <template slot="modal-header">
      <b-container>
        <div style="padding-top: 15px; padding-bottom: 15px;">
          <span>
            <button 
              @click="destroyModal"
              class="close"
              style="padding-left: 5px;">
              <small>×</small>
            </button>
            <h5 class="text-left">
              <i 
                class="oi oi-pulse"
                style="margin-right: 0px; font-size: inherit; padding-right: 10px;"/>
                Create a new schedule
            </h5>
            <hr>
          </span>
        </div>
        <b-row>
          <b-col md="12">
            <component 
              v-if="showFirstModal"
              :is="'ScheduleSetting'" 
              v-on:destroy-modal="destroyModal"
              v-on:createSchedule="createSchedule"/>
            
            <div v-else>
              <div 
                class="text-left"
                style="padding-bottom: 30px;">
                <div>
                  Enable or disable tests for this schedule
                  <br>
                  <small class="text-muted">
                    {{getSelectedEnvName(createdSchedule.environment)}} · {{getSelectedFrequencyText(createdSchedule.frequency)}} · Starting on {{createdSchedule.startDate}}
                  </small>
                </div>
              </div>
              <component 
                :schedule="createdSchedule"
                v-on:destroy-modal="destroyModal"
                v-on:create-association="createAssociationBetweenTestsAndSchedule"
                :is="'ScheduleTests'"/>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>



<script>
import { mapActions } from "vuex";

import ScheduleSetting from "@/components/monitor/ScheduleSetting";
import ScheduleTests from "@/components/monitor/ScheduleTests";

import { frequencyOpts } from "@/constant/schedules";

export default {
  name: "MonitorModal",
  components: {
    ScheduleSetting,
    ScheduleTests
  },
  mounted() {
    // listen to modal hide
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (this.showSecondModal && this.clickedDoBtn == false) {
        this.deleteSchedule(this.createdSchedule.id);
      }
      this.showFirstModal = true;
      this.showSecondModal = false;
      this.clickedDoBtn = false;
    });
  },
  data() {
    return {
      showFirstModal: true,
      showSecondModal: false,
      createdSchedule: null,
      clickedDoBtn: false
    };
  },
  methods: {
    ...mapActions([
      "createOneSchedule",
      "deleteSchedule",
      "associateTestAndSchedule"
    ]),
    createSchedule(scheduleParams) {
      const schedule = {
        environment: scheduleParams.selectedEnvironment,
        frequency: scheduleParams.selectedFrequency,
        service: this.$route.params.serviceId,
        startDate: scheduleParams.selectedDate
      };

      this.createOneSchedule(schedule).then(createdSchedule => {
        this.createdSchedule = createdSchedule;
        this.showFirstModal = false;
        this.showSecondModal = true;
      });
    },
    createAssociationBetweenTestsAndSchedule(selectedTests) {
      // 点击Do按钮标记
      this.clickedDoBtn = true;

      if (selectedTests.length) {
        selectedTests.forEach(testId => {
          this.associateTestAndSchedule({
            scheduleId: this.createdSchedule.id,
            testId: testId
          });
        });
      }

      this.destroyModal();
    },
    destroyModal() {
      this.$emit("destroy-modal");
    },
    hideModal() {
      this.$refs.myMonitorModal.hide();
    },
    showModal() {
      this.$refs.myMonitorModal.show();
    },
    getSelectedEnvName(envId) {
      return this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .find(env => {
          return env.id == envId;
        }).name;
    },
    getSelectedFrequencyText(value) {
      return frequencyOpts.find(option => {
        return option.value === value;
      }).text;
    }
  }
};
</script>


<style scope>
</style>

