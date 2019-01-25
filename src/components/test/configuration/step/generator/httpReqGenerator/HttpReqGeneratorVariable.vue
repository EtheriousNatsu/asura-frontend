<template>
    <div :style="styleObject">
        <span>
            <code><span>${</span>{{variable.name}}<span>}</span></code>
        </span>
        <i 
            class="oi oi-arrow-right" 
            style="margin-right: 5px; font-size: 12px;"/>
        <span>
            Select
            <var v-if="variable.selectorType === 'PlainTextSelector'">
                response text
            </var>
            <code v-else>{{ variable.selector }}</code>
            from
            <var>{{ variable.from }}</var>
        </span>
        <slot></slot>
    </div>
</template>




<script>
export default {
  name: "HttpReqGeneratorVariable",
  props: {
    variable: {
      type: Object
    },
    styleObject: {
      type: Object
    }
  }
};
</script>


<style scoped>
</style>

