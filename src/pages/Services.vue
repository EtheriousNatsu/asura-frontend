<template>
  <main class="container">
    <keep-alive>
      <services-head />
    </keep-alive>
    <div v-if="showOverview">
      <keep-alive>
        <overview />
      </keep-alive>
    </div>

    <router-view></router-view>
  </main>
</template>



<script>
import { mapActions } from "vuex";
import ServicesHead from "@/components/services/ServicesHead";
import Overview from "@/components/overview/Overview";
// import TestRuns from "@/components/results/TestRuns";

// import BaseBarChart from "@/components/base/BaseBarChart";

export default {
  name: "DashboardServices",
  components: {
    ServicesHead,
    // TestRuns,
    // BaseBarChart,
    Overview
  },
  computed: {
    showOverview() {
      return this.$route.name === "services";
    }
  }
  // data() {
  //   return {
  //     currentPage: 1,
  //     perPage: 5,
  //     lastest12HoursArray: [],
  //     startDateTimestamp: 0,
  //     endDateTimestamp: 0,
  //     barOptions: {
  //       legend: {
  //         display: false
  //       },
  //       tooltips: {
  //         callbacks: {
  //           title: (array, data) => {
  //             const xLabel = array[0].xLabel;
  //             return this.getTooltipTitle(xLabel);
  //           }
  //         }
  //       },
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               min: 0,
  //               callback: (value, index, values) => {
  //                 if (Math.floor(value) === value) {
  //                   return value;
  //                 }
  //               }
  //             }
  //           }
  //         ],
  //         xAxes: [
  //           {
  //             gridLines: {
  //               display: false // x轴网格线不显示
  //             }
  //           }
  //         ]
  //       },
  //       onClick: (event, array) => {
  //         if (array.length) {
  //           const xLabel = array[0]._model.label;
  //           this.onClickForBarItem(xLabel);
  //         }
  //       },
  //       onHover: (event, chartElements) => {
  //         event.target.style.cursor = chartElements[0] ? "pointer" : "default";
  //       }
  //     }
  //   };
  // },
  // mounted: function() {
  //   this.getLastest12Hours();

  //   this.$nextTick(function() {
  //     // 5min 刷新一次
  //     setInterval(this.getLastest12Hours, 300000);
  //   });
  // },

  // computed: {
  //   isPagination() {
  //     return Object.entries(this.tests).length > this.perPage;
  //   },
  //   showedTests() {
  //     if (this.isPagination) {
  //       let end = this.currentPage * this.perPage;
  //       let start = end - this.perPage;
  //       return Object.entries(this.tests).slice(start, end);
  //     }
  //     return Object.entries(this.tests);
  //   },
  //   barChartData() {
  //     return {
  //       labels: this.lastest12HoursArray,
  //       datasets: [
  //         {
  //           label: "Failed assertions",
  //           backgroundColor: "rgb(217, 83, 79)",
  //           data: this.lastest12HoursFailedAssertions
  //         }
  //       ]
  //     };
  //   },
  //   stepSize() {
  //     return this.lastest12HoursFailedAssertions.length ? null : 1;
  //   },
  //   lastest12HoursFailedAssertions() {
  //     const data = {};
  //     const lastest12HoursFailedAssertionsArray = [];

  //     this.runs.forEach(run => {
  //       const runFailedResults = this.$store.getters
  //         .getRunTestsResults(run.id)
  //         .filter(result => {
  //           // 只取失败的
  //           return result.result === "TestFail";
  //         })
  //         .filter(result => {
  //           // 只取当前时段的
  //           const resultTimestamp = new Date(result.timestamp).getTime();
  //           return (
  //             resultTimestamp >= this.startDateTimestamp &&
  //             resultTimestamp < this.endDateTimestamp
  //           );
  //         })
  //         .forEach(result => {
  //           const t = this.convert24hto12h(
  //             new Date(result.timestamp).getHours()
  //           );
  //           if (data.hasOwnProperty(t)) {
  //             data[t] = data[t] + result.assertions.failed.length;
  //           } else {
  //             data[t] = result.assertions.failed.length;
  //           }
  //         });
  //     });

  //     this.lastest12HoursArray.forEach(h_12 => {
  //       if (data.hasOwnProperty(h_12)) {
  //         lastest12HoursFailedAssertionsArray.push(data[h_12]);
  //       } else {
  //         lastest12HoursFailedAssertionsArray.push(null);
  //       }
  //     });

  //     return lastest12HoursFailedAssertionsArray;
  //   },
  //   showOverview() {
  //     return this.$route.name === "services";
  //   },
  //   testCount() {
  //     return this.$store.getters.getTestsCount(this.$route.params.serviceId);
  //   },
  //   endpointCount() {
  //     const endpoints = this.$store.getters.getTests(
  //       this.$route.params.serviceId
  //     );
  //     return Object.keys(endpoints).length;
  //   },
  //   tests() {
  //     return this.$store.getters.getTests(this.$route.params.serviceId);
  //   },
  //   runs() {
  //     return this.$store.getters.getRuns(
  //       this.$route.params.serviceId,
  //       this.$store.state.env
  //     );
  //   },
  //   serviceAveragePassRate() {
  //     let passCount = 0;
  //     let totalCount = 0;

  //     this.runs.forEach(run => {
  //       this.$store.getters.getRunTestsResults(run.id).forEach(result => {
  //         if (result.result != "TestPending") {
  //           totalCount += 1;
  //         }
  //         if (result.result === "TestPass") {
  //           passCount += 1;
  //         }
  //       });
  //     });

  //     const rate = parseInt((passCount / totalCount) * 100);

  //     return rate ? rate + "%" : "--";
  //   },
  //   serviceAverageResponseTime() {
  //     let responseTimes = [];
  //     const reducer = (accumulator, currentValue) => accumulator + currentValue;

  //     this.runs.forEach(run => {
  //       this.$store.getters
  //         .getRunTestsResults(run.id)
  //         .map(result => result.responseTime)
  //         .filter(responseTime => responseTime)
  //         .forEach(responseTime => responseTimes.push(responseTime));
  //     });

  //     return responseTimes.length
  //       ? parseInt(
  //           (responseTimes.reduce(reducer) * 1000) / responseTimes.length
  //         ) + " ms"
  //       : "--";
  //   }
  // },
  // methods: {
  //   ...mapActions(["createBasicTest", "createThisAssertion", "runTests"]),
  //   runTestsByDashboard(endpoint) {
  //     const env =
  //       this.$store.state.env === "All" ? "production" : this.$store.state.env;

  //     this.runTests({
  //       serviceId: Number(this.$route.params.serviceId),
  //       data: {
  //         via: "dashboard",
  //         environment: env,
  //         endpoint: endpoint
  //       }
  //     });
  //   },
  //   createTestForThisEndpoint(endpoint) {
  //     const test = {
  //       service: Number(this.$route.params.serviceId),
  //       description: null,
  //       endpoint: endpoint,
  //       headers: [],
  //       method: "GET",
  //       name: "200 OK",
  //       params: [],
  //       requestBody: null,
  //       scheme: null,
  //       variables: []
  //     };

  //     this.createBasicTest(test).then(newTest => {
  //       const assertion = {
  //         comparator: "AssertEquals",
  //         property: null,
  //         source: "AssertStatusCode",
  //         target: "200",
  //         test: newTest.id
  //       };

  //       this.createThisAssertion(assertion).then(newAssertion => {
  //         this.$router.push({
  //           name: "test",
  //           params: {
  //             serviceId: this.$route.params.serviceId,
  //             testId: newAssertion.test
  //           }
  //         });
  //       });
  //     });
  //   },
  //   getLastestFailedRunForXlabel(xLabel) {
  //     return this.runs.find(run => {
  //       return (
  //         this.convert24hto12h(new Date(run.createdAt).getHours()) === xLabel &&
  //         run.status == "TestRunFailed"
  //       );
  //     });
  //   },
  //   getTooltipTitle(xLabel) {
  //     const run = this.getLastestFailedRunForXlabel(xLabel);
  //     return this.$moment(run.createdAt).fromNow();
  //   },
  //   onClickForBarItem(xLabel) {
  //     const run = this.getLastestFailedRunForXlabel(xLabel);
  //     this.$router.push({
  //       name: "results",
  //       params: { runId: run.name }
  //     });
  //   },
  //   isFailedTest(testId) {
  //     const result = this.getTestLastedResult(testId);

  //     return result && result.result === "TestFail" ? true : false;
  //   },
  //   getTestLastedResult(testId) {
  //     const results = this.$store.getters.getResults(
  //       testId,
  //       this.$store.state.env
  //     );

  //     return results.length ? results[0] : null;
  //   },
  //   showTestStatus(testId) {
  //     const testLastedResult = this.getTestLastedResult(testId);

  //     return testLastedResult ? true : false;
  //   },
  //   getTestStatusVariant(testId) {
  //     const testLastedResult = this.getTestLastedResult(testId);

  //     if (testLastedResult) {
  //       if (testLastedResult.result === "TestPending") {
  //         return "warning";
  //       } else if (testLastedResult.result === "TestFail") {
  //         return "danger";
  //       } else if (testLastedResult.result === "TestPass") {
  //         return "success";
  //       }
  //     }
  //   },
  //   getTestStatusDesc(testId) {
  //     const testLastedResult = this.getTestLastedResult(testId);

  //     if (testLastedResult) {
  //       if (testLastedResult.result === "TestPending") {
  //         return "pending";
  //       } else if (testLastedResult.result === "TestFail") {
  //         return "failing";
  //       } else if (testLastedResult.result === "TestPass") {
  //         return "passing";
  //       }
  //     }
  //   },
  //   getLastest12Hours() {
  //     this.lastest12HoursArray.splice(0, this.lastest12HoursArray.length);
  //     const d = new Date();

  //     this.setEndDateTimestamp(d);
  //     this.setStartDateTimestamp(d);

  //     let currentHour = d.getHours();

  //     for (let index = 0; index < 12; index++) {
  //       this.lastest12HoursArray.push(this.convert24hto12h(currentHour));
  //       currentHour = currentHour ? currentHour : 24;
  //       currentHour = currentHour - 1;
  //     }

  //     return this.lastest12HoursArray.reverse();
  //   },
  //   convert24hto12h(h_24) {
  //     // 把24小时制变为12小时制
  //     let h = h_24 % 12;
  //     if (h === 0) h = 12;
  //     return h + (h_24 < 12 ? "am" : "pm");
  //   },
  //   setEndDateTimestamp(date) {
  //     const orginDate = new Date(date.valueOf());
  //     orginDate.setMinutes(0);
  //     orginDate.setSeconds(0);

  //     this.endDateTimestamp = orginDate.getTime() + 60 * 60 * 1000;
  //   },
  //   setStartDateTimestamp(date) {
  //     const orginDate = new Date(date.valueOf());
  //     orginDate.setMinutes(0);
  //     orginDate.setSeconds(0);

  //     this.startDateTimestamp = orginDate.getTime() - 11 * 60 * 60 * 1000;
  //   }
  // }
};
</script>



<style scoped>
</style>


