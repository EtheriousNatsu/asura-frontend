<template>
    <b-navbar-brand :to="logoTo">
    <img
        id="logoImg"
        :src="logoImg"
        alt="logo">{{logoTitle}}
    </b-navbar-brand>    
</template>


<script>
export default {
  name: "Brand",
  data() {
    return {
      logoImg: require("@/assets/logo.svg"),
      logoTitle: "Asura",
      logoTo: "/dashboard"
    };
  }
};
</script>


<style scoped>
#logoImg {
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: 5px;
  width: 25px;
  height: auto;
}
</style>

