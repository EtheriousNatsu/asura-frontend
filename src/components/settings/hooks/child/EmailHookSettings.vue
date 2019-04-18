<template>
    <div>
        <b-row>
            <b-col md="12">
                <b-form-group>
                    <template slot="label">
                        <label style="padding:0rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">
                            Send email when
                        </label>
                    </template>
                    <b-form-select
                        v-model="computedWhen"
                        :options="whenOptions"
                        required>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group
                    :invalid-feedback="errors.first('email')"
                    :state="!errors.has('email')">
                    <template>
                        <label style="padding:0rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">
                            Send email to
                        </label>
                    </template>
                    <b-form-input 
                        v-validate="'required|email'"
                        name="email"
                        v-model="computedEmail" 
                        data-vv-validate-on="input"
                        :state="errors.has('email') ? false : null"/>
                    
                </b-form-group>
            </b-col>
            <b-col md="12">
                <label style="padding:0rem .75rem;margin-bottom:0; color:rgb(33, 37, 41);">When test runs are via</label>
                <div style="padding:0rem .75rem;margin-top: 5px; margin-bottom: 25px;">
                    <b-form-checkbox-group
                      name="checkboxGroup"
                      v-validate="'required'"
                      v-model="selected"
                      :options="viasOpts"
                      stacked />
                      <br>
                      <span
                        v-if="errors.has('checkboxGroup')"
                        style="color: red; width: 100%;">
                        At least one via must be configured
                      </span>
                </div>
            </b-col>
            <b-col 
              v-if="emailHook"
              md="12">
                <b-btn 
                    @click="cancelUpdateEmailHook"
                    variant="outline-secondary">
                    Cancel
                </b-btn>
                <b-btn
                  @click="updateHookSetting"
                  class="float-right"
                  variant="primary">
                  Update hook
                </b-btn>
            </b-col>
            <b-col 
              v-else
              md="12">
                <b-btn 
                  @click="cancelCreatEmailHook"
                  variant="outline-secondary">
                  Cancel
                </b-btn>
                <b-btn
                  @click="createEmailHook"
                  class="float-right"
                  variant="primary">
                  Create hook
                </b-btn>
            </b-col>
        </b-row>
    </div>
</template>



<script>
import { mapActions } from "vuex";
import { sendEmailOpts, viasOpts } from "@/constant/hooks";

export default {
  name: "EmailHookSettings",
  props: {
    emailHook: {
      type: Object
    }
  },
  mounted() {
    if (this.emailHook) {
      this.selected = this.emailHook.vias;
    } else {
      this.selected = ["ViaTrigger", "ViaSchedule", "ViaDashboard"];
    }
  },
  data() {
    return {
      whenOptions: sendEmailOpts,
      defaultWhen: "OnTestFailure",
      selectedWhen: "",
      defaultEmail: this.$store.state.userInfo.username,
      inputedEmail: null,
      selected: null,
      viasOpts: viasOpts
    };
  },
  computed: {
    computedWhen: {
      get() {
        if (this.selectedWhen) {
          return this.selectedWhen;
        } else if (this.emailHook) {
          return this.emailHook.action;
        }
        return this.defaultWhen;
      },
      set(when) {
        this.selectedWhen = when;
      }
    },
    computedEmail: {
      get() {
        if (!Object.is(this.inputedEmail, null)) {
          return this.inputedEmail;
        } else if (this.emailHook) {
          return this.emailHook.target;
        }
        return this.defaultEmail;
      },

      set(email) {
        this.inputedEmail = email;
      }
    }
  },
  methods: {
    ...mapActions(["updateThisHook"]),
    updateHookSetting() {
      const hook = {
        action: this.computedWhen,
        service: this.$route.params.serviceId,
        target: this.computedEmail,
        id: this.emailHook.id,
        type: "EmailHook",
        vias: this.selected
      };
      this.updateThisHook(hook).then(() => this.cancelUpdateEmailHook());
    },
    cancelUpdateEmailHook() {
      this.$emit("hide-hookForm");
    },
    createEmailHook() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit("create-emailHook", {
            action: this.computedWhen,
            service: this.$route.params.serviceId,
            target: this.computedEmail,
            type: "EmailHook",
            vias: this.selected
          });
        }
      });
    },
    cancelCreatEmailHook() {
      this.$emit("destroy-modal");
    }
  }
};
</script>


<style scoped>
</style>

