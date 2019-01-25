<template>
  <div class="row">
    <dt class="col-md-3 text-muted">
        <slot name="label"></slot>
    </dt>
    <dd class="col-md-9 text-truncate">
        <slot name="content"></slot>
    </dd>
  </div>    
</template>


<script>
export default {
  name: "BaseServiceDisplay"
};
</script>


<style scoped>
</style>
