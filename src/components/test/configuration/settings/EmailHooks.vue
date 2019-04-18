<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">Email hooks</b-card-header>
        <div class="card-body">
          <div v-if="hooks.length == 0">
            <small>
              Set up a hook to receive emails when tests fail.
              <b-link :to="linkTo">Add one now</b-link>
            </small>
          </div>
          <div
            v-for="hook in hooks" 
            :key="hook.id"
            class="text-truncate">
            <b-form-checkbox
              v-on:input="handleInput($event, hook.id)"
              v-model="hook.isChecked">
              <span>{{hook.type}} - {{hook.action}} - {{hook.target}}</span>
            </b-form-checkbox>
            <br>
            <small 
              style="margin-left: 25px;"
              class="text-muted">
              <span>
                {{hook.tests.length}} tests are enabled for this hook.
                <b-link :to="{name:'emailHook', params:{serviceId: $route.params.serviceId}}">View details</b-link>
              </span>
            </small>
          </div>
        </div>
    </div>
</template>




<script>
import { mapActions } from "vuex";
import { clone } from "@/config/utils";

export default {
  name: "EmailHooks",
  data() {
    return {
      linkTo: {
        name: "emailHook",
        params: { serviceId: this.$route.params.serviceId }
      }
    };
  },
  computed: {
    hooks() {
      const serviceHooks = clone(
        this.$store.state.hooks.filter(
          hook => hook.service == this.$route.params.serviceId
        )
      );

      return serviceHooks.map(hook => {
        if (hook.tests.find(test => test.id == this.$route.params.testId)) {
          // 该用例被定时任务选中
          hook.isChecked = true;
        } else {
          // 该用例没被定时任务选中
          hook.isChecked = false;
        }
        return hook;
      });
    }
  },
  methods: {
    ...mapActions(["associateTestAndHook", "removeAssociateTestAndHook"]),
    handleInput(checked, hookId) {
      if (checked) {
        // 关联用例与hook
        this.associateTestAndHook({
          hookId: hookId,
          testId: this.$route.params.testId
        });
      } else {
        // 取消用例和hook的关联
        this.removeAssociateTestAndHook({
          hookId: hookId,
          testId: this.$route.params.testId
        });
      }
    }
  }
};
</script>



<style scoped>
</style>

