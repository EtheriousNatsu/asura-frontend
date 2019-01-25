<template>
  <div>
    <b-container>
      <div>
        <br>
        <hr>
        <br>
          <b-row class="align-items-center">
            <b-col md="5">
              <b-nav>
                <b-nav-text>
                  2018 - 2019
                </b-nav-text>
              </b-nav>
            </b-col>
            <b-col 
                md="2" 
                class="text-center" >
              <b-link 
                to="/" 
                class="text-muted">Asura</b-link>
            </b-col>
            <b-col 
                md="5" 
                class="">
              <b-nav class="justify-content-end" >
                <b-nav-item to="/login">Login</b-nav-item>
                <b-nav-item 
                    to="/signup" 
                    style="width: 65px">Signup</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
      </div>
    </b-container>

  </div>
</template>




<script>
export default {
  name: "DashboardFoot"
};
</script>



<style scoped>
</style>


