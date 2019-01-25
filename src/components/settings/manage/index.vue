<template>
    <div>
        <b-card header="Delete service">
            <p>
                <b-btn 
                    variant="danger"
                    @click="showModal">
                    Delete {{ service.name }}
                </b-btn>
            </p>
            <span>
                <small class="text-danger">
                    <strong>Careful! </strong>
                    Deleting this service will remove all tests, settings, and results. You can not revert this action.
                </small>
            </span>
        </b-card>
        <base-modal 
            ref="myModalRef"
            v-on:delete="deleteTheService">
            <template slot="title">
                Do you really want to delete this service?
            </template>
            <template slot="body">
                Deleting this service will remove all tests, settings, and results.
            </template>
        </base-modal>
    </div>    
</template>



<script>
import BaseModal from "@/components/base/BaseModal";

import { deleteService } from "@/service/getData";

export default {
  name: "Manage",
  components: {
    BaseModal
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    }
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    deleteTheService() {
      deleteService(this.$route.params.serviceId).then(res => {
        this.$refs.myModalRef.hide();
        this.$router.push("/dashboard");
      });
    }
  }
};
</script>



<style scoped>
</style>




