<template>
    <div>
        <service :service="service"/>
        <environments :environments="environments"/>
    </div>
</template>


<script>
import { mapActions } from "vuex";

import Environments from "./environments";
import Service from "./service";

import { clone } from "@/config/utils";

export default {
  name: "ServiceSettings",
  components: {
    Service,
    Environments
  },
  mounted() {
    this.serviceName = this.service.name;
    this.serviceIcon = this.service.icon;
    this.serviceHost = this.service.host;
    this.serviceSchemes = this.service.schemes;
  },
  data() {
    return {
      serviceName: "",
      serviceIcon: "",
      serviceHost: "",
      serviceSchemes: "",
      showServiceSettingsEditBox: false,
      radioOptions: [
        { text: "HTTP", value: "HTTP" },
        { text: "HTTPS", value: "HTTPS" }
      ]
    };
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    environments() {
      return this.$store.getters.getEnvironments(this.$route.params.serviceId);
    }
  },
  methods: {
    ...mapActions(["updateThisService"]),
    updateService() {
      this.$validator.validateAll("updateService").then(res => {
        if (res) {
          const service = clone(this.service);
          service.name = this.serviceName;
          service.icon = this.serviceIcon;
          service.host = this.serviceHost;
          service.schemes = this.serviceSchemes;
          this.updateThisService(service).then(res => {
            this.showServiceSettingsEditBox = false;
          });
        }
      });
    },
    cancelUpdateService() {
      this.showServiceSettingsEditBox = false;
      this.serviceName = this.service.name;
      this.serviceIcon = this.service.icon;
      this.serviceHost = this.service.host;
      this.serviceSchemes = this.service.schemes;
    }
  }
};
</script>


<style scoped>
</style>


