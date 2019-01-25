<template>
    <div>
        <b-row v-if="headers.length">
            <b-col md="12">
                <p 
                    v-for="(header, index) in headers" 
                    :key="index"
                    class="text-truncate">
                    <small>
                        <strong>{{header.key}}</strong>
                    </small>
                    <i 
                        class="oi oi-arrow-right"
                        style="margin-right: 10px; font-size: 12px; margin-left: 10px;"/>
                    <var>{{header.value}}</var>
                </p>
            </b-col>
        </b-row>
        <div v-else>
            <p>No header content</p>
        </div>
    </div>
</template>




<script>
export default {
  name: "HeadersDisplay",
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
  computed: {
    headers() {
      if (this.type === "request") {
        return this.result.requestHeaders;
      } else if (this.type === "response") {
        return this.result.responseHeaders;
      }
    }
  }
};
</script>


<style scoped>
</style>

