<template>
    <div>
        <b-navbar
            type="light"
            toggleable="md"
            class="border-bottom"
            :sticky="true">
            <b-navbar-toggle target="nav_collapse" />
            <b-container>
                <b-collapse
                    is-nav
                    id="nav_collapse">
                    <brand />
                <b-navbar-nav class="ml-auto">
                    <collaborate />
                    <services />
                    <Avatar />
                </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>



<script>
import Brand from "./child/Brand";
import Collaborate from "./child/Collaborate";
import Services from "./child/Services";
import Avatar from "./child/Avatar";

export default {
  name: "DashboardHead",
  components: {
    Brand,
    Collaborate,
    Services,
    Avatar
  }
};
</script>

<style scoped>
</style>

