<template>
    <base-service-display>
        <template slot="label">
            Schemes
        </template>        
        <template slot="content">
            <span>
                <code> {{ service.schemes }} </code>
            </span>            
        </template>
    </base-service-display>
</template>



<script>
import BaseServiceDisplay from "../base/BaseServiceDisplay";

export default {
  name: "ServiceSchemesDisplay",
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

