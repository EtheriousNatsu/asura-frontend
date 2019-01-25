<template>
    <div>
        <b-card-header style="margin-bottom: -5px;">Manage</b-card-header>
        <div class="card-body">
            <b-btn 
                @click="deleteTest"
                variant="danger">
                <span>
                    <i 
                        class="oi oi-trash"
                        style="margin-right: 5px; font-size: 12px;"/>
                    Delete test
                </span>
            </b-btn>
            <div 
                class="text-muted"
                style="margin-top: 10px;">
                <small>Note: Deleting this test will permanently remove all data for this test.</small>
            </div>
        </div>
    </div>
</template>



<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

import { DELETE_TEST } from "@/store/mutation-types";

export default {
  name: "TestManage",
  methods: {
    ...mapMutations([DELETE_TEST]),
    ...mapActions(["deleteThisTest"]),
    deleteTest() {
      const testId = Number(this.$route.params.testId);

      this.deleteThisTest(testId).then(() => {
        this.$router.push({
          name: "tests",
          params: { serviceId: this.$route.params.serviceId }
        });
        this.DELETE_TEST(testId);
      });
    }
  }
};
</script>


<style scoped>
</style>

