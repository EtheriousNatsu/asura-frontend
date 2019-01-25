<template>
    <div>
      <b-badge
        :variant="badgeVariant"
        style="margin-right: 5px; font-weight: 300; font-size: 11px;">
          {{badgeLabel}}
      </b-badge>
      <span>{{$parent.getAssertionDesc(assertion)}}</span>
      <small>
        <var>{{assertion.property}}</var>
      </small>
      <span>{{assertion.comparator | getComparatorDesc}}</span>
      <small>
        <var>{{assertion.target}}</var>
      </small>
      <div 
        v-if="isAssertionFail"
        style="white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word; margin-top: -5px; margin-bottom: 10px; padding-left: 35px;">
        <small>
          <strong>Reason: </strong>
          <span>{{assertion.errors.join(" \n ")}}</span>
        </small>
      </div>
    </div>
</template>



<script>
export default {
  name: "UserAssertionResultDisplay",
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
  filters: {
    getComparatorDesc(value) {
      const stringList = value.split(/(?=[A-Z])/);
      stringList.splice(0, 1);

      return stringList.join(" ").toLowerCase();
    }
  }
};
</script>


<style scoped>
</style>

