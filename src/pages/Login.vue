<template>
    <div>
        <b-container>
            <b-alert 
                :show="show" 
                dismissible 
                variant="primary"
                class="mt-3"
                @dismissed="closeAlert">
                {{ text }}
            </b-alert>
        </b-container>
        <b-container class="mt-5">
            <b-row>
                <b-col 
                    md="4" 
                    offset-md="4">
                    <auth-head text="Sign in to Asura"/>
                    <auth-form 
                        :buttonProperties="{isblock: false, text:'Sign in'}"
                        :showLinkText='true'
                        :linkTextProperties="{linkText: 'Reset your password', to: '/account/resetpassword'}"
                        v-on:submit-form="login"
                        :errorMsgFromBackend.sync="errorMsgFromBackend"/>
                    <auth-foot
                        text="Need an account?"
                        linkText="Create one here."
                        to="/signup"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>




<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

import AuthHead from "@/components/account/AuthHead";
import AuthFoot from "@/components/account/AuthFoot";
import AuthForm from "@/components/account/AuthForm";

import {
  SEND_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD
} from "../store/mutation-types";

export default {
  name: "Login",
  components: {
    AuthHead,
    AuthFoot,
    AuthForm
  },
  data() {
    return {
      errorMsgFromBackend: "",
      show: false,
      text: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.includes("dashboard") && !vm.$store.state.token) {
        vm.show = true;
        vm.text = "You are now logged out";
      }

      if (vm.$store.state.emailForResetPassword) {
        vm.show = true;
        vm.text = `An email to reset your password has been sent to 
        ${vm.$store.state.emailForResetPassword}`;
      }

      if (vm.$store.state.isResetPassword) {
        vm.show = true;
        vm.text = "You have reset your password";
      }

      next();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.closeAlert();
    next();
  },
  methods: {
    ...mapActions(["emailLogin"]),
    ...mapMutations([SEND_RESET_PASSWORD_EMAIL, RESET_PASSWORD]),
    closeAlert() {
      //让发送邮件提示只显示一次
      if (this.$store.state.emailForResetPassword) {
        this.SEND_RESET_PASSWORD_EMAIL(null);
      }

      //让重置密码提示只显示一次
      if (this.$store.state.isResetPassword) {
        this.RESET_PASSWORD(false);
      }
    },
    login(email, password) {
      this.emailLogin({
        email: email,
        password: password
      })
        .then(() => {
          this.$router.push("/dashboard");
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


