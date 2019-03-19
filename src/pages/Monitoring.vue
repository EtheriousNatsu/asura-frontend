<template>
    <b-row style="background-color: rgb(255, 255, 255); padding-top: 20px;">
        <b-col md="12">
            <b-card 
              no-body 
              header="Schedules"
              v-if="schedules.length">
              <b-list-group flush>
                <schedule-display 
                  v-for="schedule in schedules" 
                  :key="schedule.id"
                  :schedule="schedule"/>
                <b-card-body>
                  <b-button 
                    @click="createModal"
                    variant="primary">
                    Add another schedule
                  </b-button>
                </b-card-body>
              </b-list-group>
            </b-card>
            <b-card 
              v-else
              style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
                <p class="text-center">
                    <i 
                        style="font-size: 1.5rem; color: rgb(129, 138, 145);"
                        class="oi oi-pulse"/>
                </p>
                <p class="text-center">Create a schedule to monitor your web service.</p>
                <p class="text-center">
                    <b-button 
                        @click="createModal"
                        variant="primary">
                        Set up a schedule
                    </b-button>
                </p>
            </b-card>
            <monitor-Modal 
              v-if="isShowModal"
              ref="myMonitorModal"
              v-on:destroy-modal="destroyModal"/>
        </b-col>
    </b-row>
</template>


<script>
import MonitorModal from "@/components/monitor/MonitorModal";
import ScheduleDisplay from "@/components/monitor/ScheduleDisplay";

export default {
  name: "Monitoring",
  components: {
    MonitorModal,
    ScheduleDisplay
  },
  data() {
    return {
      isShowModal: false
    };
  },
  computed: {
    schedules() {
      return this.$store.state.schedules.filter(
        schedule => schedule.service == this.$route.params.serviceId
      );
    }
  },
  methods: {
    createModal() {
      this.isShowModal = true;
      this.$nextTick(() => {
        this.$refs.myMonitorModal.showModal();
      });
    },
    destroyModal() {
      this.isShowModal = false;
      this.$refs.myMonitorModal.hideModal();
    }
  }
};
</script>


<style scope>
</style>

