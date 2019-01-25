<template>
    <div style="padding:1.25rem">
        <b-card style="background-color: rgb(247, 247, 249);">
            <p class="text-md-center">
                <i 
                    class="oi oi-loop-circular"
                    style="font-size: 1.5rem; color: rgb(129, 138, 145);"/>
            </p>
            <p class="text-md-center">
                {{ promptText }}
            </p>
            <p class="text-md-center">
                <b-btn 
                    @click="createStep"
                    variant="primary">
                    {{ btnText }}
                </b-btn>
            </p>
        </b-card>  
    </div>
  
</template>




<script>
export default {
  name: "Prompt",
  props: {
    promptText: {
      type: String
    },
    btnText: {
      type: String
    }
  },
  methods: {
    createStep() {
      this.$emit("create-step", true);
    }
  }
};
</script>





<style scoped>
</style>

