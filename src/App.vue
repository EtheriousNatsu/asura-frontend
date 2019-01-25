<template>
  <div id="header">
    <home-head 
      v-if="showHead"/>
    <router-view/>
  </div>
</template>

<script>
import HomeHead from "@/components/HomeHead";

export default {
  name: "App",
  components: {
    HomeHead
  },
  computed: {
    showHead() {
      return this.$route.path.includes("dashboard") ? false : true;
    }
  }
};
</script>

<style>
/* 全局css， 重写了bootstrap-vue */

/* dropdown */
.dropdown-item:focus {
  background-color: transparent;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}
.dropdown-item:active {
  background-color: transparent;
  color: #212529;
}
.dropdown-item.active {
  background-color: #007bff;
}

/* loading */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

/* result */
.result-border-left-danger {
  border-left: 3px solid #d9534f !important;
}
.result-border-left-success {
  border-left: 3px solid #5cb85c !important;
}
.result-border-left-warning {
  border-left: 3px solid #f0ad4e !important;
}
.thin-card h1,
.thin-card h2,
.thin-card h3,
.thin-card h4,
.thin-card h5,
.thin-card h6,
.thin-card p {
  margin-top: 0.75rem !important;
  margin-bottom: 0.75rem !important;
}

.thin-card .thin-card-addon {
  height: 100%;
  padding-right: 0 !important;
}

.thin-card .thin-card-addon button {
  height: 100%;
  width: 100%;
  line-height: 2.2;
  border-radius: 0 2px 2px 0;
}

/* run */
.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3;
}

/* test */
.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
}

/* autosuggest */
.my-auto-suggest-container {
  flex: 1 1 auto;
}
#autosuggest__input {
  border-radius: 0;
  margin-left: -1px;
}

.autosuggest__results-container {
  position: relative;
  box-sizing: inherit;
}

.autosuggest__results {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  width: auto;
  min-width: 252px;
  position: absolute;
  z-index: 50;
  max-height: 380px;
  overflow-y: auto;
}
.autosuggest__results .card-header {
  border-width: 1px 1px 0px;
  border-top-style: solid;
  border-top-color: rgb(221, 221, 221);
  border-left-style: solid;
  border-left-color: rgb(221, 221, 221);
  border-right-style: solid;
  border-right-color: rgb(221, 221, 221);
  border-bottom-style: initial;
  border-bottom-color: initial;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #fbfbfb;
}
.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.autosuggest__results .autosuggest__results_item {
  cursor: default;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 12px;
  line-height: 1;
  border: 1px solid #ddd;
  background-color: #fff;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #0275d8;
}

/* results */
.list-group-item.active .list-group-item-text,
.list-group-item.active:focus .list-group-item-text,
.list-group-item.active:hover .list-group-item-text {
  color: #a8d6fe !important;
}
/* runs */
.rerun-link {
  color: #818a91;
}

.rerun-link:hover {
  color: #333;
}
</style>
