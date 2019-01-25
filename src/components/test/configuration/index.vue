<template>
        <b-col md="6">
          <h4>Configure</h4>
          <b-card
            class="test-card"
            no-body>
                <b-nav 
                  class="test-card-header-tabs"
                  tabs
                  slot="header">
                  <b-nav-item
                    style="font-size:12px; font-weight:700"
                    :active="currentTab == tab"
                    @click="currentTab = tab"
                    v-for="(tab, index) in tabs"
                    :key="index">
                    {{ tab }}
                    <small v-if="showSetupsCount(tab)"><strong>({{ setups.length }})</strong></small>
                    <small v-if="showTeardownsCount(tab)"><strong>({{ teardowns.length }})</strong></small>
                    <small v-if="showAssertionsCount(tab)"><strong>({{ assertions.length }})</strong></small>
                  </b-nav-item>
                </b-nav>

                <component 
                  v-bind:is="currentTabComponent" 
                  v-on:switch-to-setup="currentTab = 'Setups'"/>
          </b-card>


        </b-col>        
</template>


<script>
import Request from "./request";
import Setups from "./step/setups";
import Teardowns from "./step/teardowns";
import Assertions from "./assertions";
import Settings from "./Settings";

export default {
  name: "Configuration",
  components: {
    Request,
    Setups,
    Teardowns,
    Assertions,
    Settings
  },
  data() {
    return {
      currentTab: "Request",
      tabs: ["Request", "Setups", "Teardowns", "Assertions", "Settings"]
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    },
    setups() {
      return this.$store.state.steps ? this.$store.state.steps.setups : [];
    },
    teardowns() {
      return this.$store.state.steps ? this.$store.state.steps.teardowns : [];
    },
    assertions() {
      return this.$store.getters.getAssertions(this.$route.params.testId);
    }
  },
  methods: {
    showSetupsCount(tab) {
      return this.setups.length && tab === "Setups" ? true : false;
    },
    showTeardownsCount(tab) {
      return this.teardowns.length && tab === "Teardowns" ? true : false;
    },
    showAssertionsCount(tab) {
      return this.assertions.length && tab === "Assertions" ? true : false;
    }
  }
};
</script>


<style>
.test-card .test-card-header-tabs {
  margin-right: -0.625rem;
  margin-bottom: -0.75rem;
  margin-left: -0.625rem;
  border-bottom: 0;
}
</style>


