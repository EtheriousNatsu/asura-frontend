<template>
  <b-list-group-item>
    <div>
      <strong>Email {{emailHook.target}}</strong>
      - 
      <small><i>Send email when test {{getHookActionDes()}}</i></small>
      <span class="float-right">
        <i 
          @click="showOrHideHookForm"
          v-b-tooltip.hover title="Edit hook"
          class="oi oi-pencil"
          style="margin-right: 5px; font-size: 12px; cursor: pointer;"/>
        <b-link class="text-dark">
          <i 
            @click="deleteTheHook(emailHook.id)"
            class="oi oi-trash"
            style="margin-right: 5px; font-size: 12px;"
            v-b-tooltip.hover title="Delete test hook"/>
        </b-link>
      </span>
      <div>
        <small>
          This hook executes for test runs via:
          <span>
            <span v-if="emailHook.vias.includes('ViaSchedule')">
              Schedules,
            </span>
            <del 
              v-else
              class="text-mute">
              Schedules,
            </del>
            <span v-if="emailHook.vias.includes('ViaTrigger')">
              Trigger URLs,
            </span>
            <del 
              class="text-mute"
              v-else>
              Trigger URLs,
            </del>
            <span v-if="emailHook.vias.includes('ViaDashboard')">
              Dashboard
            </span>
            <del
              v-else
              class="text-mute">
              Dashboard
            </del>
          </span>
        </small>
        <br>
        <small>Enabled tests: {{emailHook.tests.length}}</small>
      </div>
    </div>
    <email-hook-form 
      v-if="showHookForm"
      :emailHook="emailHook"
      v-on:hide-hookForm="showOrHideHookForm"/>
  </b-list-group-item>
</template>



<script>
import { mapActions } from "vuex";
import EmailHookForm from "./EmailHookForm";

export default {
  name: "EmailHookDisplay",
  props: {
    emailHook: {
      type: Object,
      required: true
    }
  },
  components: {
    EmailHookForm
  },
  data() {
    return {
      showHookForm: false
    };
  },
  methods: {
    ...mapActions(["deleteTheHook"]),
    showOrHideHookForm() {
      this.showHookForm = !this.showHookForm;
    },
    getHookActionDes() {
      return this.emailHook.action == "OnTestFailure"
        ? "runs fail"
        : "runs complete";
    }
  }
};
</script>


<style scoped>
</style>

