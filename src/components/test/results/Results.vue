<template>
  <b-col md="6">
    <h4>Results</h4>
    <div v-if="results.length">
      <result-display 
        v-for="(result, index) in results"
        :key="result.id"
        :result="result"
        :isFirst="index === 0"/>
    </div>
    <b-card 
        v-else 
        style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
      <p class="text-center">
        <i 
            class="oi oi-loop-circular" 
            style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
      </p>
      <p class="text-center">This test has not been run yet.
        <b-link @click="runTestByDashboard">
          Run it now.
        </b-link>
      </p>
    </b-card>
  </b-col>
</template>



<script>
import ResultDisplay from "@/components/test/results/base/ResultDisplay";
import { mapActions } from "vuex";

export default {
  name: "results",
  components: {
    ResultDisplay
  },
  computed: {
    results() {
      return this.$store.getters.getResults(
        this.$route.params.testId,
        this.$store.state.env
      );
    }
  },
  methods: {
    ...mapActions(["runTest"]),
    runTestByDashboard() {
      const env =
        this.$store.state.env === "All" ? "production" : this.$store.state.env;

      this.runTest({
        testId: Number(this.$route.params.testId),
        via: "dashboard",
        environment: env
      });
    }
  }
};
</script>



<style scope>
</style>
