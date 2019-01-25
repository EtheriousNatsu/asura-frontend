<template>
    <b-row class="pt-3">
        <b-col md="12">
            <div class="mb-3">
                <b-row>
                    <b-col md="6">
                        <b-button-toolbar>
                            <b-input-group
                                style="width: 70%">
                                <b-input-group-prepend is-text>
                                    <i 
                                        class="oi oi-magnifying-glass"
                                        style="margin-right: 0px; font-size: 10px;"/>                                        
                                </b-input-group-prepend>
                                <b-form-input
                                    v-model="filterTestsByNameOrDesc"
                                    name="serviceTestsSearch"
                                    placeholder="Search test name and description..."></b-form-input>
                            </b-input-group>
                            <!-- todo: group -->
                        </b-button-toolbar>
                    </b-col>
                    <b-col
                        @click="cleanFilters"
                        v-show="showCleanFilter" 
                        class="text-md-right"
                        md="4"
                        offset-md="2"
                        style="mt-2">
                        <b-link 
                            class="text-muted">
                            <strong>
                                <i
                                    class="oi oi-x"
                                    style="margin-right: 5px; font-size: 10px; background-color: rgb(129, 138, 145); color: white; padding: 4px 5px 6px 6px; border-radius: 0.25rem; vertical-align: top;">
                                </i>
                                Clear current search filters and query
                            </strong>
                        </b-link>
                    </b-col>
                </b-row>
            </div>
            <b-card no-body>
                <b-card-header>
                    <b-row>
                        <b-col sm="6">
                            <b-form-checkbox
                                :disabled="tests.length == 0" 
                                v-model="allSelected"
                                :indeterminate="indeterminate"
                                @change="toggleAll">
                                &nbsp;
                            </b-form-checkbox>
                            <span v-if="indeterminate || allSelected">
                                {{ selected.length }} selected
                            </span> 
                            <span v-else>
                                <b-link 
                                    @click="filterTestsByfail = false"
                                    class="mr-2 text-dark"
                                    style="font-weight:700">
                                    <i 
                                        class="oi oi-list-rich" 
                                        style="font-size: 12px;"/>
                                    All tests
                                </b-link>
                                <b-link 
                                    @click="filterTestsByfail = true"
                                    class="text-muted"
                                    style="font-weight:700">
                                    <i 
                                        class="oi oi-circle-x" 
                                        style="font-size: 12px;"></i>
                                    Failing tests
                                </b-link>
                            </span>
   
                        </b-col>
                        <b-col 
                            md="6"
                            class="text-md-right">
                            <div style="display: inline-block;">
                                <div>
                                    <div 
                                        id="my-popover-id"
                                        style="display: inline-block; font-weight:700;">
                                        <b-link
                                            href="#"
                                            id="serviceTestsEnpointFilter">
                                            <span style="color: rgb(55, 58, 60);">
                                                <span v-if="selected.length >0">Actions</span>
                                                <span v-else>
                                                    Endpoints
                                                     <span v-show="filterTestsByEndpoints.length > 0">
                                                         ({{ filterTestsByEndpoints.length }})
                                                    </span>
                                                </span>
                                                <i class="oi oi-caret-bottom"
                                                    style="margin-right: 0px; font-size: 10px; vertical-align: initial;"></i>
                                            </span>
                                        </b-link>

                                        <b-popover
                                            :show.sync="popoverShow"
                                            target="my-popover-id"
                                            triggers="click blur"
                                            placement="bottom"
                                            >
                                            <template slot="title">
                                                <span v-if="selected.length >0">Test actions</span>
                                                <span v-else>Filter by endpoint</span>
                                                    <b-btn 
                                                        @click="onClose"
                                                        class="close">
                                                        <small style="vertical-align: top;">×</small>
                                                    </b-btn>
                                            </template>
                                            <b-list-group flush
                                                v-if="selected.length == 0">
                                                <b-list-group-item>
                                                    <b-form-input
                                                        v-model="filterEndpointsByName"
                                                        size="sm"
                                                        name="endpointSearch"
                                                        placeholder="Filter endpoints"></b-form-input>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                    @click="selectFilterEndpoint(endpoint)"
                                                    v-for="(endpoint, index) in endpoints" 
                                                    :key="index"
                                                    href="#">
                                                        <b-row>
                                                            <b-col md="11">
                                                                <div class="text-truncate">{{endpoint}}</div>
                                                            </b-col>
                                                            <b-col 
                                                                v-show="showSelectedEndpoint(endpoint)"
                                                                md="1"
                                                                style="padding-left: 0px;">
                                                                <i
                                                                    class="oi oi-check"
                                                                    style="margin-right: 5px; font-size: 12px;"></i>    
                                                            </b-col>
                                                        </b-row>
                                                </b-list-group-item>
                                                <b-list-group-item v-show="noTests">
                                                    <small>
                                                        <i>No endpoints to show</i>
                                                    </small>
                                                </b-list-group-item>
                                            </b-list-group>
                                            <b-list-group 
                                                flush
                                                v-else>
                                                <b-list-group-item 
                                                    href="#"
                                                    @click="runTestsByDashboard">
                                                    <span>Run {{selected.length}} tests</span>
                                                </b-list-group-item>
                                                <b-list-group-item class="text-danger"
                                                    href="#"
                                                    @click="showModal">
                                                    Delete {{ selected.length }} tests
                                                </b-list-group-item>
                                            </b-list-group>
                                        </b-popover>
                                    </div>
                                </div>
                            </div>
                        </b-col>


                    </b-row>
                </b-card-header>

                <b-list-group 
                    v-if="tests.length > 0"
                    flush>
                    <b-list-group-item 
                        v-for="(test, index) in tests"
                        :key="test.id">
                        <b-row>
                            <b-col md="1">
                                <b-form-checkbox
                                    v-model="selected"
                                    :value="test.id">&nbsp;
                                </b-form-checkbox>
                                <b-link 
                                    v-if="getTestResultRunId(test.id)"
                                    :to="{name: 'results', params: {runId: getTestResultRunId(test.id)}}">
                                    <i 
                                        style="font-size: 16px; vertical-align: middle;"
                                        :class="getClassObj(test.id)"/>
                                </b-link>
                                <i 
                                    v-else
                                    style="font-size: 16px; vertical-align: middle;"
                                    :class="getClassObj(test.id)"/>
                            </b-col>
                            <b-col md="11">
                                <b-row>
                                    <b-col 
                                        md="10"
                                        class="text-truncate">
                                        <b-link :to="{name: 'test', params:{serviceId: $route.params.serviceId, testId: test.id}}">
                                            <strong> {{ test.name }} </strong>
                                        </b-link>
                                    </b-col>
                                    <b-col 
                                        md="2"
                                        class="text-md-right">
                                        <b-dropdown
                                            size="sm"
                                            right
                                            variant="link"
                                            no-caret>
                                            <template slot="button-content">
                                                <i 
                                                    class="oi oi-ellipses icon-link" 
                                                    style="margin-right: 5px; font-size: 12px; color: black;"></i>
                                            </template>
                                            <b-dropdown-item :to="{name: 'test', params:{serviceId: $route.params.serviceId, testId: test.id}}">Edit test</b-dropdown-item>
                                            <b-dropdown-divider></b-dropdown-divider>
                                            <b-dropdown-item
                                                class="text-danger"
                                                @click="deleteUserTest(test.id)"
                                                >Delete test</b-dropdown-item>
                                        </b-dropdown>
                                        <i
                                            @click="runTestByDashboard(test.id)"
                                            v-b-tooltip.hover title="Run this test"
                                            class="oi oi-media-play icon-link"
                                            style="margin-right: 0px; font-size: 12px; cursor: pointer;"></i>
                                    </b-col>
                                    <b-col md="8">
                                        <small>
                                            <strong> {{ test.method }} </strong>
                                            {{ test.endpoint }}
                                        </small>
                                    </b-col>
                                    <b-col 
                                        md="4"
                                        class="text-md-right">
                                        <small>
                                            <b-link 
                                                to="#"
                                                class="text-muted">
                                                {{getAssertionsCount(test)}} assertion
                                            </b-link>
                                        </small>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
                <b-card-body v-else>
                    <b-row>
                        <b-col
                            md="8"
                            offset-md="2">
                            <b-card style="background-color: rgb(247, 247, 249); padding: 0.75rem;">
                                <p class="text-md-center">
                                    <i 
                                        class="oi oi-list-rich"
                                        style="font-size: 1.5rem; color: rgb(129, 138, 145);"></i>
                                </p>
                                <p class="text-md-center">
                                    <span v-if="noTests">Your service doesn't have any tests.</span>
                                    <span v-else>No tests matched your search</span>
                                </p>
                                <p class="text-md-center text-muted"
                                    v-if="!noTests">
                                    <small>
                                        No tests are showing due to search filters.
                                        <b-link href="#"
                                            @click="cleanFilters">
                                            Click here
                                        </b-link>
                                        to reset them.
                                    </small>
                                </p>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-card-body>

            </b-card>
        </b-col>
        <base-modal 
            ref="myModalRef"
            v-on:delete="deleteTests">
            <template slot="title">
                Are you sure you want to delete {{selected.length}} test?
            </template>
            <template slot="body">
                Deleting these tests will remove all settings and results.
            </template>
        </base-modal>
    </b-row>

</template>



<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

import { DELETE_TEST } from "@/store/mutation-types";
import BaseModal from "@/components/base/BaseModal";

export default {
  name: "Tests",
  components: {
    BaseModal
  },
  data() {
    return {
      selected: [],
      allSelected: false,
      indeterminate: false,
      filterTestsByNameOrDesc: "",
      filterEndpointsByName: "",
      filterTestsByfail: false,
      filterTestsByEndpoints: [],
      popoverShow: false
    };
  },
  watch: {
    selected(newVal, oldVal) {
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
  computed: {
    tests() {
      let filterTests = Object.values(
        this.$store.getters.getTests(this.$route.params.serviceId)
      ).flat();

      // filter by test name or test desc
      if (this.filterTestsByNameOrDesc) {
        filterTests = filterTests.filter(test => {
          let testDescriptionMatch = false;
          let testNameMatch = false;

          testNameMatch = test.name.includes(this.filterTestsByNameOrDesc);
          if (test.description) {
            testDescriptionMatch = test.description.includes(
              this.filterTestsByNameOrDesc
            );
          }

          return testNameMatch || testDescriptionMatch;
        });
      }

      // filter by endpoint
      if (this.filterTestsByEndpoints.length > 0) {
        filterTests = filterTests.filter(test => {
          return this.filterTestsByEndpoints.includes(test.endpoint);
        });
      }

      // filter by test status
      if (this.filterTestsByfail) {
        filterTests = filterTests.filter(test => {
          const results = this.$store.getters.getResults(
            test.id,
            this.$store.state.env
          );
          return results.length && results[0].result === "TestFail"
            ? true
            : false;
        });
      }

      return filterTests;
    },
    endpoints() {
      let filterEndpoints = Object.keys(
        this.$store.getters.getTests(this.$route.params.serviceId)
      );

      if (this.filterEndpointsByName) {
        filterEndpoints = filterEndpoints.filter(endpoint =>
          endpoint.includes(this.filterEndpointsByName)
        );
      }

      return filterEndpoints;
    },
    showCleanFilter() {
      return this.filterTestsByNameOrDesc ||
        this.filterTestsByEndpoints.length > 0 ||
        this.filterTestsByfail
        ? true
        : false;
    },
    noTests() {
      const tests = Object.values(
        this.$store.getters.getTests(this.$route.params.serviceId)
      ).flat();
      return tests.length == 0;
    }
  },
  methods: {
    ...mapMutations([DELETE_TEST]),
    ...mapActions([
      "deleteThisTest",
      "deleteBatchTests",
      "runTest",
      "runTests"
    ]),
    runTestsByDashboard() {
      const env =
        this.$store.state.env === "All" ? "production" : this.$store.state.env;

      this.runTests({
        serviceId: Number(this.$route.params.serviceId),
        data: {
          via: "dashboard",
          environment: env,
          tests: this.selected
        }
      }).then(() => {
        this.reset();
      });
    },
    runTestByDashboard(testId) {
      const env =
        this.$store.state.env === "All" ? "production" : this.$store.state.env;

      this.runTest({
        testId: testId,
        data: {
          via: "dashboard",
          environment: env
        }
      });
    },
    deleteUserTest(testId) {
      this.deleteThisTest(testId).then(() => {
        this.DELETE_TEST(testId);
        this.reset();
      });
    },
    deleteTests() {
      this.deleteBatchTests(this.selected).then(() => {
        this.$refs.myModalRef.hide();
        this.reset();
      });
    },
    getTestResultRunId(testId) {
      const results = this.$store.getters.getResults(
        testId,
        this.$store.state.env
      );

      return results.length ? results[0].runId : null;
    },
    getClassObj(testId) {
      let success = false;
      let fail = false;
      let pend = false;
      let noRun = true;

      const results = this.$store.getters.getResults(
        testId,
        this.$store.state.env
      );

      if (results.length) {
        // 最新结果
        const lastestResult = results[0];

        if (lastestResult.result === "TestPass") {
          // 运行成功
          success = true;
          noRun = false;
        } else if (lastestResult.result === "TestFail") {
          // 运行失败
          fail = true;
          noRun = false;
        } else if (lastestResult.result === "TestPending") {
          pend = true;
          noRun = false;
        }
      }

      return {
        oi: true,
        "oi-media-record": true,
        "text-success": success,
        "text-warning": pend,
        "text-danger": fail,
        "text-secondary": noRun
      };
    },
    toggleAll(checked) {
      this.selected = checked ? this.tests.map(test => test.id) : [];
    },
    cleanFilters() {
      this.filterTestsByNameOrDesc = "";
      this.filterTestsByEndpoints = [];
      this.filterTestsByfail = false;
    },
    onClose() {
      this.popoverShow = false;
    },
    selectFilterEndpoint(endpoint) {
      const index = this.filterTestsByEndpoints.indexOf(endpoint);

      if (index == -1) {
        this.filterTestsByEndpoints.push(endpoint);
      } else {
        this.filterTestsByEndpoints.splice(index, 1);
      }
    },
    showSelectedEndpoint(endpoint) {
      return this.filterTestsByEndpoints.includes(endpoint);
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    reset() {
      // 如果用户选择了批量删除，需要重置 selected
      this.selected.splice(0, this.selected.length);
    },
    getAssertionsCount(test) {
      return this.$store.getters.getAssertions(test.id).length;
    }
  }
};
</script>


<style>
.popover {
  margin-top: 0;
  width: 900px;
  max-height: 350px;
  left: -105px !important;
}

.popover .arrow {
  display: none !important;
}

.popover .popover-header {
  padding: 0.75rem 1.25rem;
  font-size: 14px;
  font-weight: 700;
}

.popover .popover-body {
  padding: 0;
}
</style>









