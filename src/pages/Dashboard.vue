<template>
  <div>
    <keep-alive>
      <dashboard-head/>
    </keep-alive>
    <b-container 
      v-if="showServices && services.length">
      <b-row>
        <b-col 
          md="6" 
          class="mt-4 mb-4">
          <h2>Services</h2>
        </b-col>
        <b-col md="12">
          <!-- <b-row>
            <b-col md="9">
              <b-row>
                <b-col md="7">
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <i class="oi oi-magnifying-glass"></i>
                    </b-input-group-prepend>
                    <b-form-input name="serviceTestsSearch" placeholder="Search services..."></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col md="5">
                  <b-link
                    to="#"
                    style="margin-right: 5px; vertical-align: sub; color: rgb(55, 58, 60);"
                  >
                    <i class="oi oi-project" style="font-size: 12px;"/>
                    <strong>All services</strong>
                  </b-link>

                  <b-link
                    to="#"
                    class="text-muted"
                    style="vertical-align: sub; color: rgb(129, 138, 145);"
                  >
                    <i class="oi oi-circle-x" style="font-size: 12px;"/>
                    <strong>Failing services</strong>
                  </b-link>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="3" class="text-md-right">
              <b-button variant="outline-success" to="/dashboard/services/new">New web service</b-button>
            </b-col>
          </b-row> -->
        </b-col>

        <b-col md="12" class="mt-2 mb-2"></b-col>

        <b-col md="12">
          <div 
            style="margin-bottom: .75rem;"
            v-for="(service, index) in services" 
            :key="index"
            class="card">
            <div class="card-block">
              <div class="card-title">
                <b-row>
                  <b-col md="9">
                    <h4>
                      <img
                        width="20"
                        height="20"
                        :src="service.icon"
                        style="margin-right: 5px; vertical-align: unset; margin-bottom: -3px;">
                      <b-link :to="{name: 'services', params: {serviceId: service.id}}">
                        <strong>{{service.name}}</strong>
                      </b-link>
                    </h4>
                  </b-col>
                  <!-- <b-col md="3" class="text-md-right">
                    <b-button variant="outline-primary">
                      Run tests
                      <i
                        class="oi oi-media-play"
                        style="margin-right: 0px; font-size: 12px; margin-left: 5px;"
                      />
                    </b-button>
                  </b-col> -->
                </b-row>
              </div>

              <div class="card-text">
                <b-row>
                  <b-col 
                    md="4" 
                    style="margin-top: 10px;">
                    <div>
                      <p
                        style="margin-bottom: 10px;" 
                        class="text-muted">
                        <small>
                          <i 
                            class="oi oi-pulse" 
                            style="margin-right: 5px; font-size: 12px;"></i>
                          <strong>Test runs</strong>
                        </small>
                      </p>
                    </div>
                  </b-col>
                  <b-col 
                    md="4" 
                    offset-md="1" 
                    style="margin-top: 10px;">
                    <p
                      style="margin-bottom: 10px;" 
                      class="text-muted">
                      <small>
                        <i 
                          class="oi oi-layers" 
                          style="margin-right: 5px; font-size: 12px;"/>
                        <strong>Environments</strong>
                      </small>
                    </p>
                    <div>
                      <b-link 
                        :to="getTo(service.id, environment.name)"
                        v-for="(environment, index) in getEnvironments(service.id)" 
                        :key="index"
                        style="margin-right: 10px;">
                        <i 
                          class="oi oi-media-record" 
                          :style="getStyleObj(environment.name, service.id)"/>{{environment.name}}
                      </b-link>
                    </div>
                  </b-col>
                  <b-col 
                    md="3" 
                    style="margin-top: 35px;"
                    class="mt-4 text-right">
                    <div>
                      <small>
                        <b-link 
                          :to="{name:'tests', params: {serviceId: service.id}}" 
                          style="color:#373a3c;">
                          Configure tests
                          <i
                            class="oi oi-list-rich"
                            style="margin-right: 0px; font-size: 12px; margin-left: 10px;"
                          ></i>
                        </b-link>
                      </small>
                    </div>
                    <div style="margin-bottom: 5px;">
                      <small>
                        <b-link 
                          :to="{name: 'settings', params: {serviceId: service.id}}" 
                          style="color:#373a3c;">
                          Manage service
                          <i
                            class="oi oi-cog"
                            style="margin-right: 0px; font-size: 12px; margin-left: 10px;"
                          ></i>
                        </b-link>
                      </small>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <br>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <service-new v-if="showServices && services.length === 0"/>
    <router-view/>
    <keep-alive>
      <dashboard-foot/>
    </keep-alive>
  </div>
</template>



<script>
import { mapMutations } from "vuex";
import store from "@/store";

import {
  CREATE_RESULT,
  CREATE_SUITE,
  UPDATE_SCHEDULE
} from "../store/mutation-types";

import DashboardHead from "@/components/dashboard/dashboardHead";
import DashboardFoot from "@/components/dashboard/DashboardFoot";
import ServiceNew from "@/components/services/ServicesNew";

export default {
  name: "Dashboard",
  components: {
    DashboardHead,
    DashboardFoot,
    ServiceNew
  },
  data() {
    return {
      webSocket: null
    };
  },
  computed: {
    services() {
      return this.$store.getters.getServices();
    },
    showServices() {
      return this.$route.path === "/dashboard";
    },
    environmentIconStyle() {
      return {
        color: "rgb(129, 138, 145)",
        marginRight: "5px",
        fontSize: "10px",
        verticalAlign: "initial"
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    // ...
    const p1 = store.dispatch("getAllServices");
    const p2 = store.dispatch("getAllEnvironments");
    const p3 = store.dispatch("getAllTests");
    const p4 = store.dispatch("getAllSetups");
    const p5 = store.dispatch("getAllTeardowns");
    const p6 = store.dispatch("getAllAssertions");
    const p7 = store.dispatch("getAllResults");
    const p8 = store.dispatch("getAllRuns");
    const p9 = store.dispatch("getAllSchedules");
    const p10 = store.dispatch("getAllHooks");
    Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]).then(() => next());
  },
  created() {
    this.initWebSocket();
  },
  watch: {
    // 临时处理
    $route: function(newRoute, oldRoute) {
      if (newRoute.name === "dashboard") {
        const p1 = store.dispatch("getAllServices");
        const p2 = store.dispatch("getAllEnvironments");
        const p3 = store.dispatch("getAllTests");
        const p4 = store.dispatch("getAllSetups");
        const p5 = store.dispatch("getAllTeardowns");
        const p6 = store.dispatch("getAllAssertions");
        const p7 = store.dispatch("getAllResults");
        const p8 = store.dispatch("getAllRuns");
        const p9 = store.dispatch("getAllSchedules");
        const p10 = store.dispatch("getAllHooks");
        Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]);
      }
    }
  },
  methods: {
    ...mapMutations([CREATE_RESULT, CREATE_SUITE, UPDATE_SCHEDULE]),
    initWebSocket() {
      const wsUri = "ws://0.0.0.0:8000/ws/asura/" + this.$store.state.token + "/";
      this.webSocket = new WebSocket(wsUri);

      this.webSocket.onopen = this.webSocketOnOpen;
      this.webSocket.onmessage = this.webSocketOnMessage;
      this.webSocket.onerror = this.webSocketOnError;
      this.webSocket.onclose = this.webSocketOnClose;
    },
    webSocketOnOpen() {
      console.log("WebSocket连接成功");
    },
    webSocketOnError() {
      this.initWebSocket();
    },
    webSocketOnMessage(e) {
      const data = JSON.parse(e.data);
      const message = JSON.parse(data["message"]);

      if (data.type === "case") {
        this.recoreResult(message);
      } else if (data.type === "suite") {
        this.recordSuite(message);
      } else if (data.type === "schedule") {
        this.updateSchedule(message);
      }
    },
    webSocketOnClose(e) {
      console.log("断开WebSocket连接", e);
    },
    recoreResult(result) {
      this.CREATE_RESULT(result);
    },
    recordSuite(suite) {
      this.CREATE_SUITE(suite);
    },
    updateSchedule(schedule) {
      this.UPDATE_SCHEDULE(schedule);
    },
    getTo(serviceId, envName) {
      const runs = this.$store.getters.getRuns(serviceId, envName);
      let runId = null;

      if (runs.length) {
        runId = runs[0].name;
      }

      return {
        name: "results",
        params: {
          serviceId: serviceId,
          runId: runId
        }
      };
    },
    getTests(serviceId) {
      return this.$store.state.tests.filter(test => test.service == serviceId);
    },
    getEnvironments(serviceId) {
      return this.$store.getters.getEnvironments(serviceId);
    },
    getServiceStatusOnEnv(envName, serviceId) {
      const tests = this.getTests(serviceId);

      const allTestsLastestResults = tests.map(test => {
        const testResults = this.$store.getters.getResults(test.id, envName);
        return testResults.length ? testResults[0] : null;
      });

      // 未运行
      if (allTestsLastestResults.every(result => Object.is(result, null))) {
        return "noRun";
      }

      // 去掉未运行
      const allTestsLastestResults2 = allTestsLastestResults.filter(
        result => result
      );

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
    getStyleObj(envName, serviceId) {
      // 没有运行过
      let color = "#6c757d";
      const serviceStatus = this.getServiceStatusOnEnv(envName, serviceId);

      if (serviceStatus === "pending") {
        color = "rgb(240, 173, 78)";
      } else if (serviceStatus === "failing") {
        color = "rgb(217, 83, 79)";
      } else if (serviceStatus === "passing") {
        color = "rgb(92, 184, 92)";
      }
      return {
        marginRight: "5px",
        fontSize: "10px",
        color: color,
        verticalAlign: "initial"
      };
    }
  }
};
</script>


<style scoped>
.card .card-block {
  padding: 1.25rem;
}
</style>


