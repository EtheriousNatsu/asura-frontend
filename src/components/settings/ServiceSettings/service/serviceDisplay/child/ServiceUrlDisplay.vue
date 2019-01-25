<template>
    <base-service-display>
        <template slot="label">
            Host URL
        </template>
        <template slot="content">
            <b-link
                :href="service.schemes + '://' + service.host"
                target="_blank">
                {{service.host}}
            </b-link>
        </template>
    </base-service-display>
</template>



<script>
import BaseServiceDisplay from "../base/BaseServiceDisplay";

export default {
  name: "ServiceUrlDisplay",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseServiceDisplay
  }
};
</script>



<style scoped>
</style>

