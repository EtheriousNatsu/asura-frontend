<template>
    <div style="margin-top: 10px;">
      <div>
        <small class="text-muted">
          <i 
            :class="['oi', icon]"
            style="margin-right: 5px; font-size: 10px; vertical-align: initial;"/>          
          <strong>
            <slot name="header"/>
          </strong>
        </small>
      </div>
      <slot name="body" />
      <div>
        <slot name="footer" />
      </div>
    </div>
</template>


<script>
export default {
  name: "BaseEnvironmentDisplay",
  props: {
    icon: String
  }
};
</script>


<style scoped>
</style>

