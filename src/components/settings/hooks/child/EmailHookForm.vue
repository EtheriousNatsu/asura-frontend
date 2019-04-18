<template>
    <b-row style="margin-top: 20px;">
        <b-col md="7">
            <p>
                <i 
                    class="oi oi-list-rich"
                    style="margin-right: 5px; font-size: 12px;"/>Tests
                <small class="text-muted">Enable or disable tests on this hook</small>
            </p>
            <email-hook-tests 
                :emailHook="emailHook"
                :showBtn="false"/>
        </b-col>
        <b-col md="5">
            <p>
                <i 
                    class="oi oi-action-redo"
                    style="margin-right: 5px; font-size: 12px;"/>Settings
                <br>
                <small class="text-muted">Edit this hook's settings</small>
            </p>
            <email-hook-settings 
                :emailHook="emailHook"
                v-on:hide-hookForm="hideHookForm"/>
        </b-col>
        <b-col md="12">
            <br>
        </b-col>
    </b-row>
</template>



<script>
import EmailHookSettings from "./EmailHookSettings";
import EmailHookTests from "./EmailHookTests";

export default {
  name: "EmailHookForm",
  props: {
    emailHook: {
      type: Object,
      required: true
    }
  },
  components: {
    EmailHookSettings,
    EmailHookTests
  },
  methods: {
    hideHookForm() {
      this.$emit("hide-hookForm");
    }
  }
};
</script>


<style scoped>
</style>

