<template>
            <div v-if="body">
                <b-row>
                    <b-col md="6">
                    </b-col>
                    <b-col
                        md="6"
                        class="text-muted text-right">
                        <small class="text-muted">{{bodySize}}</small>
                        <strong> · </strong>
                        <b-link 
                            @click="doCopy"
                            v-b-tooltip.hover title="Copy to clipboard"
                            class="text-muted">
                            <i 
                                class="oi oi-clipboard"
                                style="margin-right: 5px; font-size: 12px; cursor: pointer;"/>
                        </b-link>
                        <b-link
                            v-b-tooltip.hover title="Download as file"
                            class="text-muted"
                            :href="downloadHref"
                            :download="download">
                            <i 
                                class="oi oi-cloud-download"
                                style="margin-right: 5px; font-size: 12px;"/>
                        </b-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <br>
                        <base-code-mirror 
                            :value="formattedBody"
                            :options="codeMirrorOptions"/>
                        <br>
                    </b-col>
                </b-row>
            </div>
            <div v-else>
                <p>No body content</p>
            </div>
</template>




<script>
import BaseCodeMirror from "@/components/base/BaseCodeMirror";
import { countUtf8 } from "@/utils";

const beautify_js = require("js-beautify").js_beautify;
const beautify_html = require("js-beautify").html_beautify;
const beautify_xml = require("xml-formatter");

export default {
  name: "BodyDisplay",
  props: {
    result: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    BaseCodeMirror
  },
  data() {
    return {
      rawTypeOptions: [
        "application/json",
        "text/html",
        "text/xml",
        "text/plain"
      ]
    };
  },
  computed: {
    body() {
      if (this.type === "response") {
        return this.result.responseBody;
      } else if (this.type === "request") {
        return this.result.requestBody;
      }
    },
    formattedBody() {
      if (this.bodyType === "application/json") {
        return beautify_js(this.body, {
          brace_style: "expand",
          wrap_line_length: "40"
        });
      } else if (this.bodyType === "text/html") {
        return beautify_html(this.body, {
          preserve_newlines: false,
          wrap_line_length: "40",
          indent_inner_html: true
        });
      } else if (this.bodyType === "text/plain") {
        return this.body;
      } else if (this.bodyType === "text/xml") {
        return beautify_xml(this.body);
      }
    },
    bodyType() {
      if (this.type === "response") {
        return this.responseBodyType;
      } else if (this.type === "request") {
        return this.requestBodyType;
      }
    },
    requestBodyType() {
      if (this.result.requestBody) {
        try {
          JSON.parse(this.result.requestBody);
          return "application/json";
        } catch (error) {
          return "text/plain";
        }
      }

      return "text/text/plain";
    },
    responseBodyType() {
      const header = this.result.responseHeaders.find(header => {
        return header.key === "Content-Type";
      });

      // Content-Type header 存在
      if (header) {
        const values = header.value.split(";");
        const type = values.find(value => {
          return this.rawTypeOptions.includes(value);
        });

        if (type) {
          return type;
        }
      }

      return "text/plain";
    },
    bodySize() {
      let size = 0;

      if (this.type === "response") {
        size = this.result.responseBodySize ? this.result.responseBodySize : 0;
      } else if (this.type === "request") {
        size = this.result.requestBody ? countUtf8(this.result.requestBody) : 0;
      }

      return size ? (size / 1024).toFixed(2) + "KiB" : null;
    },
    download() {
      let fileType = this.bodyType.split("/")[1];

      if (fileType === "plain") {
        fileType = "text";
      }

      return "response_body." + fileType;
    },
    downloadHref() {
      const blob = new Blob([this.body]);

      return URL.createObjectURL(blob);
    },
    codeMirrorOptions() {
      return {
        readOnly: true,
        mode: this.bodyType
      };
    }
  },
  methods: {
    doCopy() {
      this.$copyText(this.body);
    }
  }
};
</script>

<style scoped>
</style>
