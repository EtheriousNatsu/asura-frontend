<template>
    <div>
        <b-container>
            <b-row>
                <b-col
                    md="6"
                    offset-md="3">
                    <br>
                    <h3>Add a new web serivice</h3>
                    <p class="text-muted">
                        <small>
                            Start by entering a URL for the API or website you want to test
                        </small>
                    </p>
                    <hr>
                    <br>
                    <div>
                        <label 
                            for="url" 
                            style="font-weight: 700; font-size: 85%;">
                            <span v-html="currentImportObj.label"></span>
                        </label>
                        <b-row>
                            <b-col md="9">
                                <b-form-input
                                    @input="cleanError"
                                    name="url"
                                    type="text"
                                    v-model="url"
                                    :state="state"
                                    v-validate="{ required: true, url: {require_protocol: true} }"
                                    placeholder="https://example.com"></b-form-input>
                                <b-form-invalid-feedback>
                                    {{  errors.first('url')  }}
                                </b-form-invalid-feedback>
                            </b-col>
                            <b-col md="3">
                                <b-button
                                    @click.stop.prevent="validateBeforeSubmit"
                                    variant="primary"
                                    block>
                                    {{currentImportObj.buttonText}}
                                </b-button>
                            </b-col>
                        </b-row>
                        <div 
                            v-for="(option, index) in importTypeOptions" 
                            :key="index">
                            <img 
                                v-if="option.iconIsImg"
                                :src="option.imgPath" 
                                width="20"
                                :alt="option.text">
                            <small>
                                <i 
                                    v-if="!option.iconIsImg"
                                    :class="option.iconClassObj"
                                    style="margin-right: 5px; font-size: 14px; vertical-align: initial;"/>
                                <span v-if="option.value === importType">
                                    {{option.text}}
                                </span>
                                <b-link 
                                    v-else
                                    @click="selectImportType(option.value)"
                                    href="#">
                                    {{option.text}}
                                </b-link>
                            </small>
                        </div>
                    </div>
                    <div>
                        <hr>
                        <br>
                        <p>
                            <strong>Almost there!</strong>
                            <br>
                            <small class="text-muted">After importing a URL, you can start catching bugs and preventing downtime</small>
                        </p>
                        <div
                            v-for="(option, index) in descOptions" 
                            :key="index" 
                            style="margin-left: 0px; margin-bottom: 10px;">
                            <i 
                                :class="option.classObj"
                                style="margin-right: 5px; font-size: 18px; vertical-align: initial;"/>
                            {{option.text}}
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>




<script>
import { mapMutations } from "vuex";

import { newService } from "@/service/getData";
import { RECORD_NEW_SERVICE } from "@/store/mutation-types";

export default {
  name: "ServicesNew",
  data() {
    return {
      url: "",
      defaultImportType: "ImportUrl",
      selectedImportType: "",
      importTypeOptions: [
        {
          text: "Enter a URL",
          iconIsImg: false,
          value: "ImportUrl",
          label: "Enter a URL",
          buttonText: "Import URL",
          iconClassObj: "oi oi-link-intact"
        }
        // {
        //   text: "Import a Swagger/OpenAPI spec (v2 & v3)",
        //   iconIsImg: true,
        //   imgPath: "https://assertible.com/images/swagger-logo-art.png",
        //   value: "ImportOpenApiSpec",
        //   label: "Swagger spec <small>(JSON or YAML format)</small>",
        //   buttonText: "Import spec"
        // },
        // {
        //   text: "Import a Postman Collection",
        //   iconIsImg: true,
        //   imgPath:
        //     "https://s3-us-west-2.amazonaws.com/assertible/integrations/postman-mark-120.png",
        //   value: "ImportPostmanCollection",
        //   label: "Postman collection <small>(JSON format)</small>",
        //   buttonText: "Import spec"
        // }
      ],
      descOptions: [
        {
          text: " Validate your endpoints with tests and assertions",
          classObj: "oi oi-task"
        },
        {
          text: " Monitor uptime and performance with schedules",
          classObj: "oi oi-pulse"
        },
        {
          text: " Get immediately notified of any failures with alerts",
          classObj: "oi oi-bullhorn"
        },
        {
          text: " Collaborate and take action with your team members",
          classObj: "oi oi-people"
        }
      ]
    };
  },
  computed: {
    currentImportObj() {
      return this.importTypeOptions.find(
        option => option.value === this.importType
      );
    },
    importType: {
      get() {
        return this.selectedImportType
          ? this.selectedImportType
          : this.defaultImportType;
      },
      set(importType) {
        this.selectedImportType = importType;
      }
    },
    state() {
      return this.errors.count() ? false : null;
    }
  },
  methods: {
    ...mapMutations([RECORD_NEW_SERVICE]),
    cleanError() {
      this.errors.clear();
    },
    selectImportType(importType) {
      this.importType = importType;
      this.cleanError();
      this.url = "";
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.newService();
        }
      });
    },

    async newService() {
      const user_id = this.$store.state.userInfo.id;

      const response = await newService(user_id, this.importType, this.url);

      const serviceId = response.services[0].id;
      this.RECORD_NEW_SERVICE(response);
      this.$router.push({
        name: "services",
        params: { serviceId: serviceId }
      });
    }
  }
};
</script>



<style scoped>
</style>


