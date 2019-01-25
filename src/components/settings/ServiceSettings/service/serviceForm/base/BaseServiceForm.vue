<template>
    <b-form-group
        horizontal
        :label-cols="2"
        :invalid-feedback="errors.first(label)"
        :state="errors.has(label) ? false : null">
        <template slot="label">
            <strong>{{label}}</strong>
        </template>
        <b-form-input
            :name="label"
            v-validate="validateRule"
            v-model="localValue"
            :state="errors.has(label) ? false : null"/>
    </b-form-group>    
</template>


<script>
export default {
  name: "BaseServiceForm",
  inject: ["$validator"],
  props: {
    label: {
      type: String,
      required: true
    },
    validateRule: {
      type: String,
      default: "required"
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localValue: this.value
    };
  }
};
</script>


<style scoped>
</style>

