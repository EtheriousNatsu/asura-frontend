<template>
    <div>
      <b-card 
        no-body
        style="margin-bottom:.75rem;"
        :class="getClassObject(result)">
        <b-card-body style="padding-top:0;padding-bottom:0;">
          <b-row 
            style="cursor: pointer;"
            @click="showDetail">
            <b-col md="6">
              <p class="text-truncate">
                <b-link :to="{ name: 'services', params: { serviceId: service.id } }">
                  <img
                    :src="service.icon"
                    width="16"
                    height="16"
                    style="margin-right: 5px; vertical-align: baseline;">
                </b-link>
                <span>{{test.name}}</span>
                <small class="text-muted">
                  <span class="text-uppercase">
                    {{result.requestMethod}}
                  </span>
                  {{result.requestPath}}{{result.requestQuery ? '?' + result.requestQuery : null}}
                </small>
              </p>
            </b-col>
            <b-col md="6">
              <p class="float-right">
                <span>
                  <small class="text-muted">
                    {{result.responseStatusCode ? result.responseStatusCode + ' status code': null}}
                  </small>
                  <strong>{{result.responseTime ? ' · ' : null}}</strong>
                  <small 
                    class="text-muted"
                    style="margin-right: 10px;">
                    {{result.responseTime ?  parseInt(result.responseTime * 1000) + ' ms' : null}}
                  </small>
                </span>
                <i
                  v-bind:class="classObject"
                  style="margin-right: 5px; font-size: 12px;"
                />
              </p>
            </b-col>
          </b-row>
          <span v-if="showResultDetail">
            <result-progress :result="result"/>
            <result-nav :result="result"/>
          </span>
        </b-card-body>
      </b-card>        
    </div>
</template>




<script>
import ResultProgress from "@/components/test/results/child/progress/ResultProgress";
import ResultNav from "@/components/test/results/child/nav/ResultNav";

export default {
  name: "ResultDisplay",
  props: {
    result: {
      type: Object,
      required: true
    },
    isFirst: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ResultProgress,
    ResultNav
  },
  data() {
    return {
      showResultDetail: this.isFirst
    };
  },
  watch: {
    isFirst(newValue, oldValue) {
      this.showResultDetail = newValue;
    }
  },
  computed: {
    service() {
      return this.$store.getters.getService(this.$route.params.serviceId);
    },
    test() {
      return this.$store.getters.getTest(this.result.test);
    },
    classObject() {
      return {
        oi: true,
        "oi-chevron-bottom": this.showResultDetail,
        "oi-chevron-right": !this.showResultDetail
      };
    }
  },
  methods: {
    getClassObject(result) {
      return {
        "result-border-left-danger": result.result === "TestFail",
        "result-border-left-success": result.result === "TestPass",
        "result-border-left-warning": result.result === "TestPending",
        "thin-card": true
      };
    },
    showDetail() {
      this.showResultDetail = !this.showResultDetail;
    }
  }
};
</script>


<style>
.result-border-left-danger {
  border-left: 3px solid #d9534f;
}
.result-border-left-success {
  border-left: 3px solid #5cb85c;
}
.result-border-left-warning {
  border-left: 3px solid #f0ad4e;
}
.thin-card h1,
.thin-card h2,
.thin-card h3,
.thin-card h4,
.thin-card h5,
.thin-card h6,
.thin-card p {
  margin-top: 0.75rem !important;
  margin-bottom: 0.75rem !important;
}

.thin-card .thin-card-addon {
  height: 100%;
  padding-right: 0 !important;
}

.thin-card .thin-card-addon button {
  height: 100%;
  width: 100%;
  line-height: 2.2;
  border-radius: 0 2px 2px 0;
}
</style>

