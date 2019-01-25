<template>
    <b-card
        header="Environments"
        no-body>
        <b-list-group flush>
            <environment-display 
                v-for="environment in environments"
                :key="environment.id"
                :environment="environment"/>
            <b-list-group-item v-if="showEnvironmentForm">
              <environment-form 
                v-on:cancel-create-or-update-environment="showOrHiddenEnvironmentForm"/>
            </b-list-group-item>
            <b-card-body>
                <b-btn
                    @click="showOrHiddenEnvironmentForm"
                    variant="outline-secondary"
                    size="sm">
                    Add environment
                </b-btn>
            </b-card-body>
        </b-list-group>
    </b-card>
</template>


<script>
import EnvironmentDisplay from "./environmentDisplay";
import EnvironmentForm from "./environmentForm";

export default {
  name: "Environments",
  props: {
    environments: {
      type: Array,
      required: true
    }
  },
  components: {
    EnvironmentDisplay,
    EnvironmentForm
  },
  data() {
    return {
      showEnvironmentForm: false
    };
  },
  methods: {
    showOrHiddenEnvironmentForm() {
      this.showEnvironmentForm = !this.showEnvironmentForm;
    }
  }
};
</script>


<style scoped>
</style>

