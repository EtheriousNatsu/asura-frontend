<template>
    <div>
        <b-row v-if="querys">
            <b-col md="12">
                <p 
                    v-for="(query, index) in querys" 
                    :key="index"
                    class="text-truncate">
                    <small>
                        <strong>{{query.key}}</strong>
                    </small>
                    <i 
                        class="oi oi-arrow-right"
                        style="margin-right: 10px; font-size: 12px; margin-left: 10px;"/>
                    <var>{{query.value}}</var>
                </p>
            </b-col>
        </b-row>
        <div v-else>
            <p>No query parameters</p>
        </div>
    </div>
</template>



<script>
export default {
  name: "QueryDisplay",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    querys() {
      if (this.result.requestQuery) {
        let v1 = [];
        let v2 = this.result.requestQuery.split("&");
        v2.forEach(element => {
          let v3 = decodeURI(element).split("=");
          let o = { key: v3[0], value: v3[1] };
          v1.push(o);
        });

        return v1;
      }

      return null;
    }
  }
};
</script>


<style scoped>
</style>

