<template>
    <div>
        <b-container class="mt-5">
            <b-row>
                <b-col
                    md="4"
                    offset-md="4">
                    <auth-head text="Reset your password" />
                    <auth-form 
                        :showPasswordInput="false"
                        :buttonProperties="{isblock: false, text:'Send password reset email'}"
                        v-on:submit-form="resetPassword"
                        :errorMsgFromBackend.sync="errorMsgFromBackend"/>
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
import AuthForm from "@/components/account/AuthForm";
import AuthFoot from "@/components/account/AuthFoot";

export default {
  name: "PasswordReset",
  components: {
    AuthHead,
    AuthForm,
    AuthFoot
  },
  data() {
    return {
      errorMsgFromBackend: ""
    };
  },
  methods: {
    ...mapActions(["sendEmailToResetPassword"]),
    resetPassword(email) {
      this.sendEmailToResetPassword(email)
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


