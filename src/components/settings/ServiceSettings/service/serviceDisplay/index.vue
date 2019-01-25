<template>
  <div>
    <dl>
        <component 
            v-for="(componentId, index) in childComponents" 
            :key="index"
            :is="componentId"
            :service="service" />
    </dl>
    <b-btn
      variant="outline-secondary"
      size="sm"
      @click="showServiceForm">
      Edit service
    </b-btn>    
  </div>

</template>


<script>
import ServiceUrlDisplay from "./child/ServiceUrlDisplay";
import ServiceSchemesDisplay from "./child/ServiceSchemesDisplay";
import ServiceTriggerUrlDisplay from "./child/ServiceTriggerUrlDisplay";

export default {
  name: "ServiceDisplay",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    ServiceUrlDisplay,
    ServiceSchemesDisplay,
    ServiceTriggerUrlDisplay
  },
  data() {
    return {
      childComponents: [
        "ServiceUrlDisplay",
        "ServiceSchemesDisplay",
        "ServiceTriggerUrlDisplay"
      ]
    };
  },
  methods: {
    showServiceForm() {
      this.$emit("show-or-hidden-service-form");
    }
  }
};
</script>



<style scoped>
</style>


