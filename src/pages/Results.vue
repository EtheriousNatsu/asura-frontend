<template>
    <b-row style="background-color: rgb(255, 255, 255); padding-top: 20px;">
            <b-col 
                v-if="runs.length"
                md="3">
                <div>
                    <div>
                        <h4>Test Results</h4>
                        <p>
                            <small>Showing</small>
                            <strong>1</strong>
                             - 
                            <strong>{{runs.length}}</strong>
                             of 
                             <strong>{{runs.length}}</strong>
                              results
                        </p>
                    </div>
                </div>
                <test-runs 
                    :runs="runs"
                    :md="8"/>
            </b-col>
            <b-col 
                v-if="runs.length"
                md="9">
                <b-row>
                    <b-col md="9">
                        <h3 style="margin-bottom: 0px;">
                            <i 
                                class="oi oi-media-stop"
                                :style="styleObj"/>{{getRunTestsCount}} test
                            <small class="text-muted">
                                <small>{{getRunTestsAssertionsCount}} assertions</small>
                            </small>
                        </h3>
                        <p class="text-truncate">
                            <small class="text-muted">
                                {{currentRun.name}}
                                 ·
                                <b-link 
                                    :to="{name: 'settings', params: {serviceId: this.$route.params.serviceId}}"
                                    class="text-muted">
                                    {{currentRun.executionEnvironment.name}}
                                </b-link>
                                 ·
                                <span>{{runVia}}</span>
                            </small>
                        </p>
                    </b-col>
                    <b-col md="3">
                        <p 
                            class="text-right text-muted"
                            style="margin-top: 5px;">
                            <small>
                                <span>{{getRunFailingAssertionsCount}} failing assertions</span>
                                <br>
                                <span>{{this.currentRun.createdAt | moment("from")}}</span>
                            </small>
                        </p>
                    </b-col>
                    <b-col md="12">
                        <h3 style="margin-bottom: 20px;">
                            Overview
                        </h3>
                        <b-row>
                            <b-col 
                                style="padding-top: 10px;"
                                md="3"
                                class="text-center">
                                <base-pie-chart 
                                    :height="92"
                                    :width="184"
                                    style="display: block; width: 184px; height: 92px;"
                                    :chartData="testStatuChartData"
                                    :options="chartOptions"/>
                                <div class="text-muted">Results</div>
                            </b-col>
                            <b-col
                                md="3"
                                class="text-center"
                                style="padding-top: 10px;">
                                <base-pie-chart 
                                    :height="92"
                                    :width="184"
                                    style="display: block; width: 184px; height: 92px;"
                                    :chartData="testStatusCodeChartData"
                                    :options="chartOptions"/>
                                <div class="text-muted">Status codes</div>
                            </b-col>
                            <b-col md="6">
                              <b-row class="text-center">
                                <b-col md="6">
                                  <h6>{{runTestsAvgResponseTime + 'ms'}}</h6>
                                  <small class="text-muted">avg. response time</small>
                                  <hr>
                                </b-col>
                                <b-col md="6">
                                  <h6>{{runTestsSuccessRate + '%'}}</h6>
                                  <small class="text-muted">success rate</small>
                                  <hr>
                                </b-col>
                                <b-col md="6">
                                  <h6>{{runTestsEndpoint}}</h6>
                                  <small class="text-muted">endpoints</small>
                                </b-col>
                                <b-col md="6">
                                  <h6>{{runFailingTestsCount}}</h6>
                                  <small class="text-muted">failing test</small>
                                </b-col>
                              </b-row>
                            </b-col>
                        </b-row>
                        <br>
                    </b-col>

                    <b-col 
                        style="margin-bottom: 20px;"
                        md="12">
                        <h3 style="display: inline-block; margin-bottom: 0px;">Results</h3>
                        <b-nav 
                            class="float-right"
                            pills>
                            <b-nav-item
                                @click="selectTab(tab)"
                                v-for="(tab, index) in tabOptions" 
                                :key="index"
                                :active="tab.isActive">
                                {{tab.text}}
                            </b-nav-item>
                        </b-nav>
                    </b-col>
                    <b-col md="12">
                        <result-display 
                            v-for="(result, index) in runTestsResults"
                            :key="result.id"
                            :result="result"
                            :isFirst="false"/>
                        <b-card 
                            v-show="runTestsResults.length === 0"
                            style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
                            <p class="text-center">
                                <i 
                                    class="oi oi-info"
                                    style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
                            </p>
                            <p class="text-center">
                                <span>Woohoo! No failing tests in this run.</span>
                            </p>
                            <p></p>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>

        <b-col 
            v-else
            md="12">
            <b-card style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
                <p class="text-center">
                    <i 
                        class="oi oi-info"
                        style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
                    
                </p>
                <p class="text-center">
                    This environment doesn't have any test results yet!
                </p>
                <!-- todo: -->
                <!-- <div 
                    class="text-center"
                    style="margin-bottom: 10px;">
                    <b-button variant="primary">
                        Run tests now
                    </b-button>
                    <br>
                    <small class="text-muted">
                        on {{currentEnv}}
                    </small>
                </div> -->
            </b-card>
        </b-col>
    </b-row>
</template>



<script>
import BasePieChart from "@/components/base/BasePieChart";
import TestRuns from "@/components/results/TestRuns";
import ResultDisplay from "@/components/test/results/base/ResultDisplay";

export default {
  name: "results",
  components: {
    TestRuns,
    ResultDisplay,
    BasePieChart
  },
  data() {
    return {
      chartOptions: {
        legend: {
          display: false
        },
        cutoutPercentage: 70
      },
      tabOptions: [
        {
          text: "All",
          isActive: true
        },
        {
          text: "Failing",
          isActive: false
        }
      ]
    };
  },
  computed: {
    testStatuChartData() {
      return {
        labels: ["Pending", "Failed", "Passed"],
        datasets: [
          {
            backgroundColor: [
              "rgb(240, 173, 78)",
              "rgb(217, 83, 79)",
              "rgb(92, 184, 92)"
            ],
            data: [
              this.runPendingTestsCount,
              this.runFailingTestsCount,
              this.runPassingTestsCount
            ]
          }
        ]
      };
    },
    testStatusCodeChartData() {
      return {
        labels: ["xxx", "2xx", "3xx", "4xx", "5xx"],
        datasets: [
          {
            backgroundColor: [
              "#6c757d",
              "#007bff",
              "#33BAFF",
              "#ffc107",
              "#dc3545"
            ],
            data: [
              this.pendingStatusCodeCount,
              this.twoXXStatusCodeCount,
              this.threeXXStatusCodeCount,
              this.fourXXStatusCodeCount,
              this.fiveXXStatusCodeCount
            ]
          }
        ]
      };
    },
    runTestsAvgResponseTime() {
      let totalTime = 0;

      const responseTimes = this.$store.getters
        .getRunTestsResults(this.currentRun.id)
        .map(result => result.responseTime);

      responseTimes.forEach(responseTime => {
        if (responseTime) {
          // 秒转毫秒
          totalTime += parseInt(responseTime * 1000);
        }
      });

      return parseInt(totalTime / responseTimes.length);
    },
    runTestsSuccessRate() {
      const passedTestsCount = this.runPassingTestsCount;
      const totalTestsCount = this.getRunTestsCount;

      return parseInt((passedTestsCount / totalTestsCount) * 100);
    },
    runTestsEndpoint() {
      const endpoints = [];

      this.$store.getters
        .getRunTestsResults(this.currentRun.id)
        .forEach(result => {
          let endpoint = result.requestPath;

          if (!endpoints.includes(endpoint)) {
            endpoints.push(endpoint);
          }
        });

      return endpoints.length;
    },
    pendingStatusCodeCount() {
      // 运行中，或请求失败没有状态码
      const statusCodes = this.runTestsStatusCodeArray;

      return statusCodes.filter(code => Object.is(code, null)).length;
    },
    twoXXStatusCodeCount() {
      const statusCodes = this.runTestsStatusCodeArray;

      return statusCodes
        .filter(code => code)
        .filter(code => String(code).substring(0, 1) === "2").length;
    },
    threeXXStatusCodeCount() {
      const statusCodes = this.runTestsStatusCodeArray;

      return statusCodes
        .filter(code => code)
        .filter(code => String(code).substring(0, 1) === "3").length;
    },
    fourXXStatusCodeCount() {
      const statusCodes = this.runTestsStatusCodeArray;

      return statusCodes
        .filter(code => code)
        .filter(code => String(code).substring(0, 1) === "4").length;
    },
    fiveXXStatusCodeCount() {
      const statusCodes = this.runTestsStatusCodeArray;

      return statusCodes
        .filter(code => code)
        .filter(code => String(code).substring(0, 1) === "5").length;
    },
    runTestsStatusCodeArray() {
      return this.$store.getters
        .getRunTestsResults(this.currentRun.id)
        .map(result => {
          return result.responseStatusCode;
        });
    },
    runPendingTestsCount() {
      const runTestsResults = this.$store.getters.getRunTestsResults(
        this.currentRun.id
      );

      return runTestsResults.filter(result => result.result === "TestPending")
        .length;
    },
    runFailingTestsCount() {
      const runTestsResults = this.$store.getters.getRunTestsResults(
        this.currentRun.id
      );

      return runTestsResults.filter(result => result.result === "TestFail")
        .length;
    },
    runPassingTestsCount() {
      const runTestsResults = this.$store.getters.getRunTestsResults(
        this.currentRun.id
      );

      return runTestsResults.filter(result => result.result === "TestPass")
        .length;
    },
    currentRun() {
      const runId = this.$route.params.runId;
      const run = this.runs.find(run => run.name === runId);

      return run ? run : this.runs[0];
    },
    currentEnv() {
      return this.$store.state.env === "All"
        ? "production"
        : this.$store.state.env;
    },
    runs() {
      return this.$store.getters.getRuns(
        this.$route.params.serviceId,
        this.$store.state.env
      );
    },
    runTestsResults() {
      const allRunTestsResults = this.$store.getters.getRunTestsResults(
        this.currentRun.id
      );

      if (this.tabOptions.find(tab => tab.isActive).text === "All") {
        return allRunTestsResults;
      } else {
        //   失败用例结果
        return allRunTestsResults.filter(
          result => result.result === "TestFail"
        );
      }
    },
    getRunTestsCount() {
      return this.$store.getters.getRunTestsResults(this.currentRun.id).length;
    },
    getRunFailingAssertionsCount() {
      if (this.currentRun.status === "TestRunPending") {
        return 0;
      } else {
        let count = 0;
        this.$store.getters
          .getRunTestsResults(this.currentRun.id)
          .forEach(result => {
            if (result.result === "TestFail") {
              count += result.assertions.failed.length;
            }
          });

        return count;
      }
    },
    getRunTestsAssertionsCount() {
      if (this.currentRun.status === "TestRunPending") {
        return 0;
      } else {
        let assertionsCount = 0;
        this.$store.getters
          .getRunTestsResults(this.currentRun.id)
          .forEach(result => {
            const failedAssertionsCount = result.assertions.failed.length;
            const passedAssertionsCount = result.assertions.passed.length;
            assertionsCount += failedAssertionsCount + passedAssertionsCount;
          });

        return assertionsCount;
      }
    },
    styleObj() {
      // 运行中
      let color = "rgb(240, 173, 78)";

      if (this.currentRun.status === "TestRunFailed") {
        color = "rgb(217, 83, 79)";
      } else if (this.currentRun.status === "TestRunPassed") {
        color = "rgb(92, 184, 92)";
      }

      return {
        marginRight: "5px",
        fontSize: "12px",
        verticalAlign: "middle",
        color: color
      };
    },
    runVia() {
      return this.currentRun.via.type.split(/(?=[A-Z])/).join(" ");
    }
  },
  methods: {
    selectTab(selectedTab) {
      this.tabOptions.forEach(tab => {
        tab.isActive = selectedTab.text === tab.text;
      });
    }
  }
};
</script>


<style scoped>
</style>

