<template>
    <div>
        <b-container class="mt-5">
            <b-row>
                <b-col 
                    md="4" 
                    offset-md="4">
                    <auth-head text="Sign up for Asura"/>
                    <auth-form
                        :buttonProperties="{isblock: true, text:'Create an account'}"
                        v-on:submit-form="register"
                        :errorMsgFromBackend.sync="errorMsgFromBackend"/>
                    <br>
                    <auth-foot
                        text="Have an account?"
                        linkText="Sign in here."
                        to="/login"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>



<script>
import { mapActions } from "vuex";

import AuthHead from "@/components/account/AuthHead";
import AuthFoot from "@/components/account/AuthFoot";
import AuthForm from "@/components/account/AuthForm";

export default {
  name: "Signup",
  components: {
    AuthHead,
    AuthFoot,
    AuthForm
  },
  data() {
    return {
      userInfo: null, //用户信息
      errorMsgFromBackend: "" //后端错误信息
    };
  },
  methods: {
    ...mapActions(["registerAccount"]),
    register(email, password) {
      this.registerAccount({
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


