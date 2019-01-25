<template>
    <div>
        <b-card
            header="Service settings"
            class="mb-3">
            <div>
                <b-img
                    :src="service.icon"
                    width="32"
                    height="32" />
                <h5 class="text-truncate service-name">{{ service.name }}</h5>
                <hr>
            </div>
            <service-form 
              v-if="showServiceForm"
              :service="service"
              v-on:show-or-hidden-service-form="showOrHiddenServiceForm"/>
            <service-display 
              v-else
              :service="service"
              v-on:show-or-hidden-service-form="showOrHiddenServiceForm"/>
        </b-card>
    </div>
</template>



<script>
import ServiceDisplay from "./serviceDisplay";
import serviceForm from "./serviceForm";

export default {
  name: "Service",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    ServiceDisplay,
    serviceForm
  },
  data() {
    return {
      showServiceForm: false
    };
  },
  methods: {
    showOrHiddenServiceForm() {
      this.showServiceForm = !this.showServiceForm;
    }
  }
};
</script>

<style scoped>
.service-name {
  display: inline-block;
  vertical-align: text-top;
  max-width: 70%;
  margin-bottom: 0px;
}
</style>
