<template>
    <base-service-display>
        <template slot="label">
            Trigger URL
        </template>        
        <template slot="content">
            <span>
                <b-link
                    :href="triggerUrl"
                    target="_blank">
                    {{triggerUrl}}
                </b-link>
            </span>            
        </template>
    </base-service-display>
</template>


<script>
import { baseUrl } from "@/config/env";
import BaseServiceDisplay from "../base/BaseServiceDisplay";

const uri = require("jsuri");

export default {
  name: "ServiceTriggerUrlDisplay",
  components: {
    BaseServiceDisplay
  },
  computed: {
    triggerUrl() {
      const scheme = window.location.protocol;
      const host = window.location.host;
      const path = baseUrl + `/services/${this.$route.params.serviceId}/run`;
      const query = `api_token=${this.$store.state.token}`;

      return new uri()
        .setProtocol(scheme)
        .setHost(host)
        .setPath(path)
        .setQuery(query)
        .toString();
    }
  }
};
</script>

<style scoped>
</style>

