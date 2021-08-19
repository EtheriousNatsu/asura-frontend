<template>
    <b-row style="padding-top:20px;">
        <b-col md="12">
            <b-row>
                <b-col md="3">
                    <b-card header="Settings"
                        no-body>
                        <b-list-group flush>
                            <b-list-group-item 
                              v-for="(item, index) in settingsOptions"
                              :key="index"
                              :to="item.to"
                              :active="$route.name.indexOf(item.to.name) !== -1">
                                {{ item.text }}
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                    <!-- <div v-if="selected === 'TriggerUrl'">
                      <span />
                      <span>
                        <small>
                          <strong>API token</strong>
                          <span class="text-muted">(private)</span>
                          <br>
                          <code>{{$store.state.token}}</code>
                        </small>
                      </span>
                      <br>
                      <span>
                        <small>
                          <strong>Service ID</strong>
                          <br>
                          <code>{{service.id}}</code>
                        </small>
                      </span>
                      <hr>
                    </div> -->
                </b-col>
                <b-col md="9">
                  <service-settings 
                    v-if="$route.name == 'settings'"/>
                  <router-view v-else/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>




<script>
import ServiceSettings from "@/components/Settings/ServiceSettings";

export default {
  name: "Settings",
  components: {
    ServiceSettings
  },
  data() {
    return {
      settingsOptions: [
        {
          text: "Service settings",
          to: { name: "settings" },
        },
        {
          text: "Hooks & Alerts",
          to: { name: "alerts" },
        },
        {
          text: "Trigger URL",
          to: { name: "trigger" },
        },
        {
          text: "Manage",
          to: { name: "manage" },
        }
      ]
    };
  }
};
</script>



<style scoped>
</style>

