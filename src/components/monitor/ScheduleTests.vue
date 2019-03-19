<template>
      <ul class="list-group list-group-flush text-left">
        <div style="padding-left: 20px; padding-bottom: 10px;">
          <b-form-checkbox
            :disabled="tests.length == 0"
            v-model="allSelected"
            :indeterminate="indeterminate"
            @change="toggleAll">
            {{ allSelected ? 'Disable all tests' : 'Enable all tests' }}
          </b-form-checkbox>
        </div>
        <li
          @mouseover="handleMouseover(test.id)"
          @mouseout="handleMouseout"
          class="list-group-item text-truncate"
          v-for="test in showedTests"
          :key="test.id">
          <span
            style="padding-left: 5px;"
            class="float-right">
            <b-link :to="{name: 'test', params:{serviceId: $route.params.serviceId, testId: test.id}}">
              <i 
                v-b-tooltip.hover title="Edit test"
                v-show="hoveredTestId && hoveredTestId == test.id"
                class="oi oi-cog text-muted"
                style="margin-right: 5px; font-size: 12px;"/>
            </b-link>
            <b-link
              v-if="getTestResultRunId(test.id)"
              :to="{name: 'results', params: {runId: getTestResultRunId(test.id)}}">
              <i 
                class="oi oi-media-stop"
                :style="testResultStyleObj(test)"/>
            </b-link>
            <i 
              v-else
              class="oi oi-media-stop"
              :style="testResultStyleObj(test)"/>
          </span>
          <b-form-checkbox
            @change="createOrDeleteAssociationBetweenTestAndSchedule(test.id)"
            v-model="selectedTests"
            :value="test.id">
            {{test.name}}
          </b-form-checkbox>
          <small class="text-muted">{{test.endpoint}}</small>
        </li>
        <br>
        <b-pagination 
          v-if="isPagination"
          :total-rows="tests.length"
          v-model="currentPage"
          :per-page="perPage"/>
          <br>
          <div 
            v-if="showBtn"
            style="padding-top: 10px;">
            <b-button
              @click="cancelCreateSchedule"
              class="float-left"
              variant="outline-primary">
              Cancel
            </b-button>
            <b-btn
              @click="createAssociation"
              class="float-right"
              variant="primary">
              Done
            </b-btn>
          </div>
      </ul>
</template>



<script>
import { mapActions } from "vuex";

export default {
  name: "ScheduleTests",
  props: {
    schedule: {
      type: Object,
      required: true
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.schedule) {
      this.selectedTests = this.schedule.tests.map(test => test.id);
    }
  },
  data() {
    return {
      allSelected: false,
      indeterminate: false,
      hoveredTestId: null,
      currentPage: 1,
      selectedTests: [],
      perPage: 10
    };
  },
  computed: {
    tests() {
      return this.$store.state.tests.filter(
        test => test.service == this.$route.params.serviceId
      );
    },
    isPagination() {
      return this.tests.length > this.perPage;
    },
    showedTests() {
      if (this.isPagination) {
        let end = this.currentPage * this.perPage;
        let start = end - this.perPage;
        return this.tests.slice(start, end);
      }
      return this.tests;
    }
  },
  watch: {
    selectedTests(newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newVal.length === this.tests.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    }
  },
  methods: {
    ...mapActions([
      "removeAssociateTestAndSchedule",
      "associateTestAndSchedule"
    ]),
    toggleAll(checked) {
      this.selectedTests = checked ? this.tests.map(test => test.id) : [];

      if (!this.showBtn) {
        if (this.selectedTests.length) {
          this.selectedTests.forEach(testId => {
            if (
              this.schedule.tests.findIndex(test => test.id == testId) == -1
            ) {
              this.associateTestAndSchedule({
                scheduleId: this.schedule.id,
                testId: testId
              });
            }
          });
        } else {
          this.tests
            .map(test => test.id)
            .forEach(testId => {
              this.removeAssociateTestAndSchedule({
                scheduleId: this.schedule.id,
                testId: testId
              });
            });
        }
      }
    },
    createOrDeleteAssociationBetweenTestAndSchedule(testId) {
      // 只有在编辑定时任务时，才触发
      if (!this.showBtn) {
        if (this.selectedTests.includes(testId)) {
          this.removeAssociateTestAndSchedule({
            scheduleId: this.schedule.id,
            testId: testId
          });
        } else {
          this.associateTestAndSchedule({
            scheduleId: this.schedule.id,
            testId: testId
          });
        }
      }
    },
    cancelCreateSchedule() {
      this.$emit("destroy-modal");
    },
    createAssociation() {
      this.$emit("create-association", this.selectedTests);
    },
    handleMouseover(testId) {
      this.hoveredTestId = testId;
    },
    handleMouseout() {
      this.hoveredTestId = null;
    },
    getTestResultRunId(testId) {
      const results = this.$store.getters.getResults(
        testId,
        this.getSelectedEnvName(this.schedule.environment)
      );

      return results.length ? results[0].runId : null;
    },
    getSelectedEnvName(envId) {
      return this.$store.getters
        .getEnvironments(this.$route.params.serviceId)
        .find(env => {
          return env.id == envId;
        }).name;
    },
    testResultStyleObj(test) {
      // 没有运行过
      let color = "#6c757d";
      const results = this.$store.getters.getResults(
        test.id,
        this.getSelectedEnvName(this.schedule.environment)
      );

      if (results.length) {
        // 最新结果
        const lastestResult = results[0];

        if (lastestResult.result === "TestPass") {
          // 运行成功
          color = "rgb(92, 184, 92)";
        } else if (lastestResult.result === "TestFail") {
          // 运行失败
          color = "rgb(217, 83, 79)";
        } else if (lastestResult.result === "TestPending") {
          // 运行中
          color = "rgb(240, 173, 78)";
        }
      }
      return {
        marginRight: "5px",
        fontSize: "12px",
        color: color
      };
    }
  }
};
</script>



<style scoped>
</style>

