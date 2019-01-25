<template>
  <main class="container">
    <services-head />
    <div v-show="showOverview">
      <b-row class="pt-4">
        <b-col md="12">
          <b-row>
            <b-col md="6">
              <p class="text-muted">
                <span>
                  <i 
                    class="oi oi-eye mr-1" 
                    style="font-size: 12px"></i>At a glance
                </span>
              </p>
              <b-row class="text-md-center">
                <b-col md="6">
                  <h4>{{serviceAverageResponseTime}}</h4>
                  <small class="text-muted">average response time</small>
                  <hr>
                </b-col>
                <b-col md="6">
                  <h4>{{serviceAveragePassRate}}</h4>
                  <small class="text-muted">average pass rate</small>
                  <hr>
                </b-col>
                <b-col md="6">
                  <h4>{{ testCount }}</h4>
                  <small class="text-muted">total tests</small>
                </b-col>
                <b-col md="6">
                  <h4>{{ endpointCount }} </h4>
                  <small class="text-muted">service endpoints</small>
                </b-col>
              </b-row>       
            </b-col>
            <!-- chartJs -->
            <b-col md="6">
              <p class="text-muted">
                <span>
                  <i 
                    class="oi oi-signal"
                    style="margin-right: 5px; font-size: 12px;"/>
                    12 hour failures
                </span>     
              </p>
              <div 
                v-if="lastest12HoursFailedAssertions.every(item => Object.is(item, null))"
                style="position: absolute; margin: 0px auto; width: 200px; right: 0px; left: 0px; top: 50%; text-align: center;">
                <small class="valign text-muted">
                  No failures in the last 12 hours
                </small>
              </div>
              <base-bar-chart 
                :height="149"
                :width="540"
                :chartData="barChartData"
                :options="barOptions"/>
            </b-col>
          </b-row>
          <br>
          <br>
        </b-col>
        <b-col md="6">
          <div class="text-muted">
            <span>
              <i
                class="oi oi-list-rich mr-1"
                style="font-size: 12px" />Tests
            </span>
          </div>
          <br>
          <div v-if="Object.keys(tests).length">
            <b-card 
              no-body
              class="mb-3"
              v-for="(tests, endpoint, index) in tests"
              :key="index">
              <b-card-header>
                <b-row>
                  <b-col 
                    md="9"
                    class="text-truncate">
                    {{ endpoint }}
                  </b-col>
                  <b-col 
                    md="3"
                    class="text-md-right">
                    <span :id="'leftoverviewtip' + index">
                      <b-link @click="runTestsByDashboard(endpoint)">
                        <i 
                          class="oi oi-media-play mr-1" 
                          style="font-size: 12px" />
                      </b-link>
                      <b-tooltip :target="'leftoverviewtip' + index">
                        Run tests for this endpoint
                      </b-tooltip>
                    </span>
                    <span :id="'rightoverviewtip' + index">
                      <b-link @click="createTestForThisEndpoint(endpoint)">
                        <i 
                          class="oi oi-plus mr-1" 
                          style="font-size: 12px" />
                      </b-link>
                      <b-tooltip :target="'rightoverviewtip' + index">
                        Add a test for this endpoint
                      </b-tooltip>
                    </span>
                  </b-col>
                </b-row>
              </b-card-header>
              <b-list-group flush>
                <b-list-group-item 
                  :to="{name: 'test', params:{serviceId: $route.params.serviceId, testId: test.id}}" 
                  :class="[isFailedTest(test.id) ? 'list-group-item-danger' : '', 'text-primary', 'text-truncate', 'd-flex', 'justify-content-between', 'align-items-center']"
                  v-for="(test, index) in tests"
                  :key="index">
                  {{ test.name }}
                  <b-badge 
                    v-if="showTestStatus(test.id)"
                    :variant="getTestStatusVariant(test.id)">
                    {{getTestStatusDesc(test.id)}}
                  </b-badge>
                </b-list-group-item>              
              </b-list-group>
            </b-card>
          </div>
          <div v-else>
            <b-card style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
              <p class="text-md-center">
                <i
                  class="oi oi-list-rich"
                  style="font-size: 1.5rem; color: rgb(129, 138, 145);" />
              </p>
              <p class="text-md-center">
                Your service doesn't have any tests.
              </p>

            </b-card>
          </div>

          
        </b-col>

        <b-col md="6">
          <div>
            <div class="text-muted">
              <span>
                <i class="oi oi-audio-spectrum" style="margin-right: 5px; font-size: 12px;"/>Latest activity
              </span>
            </div>
            <br>
            <div v-if="runs.length">
              <test-runs :runs="runs"/>
            </div>
            <b-card 
              v-else
              style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
              <p class="text-center">
                <i class="oi oi-task" style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
              </p>
              <p class="text-center">You don't have any test results yet.</p>
            </b-card>
          </div>
        </b-col>
      </b-row>

    </div>

    <router-view></router-view>
  </main>
</template>



<script>
import { mapActions } from "vuex";
import ServicesHead from "@/components/services/ServicesHead";
import TestRuns from "@/components/results/TestRuns";

import BaseBarChart from "@/components/base/BaseBarChart";

export default {
  name: "DashboardServices",
  components: {
    ServicesHead,
    TestRuns,
    BaseBarChart
  },
  data() {
    return {
      lastest12HoursArray: [],
      startDateTimestamp: 0,
      endDateTimestamp: 0,
      barOptions: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: (array, data) => {
              const xLabel = array[0].xLabel;
              return this.getTooltipTitle(xLabel);
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                callback: (value, index, values) => {
                  if (Math.floor(value) === value) {
                    return value;
                  }
                }
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false // x轴网格线不显示
              }
            }
          ]
        },
        onClick: (event, array) => {
          if (array.length) {
            const xLabel = array[0]._model.label;
            this.onClickForBarItem(xLabel);
          }
        },
        onHover: (event, chartElements) => {
          event.target.style.cursor = chartElements[0] ? "pointer" : "default";
        }
      }
    };
  },
  mounted: function() {
    this.getLastest12Hours();

    this.$nextTick(function() {
      // 5min 刷新一次
      setInterval(this.getLastest12Hours, 300000);
    });
  },

  computed: {
    barChartData() {
      return {
        labels: this.lastest12HoursArray,
        datasets: [
          {
            label: "Failed assertions",
            backgroundColor: "rgb(217, 83, 79)",
            data: this.lastest12HoursFailedAssertions
          }
        ]
      };
    },
    stepSize() {
      return this.lastest12HoursFailedAssertions.length ? null : 1;
    },
    lastest12HoursFailedAssertions() {
      const data = {};
      const lastest12HoursFailedAssertionsArray = [];

      this.runs.forEach(run => {
        const runFailedResults = this.$store.getters
          .getRunTestsResults(run.id)
          .filter(result => {
            // 只取失败的
            return result.result === "TestFail";
          })
          .filter(result => {
            // 只取当前时段的
            const resultTimestamp = new Date(result.timestamp).getTime();
            return (
              resultTimestamp >= this.startDateTimestamp &&
              resultTimestamp < this.endDateTimestamp
            );
          })
          .forEach(result => {
            const t = this.convert24hto12h(
              new Date(result.timestamp).getHours()
            );
            if (data.hasOwnProperty(t)) {
              data[t] = data[t] + result.assertions.failed.length;
            } else {
              data[t] = result.assertions.failed.length;
            }
          });
      });

      this.lastest12HoursArray.forEach(h_12 => {
        if (data.hasOwnProperty(h_12)) {
          lastest12HoursFailedAssertionsArray.push(data[h_12]);
        } else {
          lastest12HoursFailedAssertionsArray.push(null);
        }
      });

      return lastest12HoursFailedAssertionsArray;
    },
    showOverview() {
      return this.$route.name === "services";
    },
    testCount() {
      return this.$store.getters.getTestsCount(this.$route.params.serviceId);
    },
    endpointCount() {
      const endpoints = this.$store.getters.getTests(
        this.$route.params.serviceId
      );
      return Object.keys(endpoints).length;
    },
    tests() {
      return this.$store.getters.getTests(this.$route.params.serviceId);
    },
    runs() {
      return this.$store.getters.getRuns(
        this.$route.params.serviceId,
        this.$store.state.env
      );
    },
    serviceAveragePassRate() {
      let passCount = 0;
      let totalCount = 0;

      this.runs.forEach(run => {
        this.$store.getters.getRunTestsResults(run.id).forEach(result => {
          if (result.result != "TestPending") {
            totalCount += 1;
          }
          if (result.result === "TestPass") {
            passCount += 1;
          }
        });
      });

      const rate = parseInt((passCount / totalCount) * 100);

      return rate ? rate + "%" : "--";
    },
    serviceAverageResponseTime() {
      let responseTimes = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      this.runs.forEach(run => {
        this.$store.getters
          .getRunTestsResults(run.id)
          .map(result => result.responseTime)
          .filter(responseTime => responseTime)
          .forEach(responseTime => responseTimes.push(responseTime));
      });

      return responseTimes.length
        ? parseInt(
            (responseTimes.reduce(reducer) * 1000) / responseTimes.length
          ) + " ms"
        : "--";
    }
  },
  methods: {
    ...mapActions(["createBasicTest", "createThisAssertion", "runTests"]),
    runTestsByDashboard(endpoint) {
      const env =
        this.$store.state.env === "All" ? "production" : this.$store.state.env;

      this.runTests({
        serviceId: Number(this.$route.params.serviceId),
        data: {
          via: "dashboard",
          environment: env,
          endpoint: endpoint
        }
      });
    },
    createTestForThisEndpoint(endpoint) {
      const test = {
        service: Number(this.$route.params.serviceId),
        description: null,
        endpoint: endpoint,
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
    },
    getLastestFailedRunForXlabel(xLabel) {
      return this.runs.find(run => {
        return (
          this.convert24hto12h(new Date(run.createdAt).getHours()) === xLabel
        );
      });
    },
    getTooltipTitle(xLabel) {
      const run = this.getLastestFailedRunForXlabel(xLabel);
      return this.$moment(run.createdAt).fromNow();
    },
    onClickForBarItem(xLabel) {
      const run = this.getLastestFailedRunForXlabel(xLabel);
      this.$router.push({
        name: "results",
        params: { runId: run.name }
      });
    },
    isFailedTest(testId) {
      const result = this.getTestLastedResult(testId);

      return result && result.result === "TestFail" ? true : false;
    },
    getTestLastedResult(testId) {
      const results = this.$store.getters.getResults(
        testId,
        this.$store.state.env
      );

      return results.length ? results[0] : null;
    },
    showTestStatus(testId) {
      const testLastedResult = this.getTestLastedResult(testId);

      return testLastedResult ? true : false;
    },
    getTestStatusVariant(testId) {
      const testLastedResult = this.getTestLastedResult(testId);

      if (testLastedResult) {
        if (testLastedResult.result === "TestPending") {
          return "warning";
        } else if (testLastedResult.result === "TestFail") {
          return "danger";
        } else if (testLastedResult.result === "TestPass") {
          return "success";
        }
      }
    },
    getTestStatusDesc(testId) {
      const testLastedResult = this.getTestLastedResult(testId);

      if (testLastedResult) {
        if (testLastedResult.result === "TestPending") {
          return "pending";
        } else if (testLastedResult.result === "TestFail") {
          return "failing";
        } else if (testLastedResult.result === "TestPass") {
          return "passing";
        }
      }
    },
    getLastest12Hours() {
      this.lastest12HoursArray.splice(0, this.lastest12HoursArray.length);
      const d = new Date();

      this.setEndDateTimestamp(d);
      this.setStartDateTimestamp(d);

      let currentHour = d.getHours();

      for (let index = 0; index < 12; index++) {
        this.lastest12HoursArray.push(this.convert24hto12h(currentHour));
        currentHour = currentHour ? currentHour : 24;
        currentHour = currentHour - 1;
      }

      return this.lastest12HoursArray.reverse();
    },
    convert24hto12h(h_24) {
      // 把24小时制变为12小时制
      let h = h_24 % 12;
      if (h === 0) h = 12;
      return h + (h_24 < 12 ? "am" : "pm");
    },
    setEndDateTimestamp(date) {
      const orginDate = new Date(date.valueOf());
      orginDate.setMinutes(0);
      orginDate.setSeconds(0);

      this.endDateTimestamp = orginDate.getTime() + 60 * 60 * 1000;
    },
    setStartDateTimestamp(date) {
      const orginDate = new Date(date.valueOf());
      orginDate.setMinutes(0);
      orginDate.setSeconds(0);

      this.startDateTimestamp = orginDate.getTime() - 11 * 60 * 60 * 1000;
    }
  }
};
</script>



<style scoped>
</style>


