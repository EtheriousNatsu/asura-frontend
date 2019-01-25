<template>
    <base-service-form 
      ref="serviceIconUrl"
      label="Icon URL"
      validateRule="required|url"
      :value="service.icon"/>
</template>


<script>
import BaseServiceForm from "../base/BaseServiceForm";

export default {
  name: "ServiceIconUrlForm",
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
        icon: this.$refs.serviceIconUrl.localValue
      };
    }
  }
};
</script>


<style scoped>
</style>
