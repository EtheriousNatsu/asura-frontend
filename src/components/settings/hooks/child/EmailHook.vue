<template>
    <div>
        <div>
            <h4>
                <b-link :to="backTo">
                    <i 
                        class="oi oi-chevron-left"
                        :style="styleObj"/>
                </b-link>
                <span>Email hooks</span>
            </h4>
            <p
                style="padding-left: 25px;"
                class="text-muted">
                Send email reports when test runs fail or complete
            </p>
        </div>
        <hr>
        <b-card 
          no-body
          v-if="hooks.length">
          <b-list-group flush>
            <email-hook-display 
              v-for="hook in hooks"
              :key="hook.id"
              :emailHook="hook"/>
          </b-list-group>
          <b-card-body>
            <b-btn
              size="sm"
              @click="createEmailModal"
              variant="outline-secondary">
              Add new hook
            </b-btn>
          </b-card-body>
        </b-card>
        <b-card v-else>
            <b-row>
                <b-col 
                    md="8"
                    offset-md="2">
                    <div>
                        <br>
                        <p class="text-center">
                            <i 
                                class="oi oi-action-redo"
                                style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
                        </p>
                        <p class="text-center">Get email alerts when your tests run with email hooks.</p>
                        <p class="text-center">
                            <b-btn
                                @click="createEmailModal"
                                variant="primary">
                                Add email hook
                            </b-btn>
                        </p>
                    </div>
                </b-col>
            </b-row>
        </b-card>
        <email-hook-modal 
            v-if="showEmailModal"
            ref="myEmailModal"
            v-on:destroy-modal="destroyModal"/>
    </div>
</template>



<script>
import EmailHookModal from "./EmailHookModal";
import EmailHookDisplay from "./EmailHookDisplay";

export default {
  name: "EmailHook",
  components: {
    EmailHookModal,
    EmailHookDisplay
  },
  data() {
    return {
      backTo: {
        name: "alerts",
        params: { serviceId: this.$route.params.serviceId }
      },
      showEmailModal: false,
      styleObj: {
        marginRight: "5px",
        fontSize: "14px",
        marginLeft: "2px",
        marginTop: "-5px",
        color: "#373a3c",
        verticalAlign: "middle"
      }
    };
  },
  computed: {
    hooks() {
      return this.$store.state.hooks.filter(
        hook => hook.service == this.$route.params.serviceId
      );
    }
  },
  methods: {
    createEmailModal() {
      this.showEmailModal = true;
      this.$nextTick(() => {
        this.$refs.myEmailModal.showModal();
      });
    },
    destroyModal() {
      this.showEmailModal = false;
      this.$refs.myEmailModal.hideModal();
    }
  }
};
</script>


<style scoped>
</style>

