<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">
            Request headers
        </b-card-header>
        <div>
            <b-list-group flush>
                <b-list-group-item
                    v-for="(item, index) in existedHeaders"
                    :key="index">
                    <b-form 
                        v-if="editingHeaders.includes(index)"
                        data-vv-scope="updateForm"
                        @submit.prevent="updateTestByUpdateHeader(index)">
                        <b-row>
                            <b-col md="6">
                                <label>Header</label>
                                <base-auto-suggest
                                    rules="required"
                                    :name="'headerKey' + index"
                                    alias="header key"
                                    scope="updateForm"
                                    :initialValue="item.key"
                                    @input="item.key = $event">
                                </base-auto-suggest>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label="Value">
                                    <base-auto-suggest
                                        :initialValue="item.value"
                                        @input="item.value = $event">
                                    </base-auto-suggest>
                                </b-form-group>
                            </b-col>
                            <b-col 
                                class="text-md-right"
                                md="12">
                                <b-btn 
                                    variant="outline-secondary"
                                    style="margin-right: 5px;"
                                    @click="deleteEditingHeader(index)">
                                    Cancel
                                </b-btn>
                                <b-btn 
                                    variant="primary"
                                    type="submit">
                                    Save Header
                                </b-btn>
                            </b-col>
                        </b-row>
                    </b-form>

                    <div v-else>
                        <b-form-checkbox
                            @input="selectHeader(index, $event)"
                            style="min-height: 1.1rem; margin-right: 0; max-width:85%;word-break:break-all;"
                            v-model="item.enabled">
                            <span>
                                <samp style="display: inline-block;">
                                    {{ item.key }}:<var>{{ item.value }}</var>
                                </samp>
                            </span>
                        </b-form-checkbox>
                        <small class="float-right">
                            <i 
                                class="oi oi-pencil edit-icon"
                                v-b-tooltip.hover title="Edit Header"
                                @click="addEditingHeader(index)"/>
                            <b-link
                                @click="updateTestByDeleteHeader(index)"
                                class="text-dark">
                                <i 
                                    v-b-tooltip.hover title="Delete Header"
                                    class="oi oi-trash" />
                            </b-link>
                        </small> 
                    </div>                    
                </b-list-group-item>
            </b-list-group>

            <b-card-body>
                <b-form
                    data-vv-scope="addForm"
                    @submit.prevent="updateTestByAddHeaders">
                    <b-row>
                        <b-col md="12">
                            <b-row
                                v-for="(header, index) in headers"
                                :key="header.uniqueKey">
                                <b-col md="5">
                                    <label>Header</label>
                                    <base-auto-suggest
                                        rules="required"
                                        :name="'headerKey' + index"
                                        alias="header key"
                                        @input="header.key = $event"
                                        scope="addForm">
                                    </base-auto-suggest>
                                </b-col>
                                <b-col md="5">
                                    <b-form-group label="Value">
                                        <base-auto-suggest
                                            @input="header.value = $event">
                                        </base-auto-suggest>
                                    </b-form-group>
                                </b-col>
                                <b-col 
                                    md="2"
                                    style="padding-top: 15px;">
                                    <br>
                                    <b-link 
                                        @click="deleteHeader(index)"
                                        style="color: #373a3c;">
                                        <i 
                                            class="oi oi-trash"
                                            style="margin-right: 5px; font-size: 12px;" />
                                    </b-link>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col md="12">
                            <p>
                                <small>
                                    <b-link @click="addHeader">
                                        Add headers
                                    </b-link>
                                </small>
                            </p>

                        </b-col>
                    </b-row>
                    <b-row v-show="headers.length">
                        <b-col md="10">
                            <b-btn
                                class="float-left"
                                @click="cancelAddHeaders"
                                variant="outline-secondary">
                                Cancel
                            </b-btn>
                            <b-btn
                                type="submit"
                                class="float-right"
                                variant="primary">
                                <span>
                                    Add Headers
                                    <i 
                                        class="oi oi-check"
                                        style="margin-right: 5px; font-size: 12px;" />
                                </span>

                            </b-btn>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card-body>            
        </div>
    </div>
</template>



<script>
import { mapActions } from "vuex";

import BaseAutoSuggest from "@/components/base/BaseAutoSuggest";
import { clone } from "@/config/utils";

let id = 0;

export default {
  name: "RequestHeaders",
  components: {
    BaseAutoSuggest
  },
  data() {
    return {
      headers: [],
      editingHeaders: []
    };
  },
  computed: {
    existedHeaders() {
      return clone(this.test.headers);
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    }
  },
  methods: {
    ...mapActions(["updateThisTest"]),
    updateTestByAddHeaders() {
      this.$validator.validateAll("addForm").then(res => {
        if (res) {
          const test = clone(this.test);
          const newHeaders = clone(this.headers).map(header => {
            this.$delete(header, "uniqueKey");
            return header;
          });
          test.headers = test.headers.concat(newHeaders);
          this.updateThisTest(test).then(res => {
            this.cancelAddHeaders();
          });
        }
      });
    },
    updateTestByDeleteHeader(index) {
      const test = clone(this.test);
      test.headers.splice(index, 1);
      this.updateThisTest(test);
    },
    updateTestByUpdateHeader(index) {
      this.$validator.validateAll("updateForm").then(res => {
        if (res) {
          const test = clone(this.test);
          test.headers = this.existedHeaders;
          this.updateThisTest(test).then(res => {
            this.deleteEditingHeader(index);
          });
        }
      });
    },
    selectHeader(index, value) {
      const test = clone(this.test);
      test.headers[index].enabled = value;
      this.updateThisTest(test);
    },
    addHeader() {
      this.headers.push({ key: "", value: "", enabled: true, uniqueKey: id++ });
    },
    deleteHeader(index) {
      this.headers.splice(index, 1);
    },
    cancelAddHeaders() {
      this.headers.splice(0);
    },
    addEditingHeader(index) {
      this.editingHeaders.push(index);
    },
    deleteEditingHeader(headerIndex) {
      const index = this.editingHeaders.indexOf(headerIndex);
      this.editingHeaders.splice(index, 1);

      for (let attr in this.test.headers[headerIndex]) {
        if (this.existedHeaders[headerIndex].hasOwnProperty(attr))
          this.existedHeaders[headerIndex][attr] = this.test.headers[
            headerIndex
          ][attr];
      }
    }
  }
};
</script>


<style scoped>
</style>
