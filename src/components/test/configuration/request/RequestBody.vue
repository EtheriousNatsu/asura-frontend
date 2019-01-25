<template>
    <div>
      <b-card-header style="margin-bottom: -5px;">
        Request body
      </b-card-header>     
      <b-card-body>
        <div>
          <div  
            v-if="showBodyEditBox === false && test.requestBody === null"
            style="padding-top: 0px;">
            <small>
              <b-link
                @click="showBodyEditBox=true">
                Add request body
              </b-link>
            </small>
          </div>
          <div v-if="test.requestBody && showBodyEditBox === false">
            <div>
              <div style="margin-bottom: 10px;">
                <small>
                  <i v-if="requestBodyType === 'RawBody'">Raw request body</i>
                  <i v-else-if="requestBodyType === 'XWwwFormUrlEncodedBody'">x-www-form-urlencoded</i>
                  <i v-else>multipart/form-data</i>
                </small>
              </div>
              <div v-if="requestBodyType === 'RawBody'">
                <code> {{ test.requestBody.data }} </code>
              </div>
              <b-table 
                v-else
                :small="true"
                :fields="fields"
                :items="requestData">
                <template slot="enabled" slot-scope="data">
                  <b-form-checkbox
                    @input="selectRequestData"
                    v-model="data.item.enabled">
                  </b-form-checkbox>
                </template>
              </b-table>
            </div>
            <div style="padding-top: 10px;">
              <small>
                <b-link 
                  href="#"
                  @click="showBodyEditBox = true">
                  Edit request body
                </b-link>
              </small>
            </div>
          </div>
          <b-row v-if="showBodyEditBox">
            <b-col md="12">
              <b-form-group>
                <b-form-radio-group
                  v-model="requestBodyType"
                  :options="requestBodyTypeOptions">
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col 
              md="12"
              v-if="showSetContentType">
              <p>
                <b-link 
                  class="text-muted"
                  @click="addHeader">
                  <i 
                    class="oi oi-signpost"
                    style="margin-right: 5px; font-size: 10px; vertical-align: initial;"/>
                  <small>
                    <span>
                      set
                      <code>Content-Type:   {{getContentType(requestBodyType)}} </code>
                      header
                    </span>
                  </small>
                </b-link>
              </p>
            </b-col>
            <b-col md="12">
              <b-row>
                <b-col 
                  md="12"
                  v-if="requestBodyType === 'RawBody'">
                  <b-row>
                    <b-col 
                      md="6"
                      style="margin-bottom: 10px;">
                      <small class="text-muted">Content type:</small>
                      <br>
                      <b-dropdown
                        size="sm"
                        variant="outline-secondary"
                        :text="rawType">
                        <b-dropdown-item
                          v-for="(rawTypeOption, index) in rawTypeOptions" 
                          :key="index"
                          @click="rawType = rawTypeOption">
                          {{ rawTypeOption }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col 
                  v-if="requestBodyType === 'RawBody'"
                  md="12"
                  class="form-group">
                  <base-code-mirror
                    v-if="requestBodyType === 'RawBody' "
                    v-model="rawData"
                    :options="getCodeMirrorOptions">
                  </base-code-mirror>
                </b-col>
                <b-col 
                  v-else
                  class="form-group">
                  <b-row>
                    <b-col md="12">
                      <b-form data-vv-scope="addForm">
                        <b-row
                          v-for="(data, index) in requestData" 
                          :key="data.uniqueKey">
                          <b-col 
                            md="1"
                            style="padding-top: 20px;">
                            <br>
                            <b-form-checkbox
                              v-model="data.enabled">
                            </b-form-checkbox>
                          </b-col>
                          <b-col md="5">
                            <label>Key</label>
                            <base-auto-suggest
                              rules="required"
                              :name="'dataKey' + index"
                              alias="key"
                              :initialValue="data.key"
                              scope="addForm"
                              @input="data.key = $event">
                            </base-auto-suggest>
                          </b-col>
                          <b-col md="5">
                            <label>Value</label>
                            <base-auto-suggest
                              :initialValue="data.value"
                              @input="data.value = $event">
                            </base-auto-suggest> 
                          </b-col>
                          <b-col 
                            md="1"
                            style="padding-top: 15px;">
                            <br>
                            <b-link
                              @click="deleteData(index)"
                              href="#"
                              class="text-dark">
                              <i 
                                class="oi oi-trash"
                                style="margin-right: 5px; font-size: 12px;"/>
                            </b-link>
                          </b-col>
                        </b-row>
                      </b-form>

                    </b-col>
                    <b-col md="12">
                      <p>
                        <small>
                          <b-link
                            @click="addData"
                            href="#">
                            Add form parameter
                          </b-link>
                        </small>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col md="12">
                  <b-form-group>
                    <b-btn 
                      variant="outline-secondary"
                      @click="cancelAddRequestBody">
                      Cancel
                    </b-btn>
                    <b-btn 
                      @click="addBody"
                      variant="success"
                      class="float-right">
                      Save request body
                    </b-btn>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <small class="text-muted">
                    <span v-if="requestBodyType === 'RawBody'">
                      Note: Asura does not encode raw request bodies.
                    </span>
                    <span v-else-if="requestBodyType === 'XWwwFormUrlEncodedBody'">
                      Note: Asura automatically applies percent encoding to the request body.
                    </span>
                    <span v-else>
                      Note: Asura automatically adds a Content-Type header which includes the dynamic multipart boundary to requests with a multipart/form-data request body.
                    </span>
                  </small>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>

      </b-card-body>
    </div>
</template>


<script>
import { mapActions } from "vuex";

import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";
import BaseCodeMirror from "@/components/base/BaseCodeMirror";

import { clone } from "@/config/utils";

let id = 0;

export default {
  name: "RequestBody",
  components: {
    BaseCodeMirror,
    BaseAutoSuggest
  },
  mounted() {
    if (this.test.requestBody && this.test.requestBody.type !== "RawBody") {
      this.preload();
    }
  },
  data() {
    return {
      showBodyEditBox: false,
      selectedRequestBodyType: "",
      selectedRawType: "",
      inputedRawData: "",
      rawTypeOptions: [
        "application/json",
        "text/html",
        "text/xml",
        "text/plain"
      ],
      requestBodyTypeOptions: [
        { text: "Raw", value: "RawBody" },
        {
          text: "x-www-form-urlencoded",
          value: "XWwwFormUrlEncodedBody"
        }
        // { text: "multipart/form-data", value: "MultipartFormDataBody" }
      ],
      defaultRequestBodyType: "RawBody",
      defaultRawType: "application/json",
      defaultRawData: "",
      requestData: [],
      fields: [
        { key: "enabled", thClass: "text-muted" },
        { key: "key", thClass: "text-muted" },
        { key: "value", thClass: "text-muted" }
      ]
    };
  },
  computed: {
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    },
    isRawBody() {
      return this.requestBodyType === "RawBody" ? true : false;
    },
    isMultipartFormDataBody() {
      return this.requestBodyType === "MultipartFormDataBody" ? true : false;
    },
    isXWwwFormUrlEncodedBody() {
      return this.requestBodyType === "XWwwFormUrlEncodedBody" ? true : false;
    },
    requestBodyType: {
      get() {
        if (this.selectedRequestBodyType) {
          return this.selectedRequestBodyType;
        } else if (this.test.requestBody) {
          return this.test.requestBody.type;
        }
        return this.defaultRequestBodyType;
      },
      set(bodyType) {
        this.selectedRequestBodyType = bodyType;
      }
    },
    rawType: {
      get() {
        if (this.selectedRawType) {
          return this.selectedRawType;
        } else if (this.rawTypeOptions.includes(this.contentType)) {
          return this.contentType;
        }
        return this.defaultRawType;
      },
      set(rawType) {
        this.selectedRawType = rawType;
      }
    },
    rawData: {
      get() {
        return this.test.requestBody && this.test.requestBody.type === "RawBody"
          ? this.test.requestBody.data
          : this.defaultRawData;
      },
      set(rawData) {
        this.inputedRawData = rawData;
      }
    },
    contentType() {
      const contentTypeHeader = this.test.headers.find(
        header => header.key === "Content-Type"
      );
      return contentTypeHeader ? contentTypeHeader.value : "";
    },
    getCodeMirrorOptions() {
      return {
        mode: this.rawType
      };
    },
    showSetContentType() {
      if (this.isMultipartFormDataBody) {
        return false;
      } else if (this.isRawBody) {
        if (this.contentType === this.rawType) {
          return false;
        }
      } else if (this.isXWwwFormUrlEncodedBody) {
        if (this.contentType === "application/x-www-form-urlencoded") {
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    selectedRequestBodyType(newVal) {
      this.resetRequestData();
      if (this.requestData.length === 0) {
        this.requestData.push({
          key: "",
          value: "",
          enabled: true,
          uniqueKey: id++
        });
      }
    }
  },
  methods: {
    ...mapActions(["updateThisTest"]),
    addHeader() {
      const test = clone(this.test);
      const contentTypeHeader = {
        enabled: true,
        key: "Content-Type",
        value: this.getContentType(this.requestBodyType)
      };

      test.headers = test.headers.filter(header => {
        return header.key !== "Content-Type";
      });
      test.headers.push(contentTypeHeader);

      this.updateThisTest(clone(test));
    },
    addBody() {
      this.$validator.validateAll("addForm").then(res => {
        if (res) {
          const test = clone(this.test);
          let requestBody = null;

          if (this.requestBodyType === "RawBody") {
            if (this.inputedRawData) {
              requestBody = {
                type: this.requestBodyType,
                data: this.inputedRawData
              };
            }
          } else {
            if (this.requestData.length) {
              const data = this.requestData.map(data => {
                this.$delete(data, "uniqueKey");
                return data;
              });
              requestBody = {
                type: this.requestBodyType,
                data: data
              };
            }
          }

          test.requestBody = requestBody;
          this.updateThisTest(clone(test)).then(res => {
            this.cancelAddRequestBody();
          });
        }
      });
    },
    selectRequestData() {
      const test = clone(this.test);
      test.requestBody.data = clone(this.requestData).map(data => {
        this.$delete(data, "uniqueKey");
        return data;
      });

      this.updateThisTest(clone(test));
    },
    addData() {
      this.requestData.push({ key: "", value: "", enabled: true });
    },
    deleteData(index) {
      this.requestData.splice(index, 1);
    },
    cancelAddRequestBody() {
      this.selectedRequestBodyType = "";
      this.selectedRawType = "";
      this.showBodyEditBox = false;
      this.inputedRawData = "";
      this.resetRequestData();
    },
    preload() {
      this.requestData = clone(this.test.requestBody.data).map(data => {
        this.$set(data, "uniqueKey", id++);
        return data;
      });
    },
    resetRequestData() {
      if (this.test.requestBody && this.test.requestBody.type !== "RawBody") {
        this.preload();
      } else {
        this.requestData = [];
      }
    },
    getContentType(requestBodyType) {
      if (requestBodyType === "RawBody") {
        return this.rawType;
      }
      return "application/x-www-form-urlencoded";
    }
  }
};
</script>



<style scoped>
</style>

