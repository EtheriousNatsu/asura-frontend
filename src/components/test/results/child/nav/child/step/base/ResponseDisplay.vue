<template>
    <base-http-display 
      :headers="stepResult.responseHeaders"
      :initBody="responseBody"
      :initBodySize="responseBodySize"
      :bodyType="responseBodyType">
        <p>
            <span class="text-muted">
                <small class="text-muted">
                    {{statusCode}}
                </small>
                <strong v-if="statusCode"> · </strong>
                <small class="text-muted">
                    {{responseTime}}
                </small>
            </span>
        </p>    
    </base-http-display>
</template>



<script>
import BaseHttpDisplay from "@/components/test/results/child/nav/child/step/base/BaseHttpDisplay";

export default {
  name: "ResponseDisplay",
  props: {
    stepResult: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseHttpDisplay
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
    statusCode() {
      const code = this.stepResult.responseStatusCode;

      return code ? code + " status code" : null;
    },
    responseTime() {
      const costTime = this.stepResult.responseTime;

      return costTime ? parseInt(costTime * 1000) + "ms" : null;
    },
    responseBodyType() {
      const header = this.stepResult.responseHeaders.find(header => {
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
    responseBody() {
      return this.stepResult.responseBody ? this.stepResult.responseBody : "";
    },
    responseBodySize() {
      return this.stepResult.responseBodySize
        ? this.stepResult.responseBodySize
        : 0;
    }
  }
};
</script>



<style scope>
</style>

