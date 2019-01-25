<template>
    <div>
      <b-card-header style="margin-bottom: -5px;">
        {{header}}
      </b-card-header>
      <div>
        <b-list-group flush>
          
        </b-list-group>
        <b-card-body>
          <div>
            <b-row>
              <b-col md="12">

              </b-col>
              <b-col md="12">
                <p>
                  <small>
                    <b-link>{{content}}</b-link>
                  </small>
                </p>
              </b-col>
            </b-row>  
            <b-row>
            </b-row>    
          </div>
        </b-card-body>
      </div>
    </div>
</template>



<script>
export default {
  name: "BaseRequestChildComponent",
  props: {
    header: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>

