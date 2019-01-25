<template>
    <b-form-group 
        horizontal 
        :label-cols="2">
        <template slot="label">
            <strong>Schemes</strong>
        </template>
        <b-form-radio-group 
            class="pt-2" 
            v-model="localValue"
            :options="options"/>
        </b-form-group>    
</template>


<script>
export default {
  name: "ServiceSchemesForm",
  inject: ["$validator"],
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        { text: "HTTP", value: "HTTP" },
        { text: "HTTPS", value: "HTTPS" }
      ]
    };
  },
  computed: {
    localValue() {
      return this.service.schemes.toUpperCase();
    }
  },
  methods: {
    getDataPack() {
      return {
        schemes: this.localValue
      };
    }
  }
};
</script>

<style scoped>
</style>

