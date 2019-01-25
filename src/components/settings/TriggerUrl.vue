<template>
    <div>
        <b-card header="Trigger URL">
            <p>Use the Trigger URL to run your tests from outside the Assertible dashboard. For example, tests can be run from a CI build, a script, or your browser.</p>
            <p>
                <strong>{{serviceHost}} trigger URL:</strong>
                <br>
                <b-link
                    :href="triggerUrl"
                    target="_blank">
                    {{triggerUrl}}
                </b-link>
            </p>
            <p>
                <strong>curl example:</strong>
                <br>
                <pre v-highlightjs="sourcecode" style="background:#f0f0f0;"><code class="bash"></code></pre>
            </p>
        </b-card>
    </div>
</template>



<script>
import { baseUrl } from "@/config/env";

const uri = require("jsuri");

export default {
  name: "TriggerUrl",
  computed: {
    serviceHost() {
      return this.$store.getters.getService(this.$route.params.serviceId).host;
    },
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
    },
    sourcecode() {
      return "$ curl " + this.triggerUrl;
    }
  }
};
</script>


<style scoped>
</style>

