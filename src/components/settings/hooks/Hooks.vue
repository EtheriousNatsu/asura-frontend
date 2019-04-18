<template>
    <div>
        <h4 style="margin-bottom: 5px;">Hooks & alerts</h4>
        <p class="text-muted">Get notified when your tests fail.</p>
        <hr>
        <br>

        <b-row>
            <b-col md="4">
                <p>
                    <i 
                        class="oi oi-envelope-closed"
                        :style="emailIconStyleObj"/>
                    <span style="vertical-align: middle;">
                        <strong>Email</strong>
                    </span>
                </p>
            </b-col>
            <b-col 
                md="4"
                class="text-sm-center text-muted">
                <small>{{emailHooks.length}} email hooks</small>
            </b-col>
            <b-col md="4">
                <b-btn
                    :to="{name: 'emailHook'}"
                    class="float-right"
                    variant="outline-secondary">
                    Manage
                </b-btn>
            </b-col>
        </b-row>
    </div>
</template>



<script>
export default {
  name: "Hooks",
  data() {
    return {
      emailIconStyleObj: {
        marginRight: "20px",
        fontSize: "28px",
        marginLeft: "2px",
        color: "rgb(85, 89, 92)",
        verticalAlign: "middle"
      }
    };
  },
  computed: {
    emailHooks() {
      return this.$store.state.hooks
        .filter(hook => hook.service == this.$route.params.serviceId)
        .filter(hook => {
          return hook.type == "EmailHook";
        });
    }
  }
};
</script>


<style scoped>
</style>

