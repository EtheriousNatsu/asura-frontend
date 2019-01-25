<template>
    <base-service-form 
      ref="serviceName"
      label="Name"
      validateRule="required"
      :value="service.name"/>
</template>


<script>
import BaseServiceForm from "../base/BaseServiceForm";

export default {
  name: "ServiceNameForm",
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
        name: this.$refs.serviceName.localValue
      };
    }
  }
};
</script>


<style scoped>
</style>

