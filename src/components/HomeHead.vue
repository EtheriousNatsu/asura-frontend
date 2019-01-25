<template>
    <div>
        <b-navbar 
        toggleable="md" 
        type="light"
        class="bg-faded">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-container>
                    <b-navbar-brand to="/">
                        <img src="@/assets/logo.svg"
                            width="25px"
                            height="auto"
                            class="d-inline-block mr-1 align-text-bottom"
                            alt="BV">Asura</b-navbar-brand>
                    <b-collapse 
                    id="nav_collapse"
                    is-nav>
                        <b-navbar-nav  class="ml-auto">
                            <b-nav-item to="/docs">Docs</b-nav-item>
                            <li 
                                class="nav-item"
                                v-if="isAuth">
                                <b-link
                                    to="/dashboard"
                                    class="btn btn-success">Dashboard</b-link>
                            </li>
                            <li class="nav-item" v-else>
                                <span class="nav-item">
                                    <b-link
                                        to="/login"
                                        class="btn btn-secondary">Sign in</b-link>
                                </span>
                                <span>
                                    <b-link
                                        to="/signup"
                                        class="btn btn-success">Sign up</b-link>
                                </span>
                            </li>
                        </b-navbar-nav>
                     </b-collapse>

                </b-container>

        </b-navbar>

    </div>
</template>



<script>

export default {
    name: "BaseHead",
    computed: {
        isAuth() {
            return this.$store.state.token;
        }
    },
}
</script>



<style scoped>

/* #logoImg {
    display: inline-block; 
    vertical-align: text-bottom;
    margin-right: 5px; 
    width: 25px; 
    height: auto;
} */

.bg-faded {
    background-color: #f7f7f9;
}
</style>
