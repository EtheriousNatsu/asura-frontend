<template>
    <div>
        <div>
            <b-list-group flush>
                <b-list-group-item
                    v-for="assertion in assertions"
                    :key="assertion.id">
                    <assertion-display 
                        :assertion="assertion"/>
                </b-list-group-item>
            </b-list-group>
            <b-card-body>
                <assertion-form 
                    v-if="createAssertion"
                    v-on:cancel-create-or-update-assertion="createAssertion = false">
                    <p><strong>Add an assertion</strong></p>
                </assertion-form>
                <b-btn
                    v-else
                    @click="createAssertion = true"
                    variant="primary"
                    size="sm">
                    Add new assertion
                </b-btn>
            </b-card-body>
        </div>
    </div>
</template>




<script>
import AssertionForm from "./base/AssertionForm";
import AssertionDisplay from "./base/AssertionDisplay";

export default {
  name: "Assertions",
  components: {
    AssertionForm,
    AssertionDisplay
  },
  data() {
    return {
      createAssertion: false
    };
  },
  computed: {
    assertions() {
      return this.$store.getters.getAssertions(this.$route.params.testId);
    }
  }
};
</script>




<style scoped>
</style>
