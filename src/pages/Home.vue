<template>
    <div>
      <main>
        <div 
          class="jumbotron jumbotron-fluid" 
          id="homepage-bg">
        </div>
      </main>
    </div>    
</template>


<script>
export default {
  name: "Home"
};
</script>


<style scoped>
#homepage-bg {
  padding-top: 100px;
  padding-bottom: 100px;
  color: rgb(247, 247, 249);
  background-size: cover;
  background-position: 0px center;
  background-image: url("/static/homepage-bg.jpg");
}
</style>


