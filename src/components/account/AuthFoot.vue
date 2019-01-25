<template>
     <div>
        <b-card>
            <div>
                <p class="card-text">
                    {{ text }}
                    <b-link :to="to">{{ linkText }}</b-link>
                </p>
            </div>

        </b-card>
    </div>   
</template>






<script>
export default {
  name: "AuthFoot",
  props: {
    text: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
};
</script>



<style scoped>
</style>


