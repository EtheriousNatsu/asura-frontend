<template>
    <li 
        class="nav-item" 
        style="margin-left: 4px">
        <b-dropdown
            variant="link"
            toggle-class="rounded"
            no-caret
            right>
            <template slot="button-content">
                <img 
                    width="20"
                    height="20"
                    :src="icon"
                    style="margin-top: -7px">
                <i
                    class="oi oi-caret-bottom mr-1 align-middle"
                    style="font-size: 10px; margin-top: -10px; color: black"/>
            </template>
            <b-dropdown-header>
                Logged in as
                <br>
                <strong> {{ username }} </strong>
            </b-dropdown-header>
            <b-dropdown-divider />
            <div
                v-for="(item, index) in items" 
                :key="index">
                <b-dropdown-item 
                  :disabled="item.disable"
                  :to="item.to"
                  @click="onClick(item)"
                  exact>
                    {{item.text}}
                </b-dropdown-item>
                <b-dropdown-divider v-if="showDivider(index + 1)"/>
            </div>
        </b-dropdown>
    </li>    
</template>


<script>
import { RESET_STORE } from "@/store/mutation-types";
import { mapMutations } from "vuex";

export default {
  name: "Avatar",
  data() {
    return {
      icon: require("@/assets/profile-picture.png"),
      items: [
        { to: "/dashboard", text: "Dashboard" },
        { to: "#", text: "Settings", disable: true },
        { to: "#", text: "Invite Team Member", disable: true },
        { to: "#", text: "Organizations", disable: true },
        { to: "/docs", text: "Documentation" },
        { to: "#", text: "Logout" }
      ]
    };
  },
  computed: {
    username() {
      return this.$store.state.userInfo.username;
    }
  },
  methods: {
    ...mapMutations([RESET_STORE]),
    showDivider(index) {
      return index % 2 === 0;
    },
    onClick(item) {
      if (item.text === "Logout") {
        this.RESET_STORE();
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
</style>

