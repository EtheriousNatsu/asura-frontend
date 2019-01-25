<template>
    <b-row>
      <b-col md="9">
        <component 
          :ref="componentId"
          v-for="(componentId, index) in childComponents" 
          :key="index"
          :is="componentId" 
          :service="service"/>
        <b-form-group>
          <b-btn
            variant="outline-secondary"
            @click="cancel">
            Cancel
          </b-btn>
          <b-btn
            @click="save"
            variant="success"
            class="float-right">
            Save changes
          </b-btn>
        </b-form-group>
      </b-col>
    </b-row>
</template>


<script>
import { mapActions } from "vuex";

import ServiceHostUrlForm from "./child/ServiceHostUrlForm";
import ServiceIconUrlForm from "./child/ServiceIconUrlForm";
import ServiceNameForm from "./child/ServiceNameForm";
import ServiceSchemesForm from "./child/ServiceSchemesForm";

export default {
  name: "ServiceForm",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    ServiceHostUrlForm,
    ServiceIconUrlForm,
    ServiceNameForm,
    ServiceSchemesForm
  },
  data() {
    return {
      childComponents: [
        "ServiceNameForm",
        "ServiceIconUrlForm",
        "ServiceHostUrlForm",
        "ServiceSchemesForm"
      ]
    };
  },
  methods: {
    ...mapActions(["updateThisService"]),
    cancel() {
      this.$emit("show-or-hidden-service-form");
    },
    save() {
      this.$validator.validate().then(res => {
        if (res) {
          const service = this.buildService();

          this.updateThisService(service).then(res => this.cancel());
        }
      });
    },
    buildService() {
      let service = {
        id: this.service.id,
        user: this.$store.state.userInfo.id
      };

      this.childComponents.forEach(componentId => {
        service = Object.assign(
          service,
          this.$refs[componentId][0].getDataPack()
        );
      });
      return service;
    }
  }
};
</script>

<style scoped>
</style>

