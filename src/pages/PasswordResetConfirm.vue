<template>
    <div>
        <b-container class="mt-5">
            <b-row>
                <b-col
                    md="4"
                    offset-md="4">
                    <auth-head text="Change your password"/>

                    <b-form @submit.stop.prevent="validateBeforeSubmit">
                        <b-alert 
                            :show="showDismissibleAlert"
                            variant="danger">
                                <span v-show="errors.has('password1')">
                                    {{  errors.first('password1')  }}
                                </span>
                                <span v-show="errors.has('password2')">
                                    {{  errors.first('password2')  }}
                                </span>
                                <span v-show="errors.has('auth')">
                                    {{  errors.first('auth')  }}
                                </span>
                        </b-alert>
                        <b-form-group
                            id="password1InputGroup"
                            label="New Password:"
                            label-for="password1Input">
                            <b-form-input 
                                id="password1Input"
                                name="password1"
                                ref="password1"
                                v-model="password1"
                                type="password"
                                autocomplete="on"
                                @input="clearErrorMsg"
                                v-validate="'required|min:6|max:8'"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            id="password2InputGroup"
                            label="Comfirm Password:"
                            label-for="password2Input">
                            <b-form-input 
                                id="password2Input"
                                name="password2"
                                v-model="password2"
                                type="password"
                                autocomplete="on"
                                @input="clearErrorMsg"
                                v-validate="'required|min:6|max:8|confirmed:password1'"></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-button 
                                type="submit" 
                                variant="primary"> Save new password </b-button>
                        </b-form-group>                     
                    </b-form>

                    <auth-foot
                        text="Need an account?"
                        linkText="Sign up here."
                        to="/signup"/>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>





<script>
import { mapActions } from "vuex";

import AuthHead from "@/components/account/AuthHead";
import AuthFoot from "@/components/account/AuthFoot";

export default {
  name: "PasswordResetConfirm",
  components: {
    AuthHead,
    AuthFoot
  },
  data() {
    return {
      password1: "",
      password2: "",
      errorMsgFromBackend: ""
    };
  },
  computed: {
    showDismissibleAlert() {
      if (this.errorMsgFromBackend && !this.errors.has("auth")) {
        this.errors.add({
          field: "auth",
          msg: this.errorMsgFromBackend
        });
      }
      return this.errors.count() ? true : false;
    }
  },
  methods: {
    ...mapActions(["changePassword"]),

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.changeThePassword();
        }
      });
    },

    clearErrorMsg() {
      this.$nextTick(() => {
        this.errorMsgFromBackend = "";
        this.errors.clear();
      });
    },

    changeThePassword() {
      this.changePassword({
        password1: this.password1,
        password2: this.password2,
        params: this.$route.params
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errorMsgFromBackend = error.message;
        });
    }
  }
};
</script>




<style scoped>
</style>


