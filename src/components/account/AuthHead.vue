<template>
    <div class="text-md-center">
        <b-container>
            <h1>
                <img 
                    src="@/assets/logo.svg" 
                    alt="" 
                    id="header-img">{{ text }}
            </h1>
        </b-container>
        <hr>
    </div>   
</template>




<script>
export default {
    name: 'AuthHead',
    props: {
        'text': {
            type: String,
            required: true,
        }
    },   
}
</script>




<style scoped>
#header-img {
    display: block; 
    margin: auto auto 20px; 
    width: 75px; 
    height: auto;
}
</style>


