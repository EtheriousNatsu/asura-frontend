<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">
            Query parameters
        </b-card-header>
        <div>
            <b-list-group flush>
                <b-list-group-item
                    v-for="(item, index) in existedParams"
                    :key="index">
                    <b-form 
                        v-if="editingParams.includes(index)"
                        data-vv-scope="updateForm"
                        @submit.prevent="updateTestByUpdateParam(index)">
                        <b-row>
                            <b-col md="6">
                                <label>Parameter</label>
                                <base-auto-suggest
                                    ref="updateSuggest"
                                    rules="required"
                                    :name="'paramKey' + index"
                                    alias="param key"
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
                                    @click="deleteEditingParam(index)">
                                    Cancel
                                </b-btn>
                                <b-btn 
                                    variant="primary"
                                    type="submit">
                                    Save Param
                                </b-btn>
                            </b-col>
                        </b-row>                        
                    </b-form>

                    <div v-else>
                        <b-form-checkbox
                            @input="selectParam(index, $event)"
                            style="min-height: 1.1rem; margin-right: 0;"
                            :checked="item.enabled"/>
                        <span>
                            <samp style="display: inline-block;">
                                {{ item.key }}=<var>{{ item.value | truncate}}</var>
                            </samp>
                        </span>
                        <small class="float-right">
                            <i 
                                class="oi oi-pencil edit-icon"
                                v-b-tooltip.hover title="Edit Param"
                                @click="addEditingParam(index)"/>
                            <b-link
                                class="text-dark">
                                <i 
                                    @click="updateTestByDeleteParam(index)"
                                    v-b-tooltip.hover title="Delete Param"
                                    class="oi oi-trash" />
                            </b-link>
                        </small> 
                    </div>                    
                </b-list-group-item>
            </b-list-group>

            <b-card-body>
                <b-form 
                    data-vv-scope="addForm"
                    @submit.prevent="updateTestByAddParams">
                    <b-row>
                        <b-col md="12">
                            <b-row
                                v-for="(param, index) in params"
                                :key="param.uniqueKey">
                                <b-col md="5">
                                    <label>Param</label>
                                    <base-auto-suggest
                                        ref="addSuggest"
                                        rules="required"
                                        :name="'paramKey' + index"
                                        alias="param key"
                                        @input="param.key = $event" 
                                        scope="addForm"/>
                                </b-col>
                                <b-col md="5">
                                    <b-form-group label="Value">
                                        <base-auto-suggest 
                                            @input="param.value = $event" />
                                    </b-form-group>
                                </b-col>
                                <b-col 
                                    md="2"
                                    style="padding-top: 15px;">
                                    <br>
                                    <b-link 
                                        @click="deleteParam(index)"
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
                                    <b-link @click="addParam">
                                        Add parameter
                                    </b-link>
                                </small>
                            </p>

                        </b-col>
                    </b-row>
                    <b-row v-show="params.length">
                        <b-col md="10">
                            <b-btn
                                class="float-left"
                                @click="cancelAddParams"
                                variant="outline-secondary">
                                Cancel
                            </b-btn>
                            <b-btn  
                                type="submit"
                                class="float-right"
                                variant="primary">
                                <span>
                                    Add Parameters
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
  name: "RequestParams",
  components: {
    BaseAutoSuggest
  },
  data() {
    return {
      params: [],
      editingParams: []
    };
  },
  computed: {
    existedParams() {
      return clone(this.test.params);
    },
    test() {
      return this.$store.getters.getTest(this.$route.params.testId);
    }
  },
  methods: {
    ...mapActions(["updateThisTest"]),
    updateTestByAddParams() {
      this.$validator.validateAll("addForm").then(res => {
        if (res) {
          const test = clone(this.test);
          const newParams = clone(this.params).map(param => {
            this.$delete(param, "uniqueKey");
            return param;
          });
          test.params = test.params.concat(newParams);
          this.updateThisTest(test).then(res => {
            this.cancelAddParams();
          });
        }
      });
    },
    updateTestByDeleteParam(index) {
      const test = clone(this.test);
      test.params.splice(index, 1);
      this.updateThisTest(test);
    },
    updateTestByUpdateParam(index) {
      this.$validator.validateAll("updateForm").then(res => {
        if (res) {
          const test = clone(this.test);
          test.params = this.existedParams;
          this.updateThisTest(test).then(res => {
            this.deleteEditingParam(index);
          });
        }
      });
    },
    selectParam(index, value) {
      const test = clone(this.test);
      test.params[index].enabled = value;
      this.updateThisTest(test);
    },
    addParam() {
      this.params.push({ key: "", value: "", enabled: true, uniqueKey: id++ });
    },
    deleteParam(index) {
      this.params.splice(index, 1);
    },
    cancelAddParams() {
      this.params.splice(0);
    },
    addEditingParam(index) {
      this.editingParams.push(index);
    },
    deleteEditingParam(paramIndex) {
      const index = this.editingParams.indexOf(paramIndex);
      this.editingParams.splice(index, 1);

      for (let attr in this.test.params[paramIndex]) {
        if (this.existedParams[paramIndex].hasOwnProperty(attr))
          this.existedParams[paramIndex][attr] = this.test.params[paramIndex][
            attr
          ];
      }
    }
  }
};
</script>


<style scoped>
</style>
