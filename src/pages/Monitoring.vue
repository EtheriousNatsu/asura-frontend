<template>
    <b-row style="background-color: rgb(255, 255, 255); padding-top: 20px;">
        <b-col md="12">
            <b-card style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
                <p class="text-center">
                    <i 
                        style="font-size: 1.5rem; color: rgb(129, 138, 145);"
                        class="oi oi-pulse"/>
                </p>
                <p class="text-center">Create a schedule to monitor your web service.</p>
                <p class="text-center">
                    <b-button 
                        v-b-modal.myMonitorModal
                        variant="primary"
                        href="#">
                        Set up a schedule
                    </b-button>
                    <b-modal 
                        ref="myMonitorModal"
                        hide-footer
                        size="lg"
                        id="myMonitorModal">
                        <template slot="modal-header">
                            <b-container>
                                <div style="padding-top: 15px; padding-bottom: 15px;">
                                    <span>
                                        <button 
                                            @click="hideModal"
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
                                        <b-form-group 
                                            class="text-left"
                                            label="Start Date">

                                        </b-form-group>

                                    </b-col>
                                </b-row>
                            </b-container>
                        </template>
                    </b-modal>
                </p>
            </b-card>
        </b-col>
    </b-row>
</template>


<script>
export default {
  name: "Monitoring",
  methods: {
    hideModal() {
      this.$refs.myMonitorModal.hide();
    }
  }
};
</script>


<style>
#myMonitorModal___BV_modal_header_ {
  border-bottom: 0;
}
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
}
</style>

