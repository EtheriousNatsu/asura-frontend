<template>
    <base-service-form 
      ref="serviceHost"
      label="Host URL"
      validateRule="required|url"
      :value="service.host"/>
</template>


<script>
import BaseServiceForm from "../base/BaseServiceForm";

export default {
  name: "ServiceHostUrlForm",
  inject: ["$validator"],
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseServiceForm
  },
  methods: {
    getDataPack() {
      return {
        host: this.$refs.serviceHost.localValue
      };
    }
  }
};
</script>


<style scoped>
</style>

