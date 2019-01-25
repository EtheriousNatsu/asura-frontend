<template>
    <b-list-group>
        <b-list-group-item
            :class="{active: $route.name === 'results' && index === 0 && !$route.params.runId}"
            :to="{name: 'results', params: {runId: run.name}}"
            v-for="(run, index) in runs"
            :key="run.id">
            <b-row>
                <b-col md="10">
                    <h6 class="text-truncate">
                        <i 
                            :class="getRunClassObj(run)"
                            :style="getRunStyleObj(run)"/>
                        {{getRunTestsCount(run)}} tests
                        <small> - {{getRunTestsAssertionsCount(run)}} assertions</small>
                    </h6>
                </b-col>
                <b-col 
                    class="text-right text-muted"
                    md="2">
                    <span 
                      class="rerun-link">
                        <!-- <i 
                            class="oi oi-loop-circular"
                            style="margin-right: 0px; font-size: 12px; vertical-align: text-top;"/> -->
                    </span>
                </b-col>
                <b-col
                    :md="md"
                    style="padding-right: 5px;">
                    <p class="text-muted text-truncate list-group-item-text">
                        <small>{{run.name}}</small> · <small>{{run.executionEnvironment.name}}</small>
                    </p>
                </b-col>
                <b-col 
                    class="text-right text-muted"
                    style="padding-left: 0px;"
                    :md="12 - md">
                    <p class="text-truncate list-group-item-text">
                        <small>{{run.createdAt | moment("from")}}</small>
                        <small>{{getRunVia(run.via)}}</small>
                    </p>
                </b-col>
            </b-row>
        </b-list-group-item>
    </b-list-group>
</template>



<script>
export default {
  name: "TestRuns",
  props: {
    runs: Array,
    md: {
      type: Number,
      default: 6
    }
  },
  methods: {
    // reRun() {

    // },
    getRunTestsCount(run) {
      return this.$store.getters.getRunTestsResults(run.id).length;
    },
    getRunTestsAssertionsCount(run) {
      let assertionsCount = 0;
      this.$store.getters.getRunTestsResults(run.id).forEach(result => {
        const failedAssertionsCount = result.assertions.failed.length;
        const passedAssertionsCount = result.assertions.passed.length;
        assertionsCount += failedAssertionsCount + passedAssertionsCount;
      });

      return assertionsCount;
    },
    getRunClassObj(run) {
      return {
        oi: true,
        "oi-loop-circular": run.status === "TestRunPending" ? true : false,
        "oi-x": run.status === "TestRunFailed" ? true : false,
        "oi-check": run.status === "TestRunPassed" ? true : false
      };
    },
    getRunStyleObj(run) {
      if (run.status === "TestRunPassed") {
        return {
          marginRight: "5px",
          fontSize: "12px",
          color: "rgb(92, 184, 92)"
        };
      } else if (run.status === "TestRunFailed") {
        return {
          marginRight: "5px",
          fontSize: "12px",
          color: "rgb(217, 83, 79)"
        };
      } else if (run.status === "TestRunPending") {
        return {
          marginRight: "5px",
          fontSize: "12px",
          animationName: "spin",
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDirection: "reverse",
          color: "rgb(240, 173, 78)"
        };
      }
    },
    getRunVia(via) {
      return via.type.split(/(?=[A-Z])/).join(" ");
    }
  }
};
</script>


<style scoped>
</style>

