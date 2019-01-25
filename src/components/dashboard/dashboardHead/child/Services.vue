<template>
    <li 
        class="nav-item" 
        style="margin-left: 16px">
        <b-button-group>
            <b-dropdown 
                text="Services" 
                variant="primary"
                right>
                <div v-show="services">
                    <b-dropdown-header>Your services</b-dropdown-header>
                    <b-dropdown-item 
                        v-for="service in services" 
                        :key="service.id" 
                        :to="getServiceRouter(service)">
                        <img 
                            class="mr-1 align-baseline" 
                            width="16" 
                            height="16" 
                            :src="service.icon" 
                            alt=""> {{ service.name }}
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                </div>
                <b-dropdown-item>
                    <b-button 
                        :to="createNewServiceTo" 
                        class="mw-100 mt-1 mb-1" 
                        variant="success" 
                        :block=true>
                        Create new web service
                    </b-button>
                </b-dropdown-item>
            </b-dropdown>
        </b-button-group>
    </li>    
</template>



<script>
export default {
  name: "Services",
  data() {
    return {
      createNewServiceTo: "/dashboard/services/import"
    };
  },
  computed: {
    services() {
      return this.$store.state.services;
    }
  },
  methods: {
    getServiceRouter(service) {
      return { name: "services", params: { serviceId: service.id } };
    }
  }
};
</script>


<style scoped>
</style>
