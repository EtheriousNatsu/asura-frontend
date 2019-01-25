<template>
    <base-http-display
      :headers="stepResult.requestHeaders"
      :initBody="requestBody"
      :initBodySize="requestBodySize"
      :bodyType="requestBodyType">
        <div>
          <p>
            <small class="text-muted">
              Query
            </small>
          </p>
          <code v-if="requestQuery">
            {{requestQuery}}
          </code>
          <span v-else>No query</span>
        </div>    
    </base-http-display>
</template>


<script>
import BaseHttpDisplay from "@/components/test/results/child/nav/child/step/base/BaseHttpDisplay";
import { countUtf8 } from "@/utils";

export default {
  name: "RequestDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseHttpDisplay
  },
  computed: {
    requestQuery() {
      return this.stepResult.requestQuery;
    },
    requestBodySize() {
      return this.stepResult.requestBody
        ? countUtf8(this.stepResult.requestBody)
        : 0;
    },
    requestBody() {
      return this.stepResult.requestBody ? this.stepResult.requestBody : "";
    },
    requestBodyType() {
      if (this.stepResult.requestBody) {
        try {
          JSON.parse(this.stepResult.requestBody);
          return "application/json";
        } catch (error) {
          return "text/text/plain";
        }
      }

      return "text/text/plain";
    }
  }
};
</script>


<style scoped>
</style>
