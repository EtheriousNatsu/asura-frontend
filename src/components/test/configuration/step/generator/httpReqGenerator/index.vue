<template>
  <div>
    <div v-if="stepType === 'teardown' ">
      <h6>
        <strong>Capture variables from test</strong>
      </h6>
      <b-row>
        <b-col md="12" style="margin-bottom: 10px;">
          <div v-for="(variable, index) in variables" :key="variable.uniqueKey">
            <b-row>
              <b-col md="3">
                <label style="padding-left: 12px;">Source</label>
              </b-col>
              <b-col md="4">
                <label>Name</label>
              </b-col>
              <b-col md="5" style="padding-left: 0px;">
                <label style="padding-left: 12px;">{{ getOption(variable).label }}</label>
              </b-col>
            </b-row>
            <b-form-group
              :state="errors.has('requestVars.variableName') ? false : null"
              :invalid-feedback="errors.first('requestVars.variableName')"
            >
              <b-input-group>
                <b-input-group-prepend>
                  <b-dropdown variant="outline-secondary" :text="getOption(variable).source">
                    <b-dropdown-item
                      @click="selectSource(variable, option)"
                      v-for="(option, index) in options"
                      :key="index"
                    >{{ option.source }}</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input
                  name="variableName"
                  data-vv-as="variable name"
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  data-vv-scope="requestVars"
                  v-model="variable.name"
                  placeholder="variableName"
                  :state="errors.has('requestVars.variableName') ? false : null"
                />
                <b-form-input
                  v-model="variable.selector"
                  :disabled="getOption(variable).disabled"
                  :placeholder="getOption(variable).placeholder"
                />
                <b-input-group-append>
                  <b-btn @click="deleteVar(index)" variant="outline-secondary">×</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
        </b-col>
        <b-col md="12">
          <b-btn @click="addVar" variant="outline-secondary" size="sm">
            Capture
            <span v-if="variables.length">another</span>
            <span v-else>a</span>
            variable
          </b-btn>
        </b-col>
      </b-row>
    </div>
    <br>
    <b-row>
      <b-col md="12">
        <h6>
          <strong>Request settings</strong>
        </h6>
      </b-col>
      <b-col md="12">
        <b-input-group>
          <b-input-group-prepend>
            <b-dropdown variant="outline-secondary" :text="requestMethod">
              <b-dropdown-item
                @click="requestMethod = method"
                v-for="(method, index) in httpMethods"
                :key="index"
              >{{ method }}</b-dropdown-item>
            </b-dropdown>
          </b-input-group-prepend>
          <base-auto-suggest
            :rules="{required: true, url: {require_protocol: true}}"
            name="url"
            alias="url"
            scope="requestUrl"
            @input="inputedRequestUrl = $event"
            :showErrors="false"
            :initialValue="requestUrl"
          />
        </b-input-group>
      </b-col>
      <b-col
        md="12"
        v-show="errors.first('requestUrl.url')"
        style="color:red;"
      >{{ errors.first('requestUrl.url') }}</b-col>
      <b-col md="12" v-if="matchedServiceHost">
        <small class="text-muted">
          <strong>NOTE</strong>
          <span>This URL matches or overlaps your Service host. If you run this step against a non-default environment, the host will be automatically updated to your environment url.</span>
        </small>
      </b-col>
      <b-col md="12">
        <!-- 起到换行作用 -->
        <p></p>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <h6 class="text-muted">
              <small>Query params</small>
            </h6>
            <b-row>
              <b-col
                md="12"
                v-for="(queryParam, index) in requestQuery"
                :key="queryParam.uniqueKey"
              >
                <b-row>
                  <b-col md="5">
                    <label style="padding-left:12px;">Param</label>
                    <base-auto-suggest
                      rules="required"
                      :name="'paramKey' + index"
                      alias="param key"
                      @input="queryParam.key = $event"
                      :initialValue="queryParam.key"
                      scope="requestQuery"
                    />
                  </b-col>
                  <b-col md="5">
                    <b-form-group>
                      <label style="padding-left:12px;">Value</label>
                      <base-auto-suggest
                        :initialValue="queryParam.value"
                        @input="queryParam.value = $event"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="2" style="padding-top: 15px;">
                    <br>
                    <b-link style="color: #373a3c;">
                      <i
                        @click="deleteParam(index)"
                        class="oi oi-trash"
                        style="margin-right: 5px; font-size: 12px;"
                      />
                    </b-link>
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="12">
                <small>
                  <b-link @click="addParam">Add query param</b-link>
                </small>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <h6 class="text-muted">
              <small>Request headers</small>
            </h6>
            <b-row>
              <b-col md="12" v-for="(header, index) in requestHeaders" :key="header.uniqueKey">
                <b-row>
                  <b-col md="5">
                    <label style="padding-left:12px;">Header</label>
                    <base-auto-suggest
                      rules="required"
                      :name="'headerKey' + index"
                      alias="header key"
                      scope="requestHeaders"
                      :initialValue="header.key"
                      @input="header.key = $event"
                    />
                  </b-col>
                  <b-col md="5">
                    <b-form-group>
                      <label style="padding-left:12px;">Value</label>
                      <base-auto-suggest
                        :initialValue="header.value"
                        @input="header.value = $event"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="2" style="padding-top: 15px;">
                    <br>
                    <b-link style="color: #373a3c;">
                      <i
                        @click="deleteHeader(index)"
                        class="oi oi-trash"
                        style="margin-right: 5px; font-size: 12px;"
                      />
                    </b-link>
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="12">
                <small>
                  <b-link @click="addHeader">Add request header</b-link>
                </small>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <br>
            <h6 class="text-muted">
              <small>Request body</small>
            </h6>
            <div>
              <div>
                <base-code-mirror v-if="showRequestBodyEditBox" v-model="requestBody"/>
                <div v-else>
                  <pre><code>{{ requestBody }}</code></pre>
                </div>
              </div>
              <small>
                <b-link @click="showOrHiddenRequestBodyEditBox">
                  <span v-if="showRequestBodyEditBox === false">Edit</span>
                  <span v-else>Close</span>
                </b-link>
              </small>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="12">
        <!-- 起到换行作用 -->
        <br>
      </b-col>
    </b-row>
    <div v-if="stepType !== 'teardown' ">
      <h6>
        <strong>Variable capture</strong>
      </h6>
      <b-row>
        <b-col md="12" style="margin-bottom: 10px;">
          <div v-for="(variable, index) in variables" :key="variable.uniqueKey">
            <b-row>
              <b-col md="3">
                <label style="padding-left: 12px;">Source</label>
              </b-col>
              <b-col md="4">
                <label>Name</label>
              </b-col>
              <b-col md="5" style="padding-left: 0px;">
                <label style="padding-left: 12px;">{{ getOption(variable).label }}</label>
              </b-col>
            </b-row>
            <b-form-group
              :state="errors.has('requestVars.variableName') ? false : null"
              :invalid-feedback="errors.first('requestVars.variableName')"
            >
              <b-input-group>
                <b-input-group-prepend>
                  <b-dropdown variant="outline-secondary" :text="getOption(variable).source">
                    <b-dropdown-item
                      @click="selectSource(variable, option)"
                      v-for="(option, index) in options"
                      :key="index"
                    >{{ option.source }}</b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input
                  name="variableName"
                  data-vv-as="variable name"
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  data-vv-scope="requestVars"
                  v-model="variable.name"
                  placeholder="variableName"
                  :state="errors.has('requestVars.variableName') ? false : null"
                />
                <b-form-input
                  v-model="variable.selector"
                  :disabled="getOption(variable).disabled"
                  :placeholder="getOption(variable).placeholder"
                />
                <b-input-group-append>
                  <b-btn @click="deleteVar(index)" variant="outline-secondary">×</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
        </b-col>
        <b-col md="12">
          <b-btn @click="addVar" variant="outline-secondary" size="sm">
            Capture
            <span v-if="variables.length">another</span>
            <span v-else>a</span>
            variable
          </b-btn>
        </b-col>
      </b-row>
    </div>
    <br>
    <b-row>
      <b-col md="6">
        <b-btn variant="outline-secondary" @click="cancel">Cancel</b-btn>
      </b-col>
      <b-col md="6" class="text-md-right">
        <b-btn @click="save" variant="success">Save</b-btn>
      </b-col>
    </b-row>
  </div>
</template>



<script>
import { clone } from "@/config/utils";
import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";
import BaseCodeMirror from "@/components/base/BaseCodeMirror";

let id = 0;

export default {
  name: "HttpReqGenerator",
  props: {
    step: {
      type: Object
    },
    stepType: {
      type: String
    }
  },
  components: {
    BaseAutoSuggest,
    BaseCodeMirror
  },
  data() {
    return {
      httpMethods: ["GET", "POST"],
      selectedMethod: "",
      defaultMethod: "GET",
      inputedRequestUrl: "",
      requestQuery: [],
      requestHeaders: [],
      requestBody: "",
      variables: [],
      showRequestBodyEditBox: false,
      options: [
        {
          source: "JSON body",
          label: "JSON path selector",
          placeholder: ".userId",
          disabled: false,
          selectorType: "JsonPathSelector",
          from: "body"
        },
        // {
        //   source: "XML body",
        //   label: "XPATH selector",
        //   placeholder: "//",
        //   disabled: false,
        //   selectorType: "XPathSelector",
        //   from: "body"
        // },
        // {
        //   source: "Text body",
        //   label: "Plain text selector",
        //   placeholder: "Entire response",
        //   disabled: true,
        //   selectorType: "PlainTextSelector",
        //   from: "body"
        // },
        {
          source: "Header",
          label: "Header name",
          placeholder: "X-Header",
          disabled: false,
          from: "header"
        }
      ],
      defaultFrom: "body",
      defaultSelectType: "JsonPathSelector"
    };
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    requestMethod: {
      get() {
        if (this.selectedMethod) {
          return this.selectedMethod;
        } else if (this.step && this.step.generator.settings.requestMethod) {
          return this.step.generator.settings.requestMethod;
        }
        return this.defaultMethod;
      },
      set(value) {
        this.selectedMethod = value;
      }
    },
    defaultRequestUrl() {
      return this.buildUrl(
        this.service.schemes.toLocaleLowerCase(),
        this.service.host
      );
    },
    requestUrl() {
      // 已存在
      if (this.step && this.step.generator.settings.requestHost) {
        const settings = this.step.generator.settings;

        return this.buildUrl(
          settings.requestScheme.toLocaleLowerCase(),
          settings.requestHost,
          settings.requestPath
        );
      }

      // 默认
      return this.defaultRequestUrl;
    },
    matchedServiceHost() {
      return this.inputedRequestUrl.includes(this.service.host);
    }
  },
  mounted() {
    if (this.step) {
      this.preLoadQuery();
      this.preLoadHeaders();
      this.preLoadVars();
      this.preLoadBody();
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel-new-or-update-step");
    },
    save() {
      this.$validator.validate().then(res => {
        if (res) {
          const settings = this.buildSettings();

          this.$emit("save", this.variables, settings);
        }
      });
    },
    preLoadBody() {
      this.requestBody = this.step.generator.settings.requestBody;
    },
    preLoadVars() {
      this.variables = clone(this.step.variables).map(variable => {
        this.$set(variable, "uniqueKey", id++);
        return variable;
      });
    },
    preLoadQuery() {
      this.requestQuery = clone(this.step.generator.settings.requestQuery).map(
        queryParam => {
          this.$set(queryParam, "uniqueKey", id++);
          return queryParam;
        }
      );
    },
    preLoadHeaders() {
      this.requestHeaders = clone(
        this.step.generator.settings.requestHeaders
      ).map(header => {
        this.$set(header, "uniqueKey", id++);
        return header;
      });
    },
    addParam() {
      this.requestQuery.push({
        key: "",
        value: "",
        enabled: true,
        uniqueKey: id++
      });
    },
    deleteParam(index) {
      this.requestQuery.splice(index, 1);
    },
    addHeader() {
      this.requestHeaders.push({
        key: "",
        value: "",
        enabled: true,
        uniqueKey: id++
      });
    },
    deleteHeader(index) {
      this.requestHeaders.splice(index, 1);
    },
    addVar() {
      this.variables.push({
        name: "",
        from: this.defaultFrom,
        selector: "",
        selectorType: this.defaultSelectType,
        uniqueKey: id++
      });
    },
    deleteVar(index) {
      this.variables.splice(index, 1);
    },
    getOption(variable) {
      return this.options.find(option => {
        return Object.is(option.selectorType, variable.selectorType);
      });
    },
    selectSource(variable, option) {
      this.$set(variable, "from", option.from);
      this.$set(variable, "selectorType", option.selectorType);

      if (this.isHeaderSource(option)) {
        this.$delete(variable, "selectorType");
      }
    },
    isHeaderSource(option) {
      return option.source === "Header";
    },
    buildUrl(scheme, host, path = "/") {
      return scheme + "://" + host + path;
    },
    buildSettings() {
      const url = new URL(this.inputedRequestUrl);

      const requestScheme = url.protocol.substring(0, url.protocol.length - 1);
      const requestHost = url.host;
      const requestPath = decodeURI(url.pathname);
      const requestHeaders = clone(this.requestHeaders).map(header => {
        this.$delete(header, "uniqueKey");
        return header;
      });
      const requestQuery = clone(this.requestQuery).map(queryParam => {
        this.$delete(queryParam, "uniqueKey");
        return queryParam;
      });
      const settings = {
        requestHeaders: requestHeaders,
        requestHost: requestHost,
        requestMethod: this.requestMethod,
        requestPath: requestPath,
        requestQuery: requestQuery,
        requestScheme: requestScheme,
        requestBody: this.requestBody
      };

      return settings;
    },
    showOrHiddenRequestBodyEditBox() {
      this.showRequestBodyEditBox = !this.showRequestBodyEditBox;
    }
  }
};
</script>




<style scoped>
</style>


