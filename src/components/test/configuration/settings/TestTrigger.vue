<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">Trigger URL</b-card-header>
        <div class="card-body text-truncate">
            <b-link
                :href="triggerUrl"
                target="_blank">
                {{triggerUrl}}
            </b-link>
        </div>
    </div>
</template>



<script>
import { baseUrl } from "@/config/env";

const uri = require("jsuri");

export default {
  name: "TestTrigger",
  computed: {
    triggerUrl() {
      const scheme = window.location.protocol;
      const host = window.location.host;
      const path = baseUrl + `/tests/${this.$route.params.testId}/run`;
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

