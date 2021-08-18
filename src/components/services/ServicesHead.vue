<template>
    <div>
        <b-row class="pt-4">
            <b-col md="6">
                <b-link>
                    <img 
                      class="mr-1 align-baseline" 
                      width="30" 
                      height="30" 
                      :src="service.icon">                    
                </b-link>
                <h4
                  class="d-md-inline-block mw-75 align-middle" 
                  style="margin-top: -10px; ">
                  {{ service.name }} 
                </h4>
            </b-col>
            <b-col 
              md="6"
              class="text-md-right">
              <div>
                <span>
                  <b-link to="#">
                    <i
                      v-b-tooltip.hover :title="'This service is ' + serviceStatus"
                      :class="classObj"
                      style="font-size: 16px;" />
                  </b-link>
                </span>
                <span>
                  <b-dropdown 
                    variant="outline-secondary" 
                    no-caret 
                    right
                    toggle-class="rounded">
                    <template slot="button-content">
                      <i 
                        class="oi oi-plus mr-0" 
                        style="font-size: 12px;" />
                    </template>
                    <b-dropdown-item 
                      @click="createTest">
                        Create basic test
                    </b-dropdown-item>
                    <!-- <b-dropdown-item :to="importUrl">
                      Import new tests
                    </b-dropdown-item> -->
                  </b-dropdown>
                  <b-button 
                    @click="runServiceTestsByDashboard"
                    variant="outline-secondary" 
                    id="services-tooltip">
                    <i 
                      class="oi oi-media-play mr-0" 
                      style="font-size: 12px" />
                    <b-tooltip 
                      target="services-tooltip" 
                      placement="top">
                      <span style="font-size: 13px;">
                        Run tests against {{ currentEnv === 'All' ? 'production' : currentEnv }}
                      </span>
                    </b-tooltip>
                  </b-button>
                </span>
                <b-dropdown 
                  variant="outline-secondary" 
                  right>
                  <template slot="button-content">
                    {{ currentEnv }}
                    <span v-show="currentEnv === 'All'">
                      environments
                    </span>
                  </template>
                  <b-dropdown-header>
                    Show the dashboard for a specific
                    <br>
                    <strong>environment</strong>
                  </b-dropdown-header>
                  <b-dropdown-divider />
                  <b-dropdown-item
                    :style="{backgroundColor:activeColor(env)}"
                    @click="selectEnv(env)"
                    v-for="(env, index) in environments"
                    :key="index"
                    class="text-truncate">
                    {{ env }}
                    <small 
                      class="text-muted"
                      v-show="env === 'All'">
                      <i>(run against production)</i>
                    </small>
                  </b-dropdown-item>
                  <b-dropdown-divider />
                  <b-dropdown-item 
                    :to="{name: 'settings', params: { serviceId: this.$route.params.serviceId }}" 
                    class="text-primary">
                    <small>Create new environment</small>
                  </b-dropdown-item>  
                </b-dropdown>                    
              </div>
            </b-col>
        </b-row>
        <div>
            <br>
            <b-nav tabs>
                <b-nav-item
                    :active="item.name === $route.name"
                    v-for="(item, index) in navTabs" 
                    :key="index"  
                    :to="item.to">
                    <i 
                        class="mr-1 oi" 
                        :class="[item.class]"
                        style="font-size: 12px; color: rgb(129, 138, 145)"></i>
                    {{item.text}}
                </b-nav-item>
      </b-nav>            
        </div>
    </div>
</template>


<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

import { RECORD_ENVIRONMENT } from "@/store/mutation-types";

export default {
  name: "ServiceHead",
  data() {
    return {
      importUrl: "/dashboard/services/import",
      defaultEnv: "All",
      selectedEnv: "",
      active: false
    };
  },
  created() {
    this.RECORD_ENVIRONMENT(this.defaultEnv);
  },
  computed: {
    currentEnv: {
      get() {
        return this.selectedEnv ? this.selectedEnv : this.defaultEnv;
      },
      set(envName) {
        this.selectedEnv = envName;
      }
    },
    // todo:
    environments() {
      const envs = this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .map(item => item.name);

      return ["All"].concat(envs);
    },
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    tests() {
      return this.$store.state.tests.filter(
        test => test.service == this.$route.params.serviceId
      );
    },
    navTabs() {
      const params = { serviceId: this.$route.params.serviceId };

      return [
        {
          to: { name: "services", params: params },
          text: "Overview",
          class: "oi-project",
          name: "services",
        },
        {
          to: { name: "tests", params: params },
          text: "Tests",
          class: "oi-list-rich",
          name: "tests"
        },
        {
          to: { name: "results", params: params },
          text: "Results",
          class: "oi oi-task",
          name: "results"
        },
        {
          to: { name: "monitoring", params: params },
          text: "Monitoring",
          class: "oi-pulse",
          name: "monitoring"
        },
        // {
        //   to: "#",
        //   text: "Deployments",
        //   class: "oi-box"
        // },
        {
          to: { name: "settings", params: params },
          text: "Settings",
          class: "oi-cog",
          name: "settings"
        }
      ];
    },
    serviceStatus() {
      const allTestsLastestResults = this.tests.map(test => {
        const testResults = this.$store.getters.getResults(
          test.id,
          this.$store.state.env
        );
        return testResults.length ? testResults[0] : null;
      });

      // 未运行
      if (allTestsLastestResults.every(result => Object.is(result, null))) {
        return "noRun";
      }

      // 去掉未运行
      const allTestsLastestResults2 = allTestsLastestResults.filter(result => {
        return !Object.is(result, null);
      });

      if (
        allTestsLastestResults2.some(result =>
          Object.is(result.result, "TestPending")
        )
      ) {
        return "pending";
      }
      if (
        allTestsLastestResults2.every(result =>
          Object.is(result.result, "TestPass")
        )
      ) {
        return "passing";
      }

      if (
        allTestsLastestResults2.some(result =>
          Object.is(result.result, "TestFail")
        )
      ) {
        return "failing";
      }
    },
    classObj() {
      return {
        oi: true,
        "oi-media-stop": true,
        "mr-2": true,
        "align-middle": true,
        "text-danger": this.serviceStatus === "failing",
        "text-warning": this.serviceStatus === "pending",
        "text-success": this.serviceStatus === "passing",
        "text-secondary": this.serviceStatus === "noRun"
      };
    }
  },
  methods: {
    ...mapActions(["createBasicTest", "createThisAssertion", "runTests"]),
    ...mapMutations([RECORD_ENVIRONMENT]),
    runServiceTestsByDashboard() {
      const env = this.selectedEnv === "All" ? "production" : this.selectedEnv;

      this.runTests({
        serviceId: Number(this.$route.params.serviceId),
        data: {
          via: "dashboard",
          environment: env
        }
      });
    },
    selectEnv(env) {
      this.selectedEnv = env;
      this.RECORD_ENVIRONMENT(env);
    },
    activeColor(env) {
      return this.selectedEnv === env ? "rgb(236, 238, 239)" : null;
    },
    createTest() {
      const test = {
        service: Number(this.$route.params.serviceId),
        description: null,
        endpoint: "/",
        headers: [],
        method: "GET",
        name: "200 OK",
        params: [],
        requestBody: null,
        scheme: null,
        variables: []
      };

      this.createBasicTest(test).then(newTest => {
        const assertion = {
          comparator: "AssertEquals",
          property: null,
          source: "AssertStatusCode",
          target: "200",
          test: newTest.id
        };

        this.createThisAssertion(assertion).then(newAssertion => {
          this.$router.push({
            name: "test",
            params: {
              serviceId: this.$route.params.serviceId,
              testId: newAssertion.test
            }
          });
        });
      });
    }
  }
};
</script>



<style scoped>
</style>


