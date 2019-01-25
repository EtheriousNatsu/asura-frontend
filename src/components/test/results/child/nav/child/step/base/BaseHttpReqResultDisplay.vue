<template>
    <span>
        <div>
          <div style="margin-top: -10px;">
            <p class="text-truncate">
              <small>
                <strong class="text-muted">
                  {{stepResult.requestMethod}}
                </strong>
                <b-link
                  class="text-muted"
                  :href="requestUrl"
                  target="_blank">
                  {{requestUrl}}
                </b-link>
              </small>
            </p>
            <b-nav pills>
              <b-nav-item 
                @click="selectTab(tab)"
                v-for="(tab, index) in tabs"
                :key="index"
                :active="tab.isActive">
                <small>{{tab.name}}</small>
              </b-nav-item>
            </b-nav>
            <component 
              :is="currentComponent"
              :stepResult="stepResult"/>
          </div>
        </div>
    </span>
</template>




<script>
import ResponseDisplay from "@/components/test/results/child/nav/child/step/base/ResponseDisplay";
import RequestDisplay from "@/components/test/results/child/nav/child/step/base/RequestDisplay";

import VariablesDisplay from "@/components/test/results/child/nav/child/step/base/VariablesDisplay";

const uri = require("jsuri");

export default {
  name: "BaseHttpReqResultDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  components: {
    ResponseDisplay,
    VariablesDisplay,
    RequestDisplay
  },
  data() {
    return {
      currentComponent: "VariablesDisplay",
      tabs: [
        {
          name: "Variables",
          isActive: true,
          component: "VariablesDisplay"
        },
        {
          name: "Response",
          isActive: false,
          component: "ResponseDisplay"
        },
        {
          name: "Request",
          isActive: false,
          component: "RequestDisplay"
        }
      ]
    };
  },
  computed: {
    requestUrl() {
      const scheme = this.stepResult.requestScheme;
      const host = this.stepResult.requestHost;
      const path = this.stepResult.requestPath;
      const query = this.stepResult.requestQuery;

      return new uri()
        .setProtocol(scheme)
        .setHost(host)
        .setPath(path)
        .setQuery(query)
        .toString();
    }
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });

      this.currentComponent = selectedTab.component;
    }
  }
};
</script>


<style scoped>
</style>

