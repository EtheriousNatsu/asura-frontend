<template>
    <div>
        <slot></slot>
        <div>
            <p>
                <small class="text-muted">Headers</small>
            </p>
            <div style="margin-top: -10px;">
                <b-row v-if="headers.length">
                    <b-col md="12">
                        <p 
                            v-for="(header, index) in headers" 
                            :key="index"
                            class="text-truncate">
                            <small>
                                <strong>
                                    {{header.key}}
                                </strong>
                            </small>
                            <i 
                                class="oi oi-arrow-right"
                                style="margin-right: 10px; font-size: 12px; margin-left: 10px; cursor: pointer;"/>
                            <var>{{header.value}}</var>
                        </p>
                    </b-col>
                </b-row>
                <div v-else>
                    <p>No header content</p>
                </div>
            </div>
        </div>
        <div>
            <p>
                <small class="text-muted">
                    Body
                </small>
            </p>
            <div v-if="initBody">
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
        </div>
    </div>
</template>



<script>
import BaseCodeMirror from "@/components/base/BaseCodeMirror";

const beautify_js = require("js-beautify").js_beautify;
const beautify_html = require("js-beautify").html_beautify;
const beautify_xml = require("xml-formatter");

export default {
  name: "BaseHttpDisplay",
  components: {
    BaseCodeMirror
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    initBody: {
      type: String,
      required: true
    },
    initBodySize: {
      type: Number,
      required: true
    },
    bodyType: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedBody() {
      if (this.bodyType === "application/json") {
        return beautify_js(this.initBody, {
          brace_style: "expand",
          wrap_line_length: "40"
        });
      } else if (this.bodyType === "text/html") {
        return beautify_html(this.initBody, {
          preserve_newlines: false,
          wrap_line_length: "40",
          indent_inner_html: true
        });
      } else if (this.bodyType === "text/plain") {
        return this.initBody;
      } else if (this.bodyType === "text/xml") {
        return beautify_xml(this.initBody);
      }
    },
    bodySize() {
      return this.initBodySize
        ? (this.initBodySize / 1024).toFixed(2) + "KiB"
        : null;
    },
    download() {
      let fileType = this.bodyType.split("/")[1];

      if (fileType === "plain") {
        fileType = "text";
      }

      return "response_body." + fileType;
    },
    downloadHref() {
      const blob = new Blob([this.initBody]);

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
      this.$copyText(this.initBody);
    }
  }
};
</script>


<style scoped>
</style>

