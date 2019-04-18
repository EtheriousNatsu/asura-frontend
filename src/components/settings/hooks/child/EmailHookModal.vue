<template>
    <b-modal
        centered
        hide-footer
        ref="myEmailModal"
        size="lg">
        <template slot="modal-header">
            <b-container>
                <div style="padding-top: 15px; padding-bottom: 15px;">
                    <span>
                        <b-btn
                            @click="destroyModal"
                            class="close"
                            style="padding-left: 5px;">
                            <small>×</small>
                        </b-btn>
                        <h5 class="text-left">
                            <i 
                                class="oi oi-action-redo"
                                style="margin-right: 0px; font-size: inherit; padding-right: 10px;"/>
                            Create an email hook
                        </h5>
                    </span>
                </div>
                <b-alert
                  :show="showCreateHookErr"
                  variant="danger">
                  {{createHookErrorMsg}}
                </b-alert>
                <b-row>
                    <b-col md="12">
                      <email-hook-settings 
                        v-if="showFirstModal"
                        v-on:destroy-modal="destroyModal"
                        v-on:create-emailHook="createEmailHook"/>
                      
                      <div v-else>
                        <div 
                          class="text-left"
                          style="padding-bottom: 30px;">
                          <div>
                            Enable or disable tests for this email hook
                            <br>
                            <small class="text-muted">
                              {{getHookDesc()}}
                            </small>
                          </div>
                        </div>
                        <email-hook-tests 
                          v-on:destroy-modal="destroyModal"
                          v-on:create-association="createAssociationBetweenTestsAndHook"/>
                      </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </b-modal>
</template>



<script>
import { mapActions } from "vuex";
import EmailHookSettings from "./EmailHookSettings";
import EmailHookTests from "./EmailHookTests";

export default {
  name: "EmailHookModal",
  components: {
    EmailHookSettings,
    EmailHookTests
  },
  data() {
    return {
      showFirstModal: true,
      showSecondModal: false,
      createdEmailHook: null,
      clickedDoBtn: false,
      createHookErrorMsg: null,
      showCreateHookErr: false
    };
  },
  mounted() {
    // listen to modal hide
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (this.showSecondModal && this.clickedDoBtn == false) {
        // delete hook
        this.deleteTheHook(this.createdEmailHook.id);
      }
      this.showFirstModal = true;
      this.showSecondModal = false;
      this.clickedDoBtn = false;
    });
  },
  methods: {
    ...mapActions(["createNewHook", "deleteTheHook", "associateTestAndHook"]),
    createAssociationBetweenTestsAndHook(selectedTests) {
      // 点击Do按钮标记
      this.clickedDoBtn = true;

      if (selectedTests.length) {
        selectedTests.forEach(testId => {
          this.associateTestAndHook({
            hookId: this.createdEmailHook.id,
            testId: testId
          });
        });
      }

      this.destroyModal();
    },
    createEmailHook(emailHookParams) {
      this.createNewHook(emailHookParams)
        .then(createdHook => {
          this.createdEmailHook = createdHook;
          this.showFirstModal = false;
          this.showSecondModal = true;
          this.createHookErrorMsg = null;
          this.showCreateHookErr = false;
        })
        .catch(errMsg => {
          this.createHookErrorMsg = errMsg;
          this.showCreateHookErr = true;
        });
    },
    destroyModal() {
      this.$emit("destroy-modal");
    },
    hideModal() {
      this.$refs.myEmailModal.hide();
    },
    showModal() {
      this.$refs.myEmailModal.show();
    },
    getHookDesc() {
      const when = this.createdEmailHook.action.split(/(?=[A-Z])/).join(" ");
      const email = this.createdEmailHook.target;
      const via = `via ${this.createdEmailHook.vias
        .map(via => via.replace("Via", "").toLocaleLowerCase())
        .join(",")}`;
      return when + "· " + email + "· " + via;
    }
  }
};
</script>


<style scoped>
</style>

