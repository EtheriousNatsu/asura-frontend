<template>
    <div>
        <request-variables v-on:switch-to-setup="$emit('switch-to-setup')"/>
        <request-params />
        <request-headers/>
        <request-body />
    </div>
</template>



<script>
import RequestVariables from "./RequestVariables";
import RequestParams from "./RequestParams";
import RequestHeaders from "./RequestHeaders";
import RequestBody from "./RequestBody";

export default {
  name: "Request",
  components: {
    RequestVariables,
    RequestParams,
    RequestHeaders,
    RequestBody
  }
};
</script>



<style>
.edit-icon {
  margin-right: 5px;
  font-size: 12px;
  cursor: pointer;
}
</style>
