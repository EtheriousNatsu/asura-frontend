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
                              :exact="item.exact"
                              @click="selectSettings(item)">
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
                    <component :is="selected"/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>




<script>
import Manage from "@/components/Settings/manage";
import ServiceSettings from "@/components/Settings/ServiceSettings";
import TriggerUrl from "@/components/Settings/TriggerUrl";

export default {
  name: "Settings",
  components: {
    Manage,
    ServiceSettings,
    TriggerUrl
  },
  data() {
    return {
      settingsOptions: [
        {
          text: "Service settings",
          to: { name: "settings" },
          component: "ServiceSettings",
          exact: true
        },
        {
          text: "Trigger URL",
          to: { name: "settings", params: { tab: "trigger" } },
          component: "TriggerUrl",
          exact: false
        },
        {
          text: "Manage",
          to: { name: "settings", params: { tab: "manage" } },
          component: "Manage",
          exact: false
        }
      ],
      selected: "ServiceSettings"
    };
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    }
  },
  methods: {
    selectSettings(item) {
      this.selected = item.component;
    }
  }
};
</script>



<style scoped>
</style>

