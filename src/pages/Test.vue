<template>
    <div>
      <b-row style="padding-top:20px;">
        <b-col md="12">
          <b-row style="margin-top: 15px;">
            <b-col md="9">
              <div class="float-md-left">
                <b-link to="#">
                  <i
                    class="oi oi-media-stop"
                    :style="testResultStyleObj"></i>
                </b-link>
              </div>
              <div>
                <div v-if="isShowTestNameEditBox">
                  <b-form @submit.prevent="updateTestName">
                    <b-form-group
                      :state="!errors.has('testName')"
                      :invalid-feedback="errors.first('testName')">
                      <b-input-group 
                        style="margin-bottom: 0.5rem; max-width: 85%;">
                        <b-input-group-prepend>
                          <b-btn
                            variant="outline-secondary"
                            @click="showOrHiddenTestNameEditBox">
                            <i
                              class="oi oi-x"
                              style="margin-right: 0px; font-size: 12px;"></i>
                          </b-btn>
                        </b-input-group-prepend>
                        <b-form-input 
                          name="testName"
                          v-model="testName"
                          data-vv-as="test name"
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          :state="errors.has('testName') ? false : null" />
                        <b-input-group-append>
                          <b-btn 
                            variant="primary"
                            type="submit">
                            Save
                          </b-btn>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-form>

                </div>
                <h2 v-else
                  @click="showOrHiddenTestNameEditBox"
                  style="color: rgb(55, 58, 60); line-height:1.1;">
                  {{ test.name }} 
                </h2>                
              </div>
              <div style="margin-left: 20px;">
                <div v-if="isShowTestDescEditBox">
                  <div
                    style="margin-bottom: 10px;">
                    <b-form-textarea
                      v-model="testDesc"
                      :no-resize="true"
                      :rows="10"
                      :max-rows="10">
                    </b-form-textarea>
                  </div>
                  <div>
                    <b-btn
                      @click="showOrHiddenTestDescEditBox"
                      size="sm"
                      class="float-md-left"
                      variant="outline-secondary">
                      Cancel
                    </b-btn>
                    <b-btn  
                      @click="updateTestDesc"
                      size="sm"
                      class="float-md-right"
                      variant="success">
                      Save
                    </b-btn>
                  </div>
                </div>

                <div v-else>
                  <b-row v-if="test.description">
                    <b-col
                      @mouseover="showOrHiddenTestDescEditIcon"
                      @mouseout="showOrHiddenTestDescEditIcon"
                      md="12">
                      <span 
                        style="margin-left: -35px;"
                        class="float-left">
                        <small
                          class="text-muted"
                          style="cursor: pointer;">
                          <i 
                            @click="showOrHiddenTestDescEditBox"
                            v-show="isShowTestDescIcon"
                            class="oi oi-pencil"
                            style="margin-right: 10px; font-size: 12px; margin-left: 15px; color: rgb(129, 138, 145);"></i>
                        </small>
                      </span>
                      <span 
                        class="text-muted">
                        <p> {{test.description}} </p>
                      </span>
                    </b-col>
                  </b-row>
                  <div v-else>
                    <b-link 
                      @click="showOrHiddenTestDescEditBox"
                      class="text-muted">
                      <i>Add notes</i>
                    </b-link>
                  </div>
                </div>
              </div>
            </b-col>

            <b-col md="3">
              <!-- todo -->
            </b-col>

            <b-col md="10">
              <div style="margin-top: 20px;">
                <b-row style="margin:0px;">
                  <b-col 
                    md="2"
                    style="padding-left: 0px; padding-right: 0px;">
                    <b-dropdown
                      class="test-dropdown"
                      :text="method"
                      variant="outline-secondary"
                      >
                      <b-dropdown-item
                        @click="selectedMethod=method"
                        v-for="(method, index) in httpMethods"
                        :key="index"> {{ method }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                  <b-col 
                    md="2"
                    style="padding-left: 0px; padding-right: 0px;">
                    <span>
                      <b-dropdown
                        class="test-scheme-dropdown test-dropdown"
                        style="border-radius:0;"
                        :text="scheme"
                        variant="outline-secondary">
                        <b-dropdown-item
                          :active="activeScheme(item)"
                          @click="selectedScheme=item"
                          v-for="(item, index) in schemes"
                          :key="index">
                          {{ item }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </span>
                  </b-col>
                  <b-col 
                    md="4"
                    style="padding-left: 0px; padding-right: 0px;">
                    <b-btn 
                      variant="outline-secondary"
                      disabled
                      class="text-truncate"
                      style="margin-left: -1px; width: 100%; border-radius: 0px; cursor: default; color: initial;">
                      {{ evironment.url }}
                    </b-btn>
                  </b-col>
                  <b-col 
                    md="4"
                    style="padding-left: 0px; padding-right: 0px;">
                    <div>
                      <b-input-group>
                        <base-auto-suggest
                          :initialValue="endpoint"
                          @input="testEndpoint = $event">
                        </base-auto-suggest>
                        <b-input-group-append>
                          <b-btn 
                            variant="primary"
                            @click="updateTestMethodOrSchemeOrEndpoint"
                            :disabled="disableBtn">
                            Save
                          </b-btn>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>

            <b-col md="2">
              <div 
                class="text-md-center text-truncate"
                style="margin-top: 20px;">
                  <b-btn
                    @click="runTestByDashboard"
                    class="btn-block"
                    variant="success">Run test
                  </b-btn>
                  <small class="text-muted">
                    on
                    <b-link 
                      class="text-muted"
                      to="#">
                      {{ evironment.name }}
                    </b-link>
                  </small>
              </div>
            </b-col>
          </b-row>
          <br>
        </b-col>

        <configuration></configuration>
        <results></results>
      </b-row>

      
    </div>
</template>



<script>
import { mapActions } from "vuex";

import Configuration from "@/components/test/Configuration";
import Results from "@/components/test/Results/Results";
import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";

import { clone } from "@/config/utils";

export default {
  name: "Test",
  components: {
    Configuration,
    Results,
    BaseAutoSuggest
  },
  created() {
    this.getAllSteps(this.$route.params.testId);
  },
  data() {
    return {
      isShowTestNameEditBox: false,
      isShowTestDescEditBox: false,
      isShowTestDescIcon: false,
      httpMethods: ["GET", "POST"],
      selectedMethod: "",
      selectedScheme: "",
      testName: "",
      testDesc: "",
      testEndpoint: "",
      schemes: ["HTTP", "HTTPS", "Use service scheme"]
    };
  },
  mounted() {
    this.testName = this.test.name;
    this.testDesc = this.test.description;
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    },
    evironment() {
      return this.$store.getters.getEnvironment(
        this.$store.state.env,
        this.$route.params.serviceId
      );
    },
    method() {
      if (this.selectedMethod) {
        return this.selectedMethod;
      }
      return this.test.method;
    },
    scheme() {
      if (this.selectedScheme) {
        if (this.selectedScheme === "Use service scheme") {
          return this.service.schemes;
        }
        return this.selectedScheme;
      }

      return this.test.scheme || this.service.schemes;
    },
    endpoint() {
      let dataStr = "";
      const iterator = this.test.params.filter(param => param.enabled).values();

      for (const param of iterator) {
        dataStr += param.key + "=" + param.value + "&";
      }
      if (dataStr) {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
      }

      return dataStr ? this.test.endpoint + "?" + dataStr : this.test.endpoint;
    },
    disableBtn() {
      if (this.testEndpoint != this.endpoint) {
        return false;
      }
      if (this.selectedMethod && this.test.method != this.selectedMethod) {
        return false;
      }
      if (this.selectedScheme) {
        if (this.test.scheme === null) {
          if (this.selectedScheme === "Use service scheme") {
            return true;
          } else {
            return false;
          }
        } else if (this.selectedScheme != this.test.scheme) {
          return false;
        }
      }

      return true;
    },
    testResultStyleObj() {
      // 没有运行过
      let color = "#6c757d";
      const results = this.$store.getters.getResults(
        this.$route.params.testId,
        this.$store.state.env
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
        marginRight: "10px",
        fontSize: "16px",
        verticalAlign: "bottom",
        color: color
      };
    }
  },
  methods: {
    ...mapActions(["getAllSteps", "updateThisTest", "runTest"]),
    runTestByDashboard() {
      const env =
        this.$store.state.env === "All" ? "production" : this.$store.state.env;

      this.runTest({
        testId: Number(this.$route.params.testId),
        data: {
          via: "dashboard",
          environment: env
        }
      });
    },
    updateTestName() {
      this.$validator.validate("testName").then(res => {
        if (res) {
          const test = clone(this.test);
          test.name = this.testName;
          this.updateThisTest(test).then(res => {
            this.showOrHiddenTestNameEditBox();
          });
        }
      });
    },
    updateTestDesc() {
      const test = clone(this.test);
      test.description = this.testDesc;
      this.updateThisTest(test).then(res => {
        this.showOrHiddenTestDescEditBox();
      });
    },
    updateTestMethodOrSchemeOrEndpoint() {
      const test = clone(this.test);

      if (this.selectedMethod) {
        test.method = this.selectedMethod;
      }
      if (this.selectedScheme) {
        if (this.selectedScheme === "Use service scheme") {
          test.scheme = null;
        } else {
          test.scheme = this.selectedScheme;
        }
      }
      if (this.testEndpoint === "") {
        test.endpoint = "/";
        test.params = [];
      } else {
        let result = [];
        let existedQueryParms = [];
        let pathArray = this.testEndpoint.split("?");
        let endpoint = pathArray[0];
        let queryString = pathArray[1];

        if (queryString) {
          let queryArray = queryString.split("&");
          queryArray.forEach(item => {
            const obj = { key: "", value: "", enabled: true };
            obj.key = item.split("=")[0];
            obj.value = item.split("=")[1];
            result.push(obj);
          });
        }
        existedQueryParms = this.test.params.filter(param => {
          return param.enabled === false;
        });

        test.endpoint = endpoint;
        test.params = result.concat(clone(existedQueryParms));
      }

      this.updateThisTest(test);
    },
    showOrHiddenTestNameEditBox() {
      this.isShowTestNameEditBox = !this.isShowTestNameEditBox;
      // reset
      this.testName = this.test.name;
    },
    showOrHiddenTestDescEditBox() {
      this.isShowTestDescEditBox = !this.isShowTestDescEditBox;
      this.isShowTestDescIcon = false;
      // reset
      this.testDesc = this.test.description;
    },
    showOrHiddenTestDescEditIcon() {
      this.isShowTestDescIcon = !this.isShowTestDescIcon;
    },
    activeScheme(item) {
      if (this.selectedScheme) {
        return this.selectedScheme === item;
      } else if (this.test.scheme) {
        return this.test.scheme === item ? true : false;
      } else {
        return "Use service scheme" === item ? true : false;
      }
    }
  }
};
</script>


<style>
.test-dropdown {
  width: 100%;
}
.test-dropdown button {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: 0px;
  width: 100%;
}
.test-scheme-dropdown button {
  border-radius: 0px;
}
</style>
