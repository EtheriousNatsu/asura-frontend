<template>
    <div>
        <b-row>
            <b-col style="margin-top: 15px; margin-bottom: 15px;">
                <b-nav tabs>
                    <b-nav-item
                        @click="selectTab(tab)"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :active="tab.isActive">
                        {{tab.name}}
                        <small>{{tabCount(tab)}}</small>
                    </b-nav-item>
                </b-nav>
            </b-col>
        </b-row>
        <b-row
            class="text-muted"
            style="margin-bottom: 10px;">
            <b-col
                md="7"
                class="text-truncate">
                <small>
                    <strong>{{result.requestMethod}}</strong>
                    <b-link 
                        class="text-muted"
                        :href="requestUrl"
                        target="_blank">
                        {{requestUrl}}
                    </b-link>
                </small>
            </b-col>
            <b-col 
                md="5"
                class="text-right text-truncate">
                <small>
                    <span>
                        <b-link 
                          :to="{name:'results', params:{runId:result.runId}}"
                          class="text-muted">
                            {{result.runId}}
                        </b-link>
                        ·
                    </span>
                    <span :title="result.timestamp | moment('YYYY-MM-DD, h:mm:ss A')">
                        {{ result.timestamp | moment("from") }}
                    </span>
                </small>
            </b-col>
        </b-row>
        <component 
          :is="selectedTab.component"
          :result="result"
          :type="selectedTab.type"/>
    </div>
</template>


<script>
import StepResultDisplay from "@/components/test/results/child/nav/child/step/StepResultDisplay";
import ResponseDisplay from "@/components/test/results/child/nav/child/http/ResponseDisplay";
import RequestDisplay from "@/components/test/results/child/nav/child/http/RequestDisplay";

const uri = require("jsuri");

export default {
  name: "ResultNav",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  components: {
    StepResultDisplay,
    RequestDisplay,
    ResponseDisplay
  },
  data() {
    return {
      selectedTab: {
        name: "Reponse",
        isActive: true,
        type: "response",
        component: "ResponseDisplay"
      },
      tabs: [
        {
          name: "Reponse",
          isActive: true,
          type: "response",
          component: "ResponseDisplay"
        },
        {
          name: "Request",
          isActive: false,
          type: "request",
          component: "RequestDisplay"
        },
        {
          name: "Setups",
          isActive: false,
          component: "StepResultDisplay",
          type: "setup"
        },
        {
          name: "Teardowns",
          isActive: false,
          component: "StepResultDisplay",
          type: "teardown"
        }
      ]
    };
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    },
    evironment() {
      return this.$store.getters.getEnvironment(
        this.$store.state.env,
        this.$route.params.serviceId
      );
    },
    requestUrl() {
      if (this.result.result != "TestPending") {
        const scheme = this.result.requestScheme.toLowerCase();
        const host = this.result.requestHost;
        const path = this.result.requestPath;
        const query = this.result.requestQuery;

        return new uri()
          .setProtocol(scheme)
          .setHost(host)
          .setPath(path)
          .setQuery(query)
          .toString();
      } else {
        const scheme = (this.test.scheme || this.service.schemes).toLowerCase();
        const host = this.evironment.url;
        const path = this.test.endpoint;

        return new uri()
          .setProtocol(scheme)
          .setHost(host)
          .setPath(path)
          .toString();
      }
    }
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });

      this.selectedTab = selectedTab;
    },
    tabCount(tab) {
      if (tab.name === "Setups") {
        return this.result.setups.length
          ? "(" + this.result.setups.length + ")"
          : null;
      } else if (tab.name === "Teardowns") {
        return this.result.teardowns.length
          ? "(" + this.result.teardowns.length + ")"
          : null;
      }
      return null;
    }
  }
};
</script>



<style scope>
</style>

