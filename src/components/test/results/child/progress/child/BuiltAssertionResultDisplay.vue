<template>
    <div>
      <b-badge
        :variant="variant"
        style="margin-right: 5px; font-weight: 300; font-size: 11px;">
          {{label}}
      </b-badge>
      <span>{{$parent.getAssertionDesc(assertion)}}</span>
      <small 
        v-if="isAssertionFail"
        style="padding-left: 35px; display: block; margin-bottom: 5px;">
        <strong>Reason: </strong>
        <span>{{assertion.msg}}</span>
      </small>
      <small 
        v-else
        class="text-muted">
        - {{assertion.msg}}
      </small>
    </div>
</template>




<script>
export default {
  name: "BuiltAssertionResultDisplay",
  props: {
    assertion: {
      type: Object,
      required: true
    },
    badgeVariant: {
      type: String,
      required: true
    },
    badgeLabel: {
      type: String,
      required: true
    },
    isAssertionFail: Boolean
  },
  computed: {
    variant() {
      return this.isAssertionFail ? this.badgeVariant : "secondary";
    },
    label() {
      return this.isAssertionFail ? this.badgeLabel : "CORE";
    }
  }
};
</script>


<style scoped>
</style>

