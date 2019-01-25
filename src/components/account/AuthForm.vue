<template>
    <div>
        <b-form @submit.stop.prevent="validateBeforeSubmit">
            <b-alert 
                :show="showDismissibleAlert"
                variant="danger">
                    <span v-show="errors.has('email')">
                        {{  errors.first('email')  }}
                    </span>
                    <span v-show="errors.has('password')">
                        {{  errors.first('password')  }}
                    </span>
                    <span v-show="errors.has('auth')">
                        {{  errors.first('auth')  }}
                    </span>
            </b-alert>
            <b-form-group
                id="emailInputGroup"
                label="Email:"
                label-for="emailInput">
                <b-form-input 
                    id="emailInput"
                    name="email"
                    v-model="email"
                    type="text"
                    placeholder="Enter your email"
                    autocomplete="on"
                    @input="clearErrorMsg"
                    v-validate="'required|email'"></b-form-input>
            </b-form-group>

            <b-form-group
                id="passwordInputGroup"
                label="Password:"
                label-for="passwordInput" v-if="showPasswordInput">
                <b-form-input
                    id="passwordInput"
                    name="password"
                    v-model="password"
                    type="password"
                    placeholder="Enter your password"
                    @input="clearErrorMsg"
                    autocomplete="on"
                    v-validate="'required|min:6|max:8'"></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button 
                    type="submit" 
                    variant="primary" 
                    :block="buttonProperties.isblock"> {{ buttonProperties.text }} </b-button>
                    <small 
                        class="float-md-right" 
                        v-if="showLinkText">
                        <br>
                        <b-link :to="linkTextProperties.to">{{ linkTextProperties.linkText }}</b-link>

                    </small>
            </b-form-group>
        </b-form>
    </div>    
</template>





<script>
export default {
  name: "AuthForm",
  props: {
    errorMsgFromBackend: {
      type: String,
      default: ""
    },
    showPasswordInput: {
      type: Boolean,
      default: true
    },
    buttonProperties: {
      type: Object,
      validator: o => {
        return ["isblock", "text"].every(v => {
          return Object.keys(o).includes(v);
        });
      }
    },
    showLinkText: {
      type: Boolean,
      default: false
    },
    linkTextProperties: {
      type: Object,
      validator: o => {
        return ["linkText", "to"].every(v => {
          return Object.keys(o).includes(v);
        });
      },
      required: false
    }
  },
  data() {
    return {
      email: "",
      password: ""
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
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit("submit-form", this.email, this.password);
        }
      });
    },
    clearErrorMsg() {
      this.$nextTick(() => {
        this.$emit("update:errorMsgFromBackend", "");
        this.errors.clear();
      });
    }
  }
};
</script>



<style scoped>
</style>


