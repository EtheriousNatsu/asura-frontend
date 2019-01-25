<template>
    <div>
        <b-row>
            <b-col md="12">
                <b-nav pills>
                    <b-nav-item
                        @click="selectTab(tab)"
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :active="tab.isActive">
                        {{tab.name}}
                    </b-nav-item>
                </b-nav>
                <b-row>
                    <b-col 
                        v-if="result.result === 'TestPending'"
                        class="text-center"
                        md="12">
                        <div style="transform: scaleX(-1);">
                            <i 
                                class="oi oi-loop-circular"
                                style="margin-right: 5px; font-size: 42px; animation-name: spin; animation-duration: 1s; animation-iteration-count: infinite; animation-timing-function: linear; animation-direction: reverse; margin-top: 25px; margin-bottom: 25px; color: rgb(129, 138, 145);"/>
                        </div>
                    </b-col>
                    <b-col 
                        v-else
                        md="12">
                        <component 
                            :is="currentComponent"
                            :result="result"
                            :type="type"/>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>



<script>
import HeadersDisplay from "@/components/test/results/child/nav/child/http/base/HeadersDisplay";
import QueryDisplay from "@/components/test/results/child/nav/child/http/base/QueryDisplay";
import BodyDisplay from "@/components/test/results/child/nav/child/http/base/BodyDisplay";

export default {
  name: "BaseHttpDisplay",
  props: {
    result: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    HeadersDisplay,
    QueryDisplay,
    BodyDisplay
  },
  data() {
    return {
      currentComponent: "BodyDisplay",
      requestTabsOptions: [
        {
          name: "Body",
          isActive: true,
          component: "BodyDisplay"
        },
        {
          name: "Headers",
          isActive: false,
          component: "HeadersDisplay"
        },
        {
          name: "Query",
          isActive: false,
          component: "QueryDisplay"
        }
      ],
      responseTabsOptions: [
        {
          name: "Body",
          isActive: true,
          component: "BodyDisplay"
        },
        {
          name: "Headers",
          isActive: false,
          component: "HeadersDisplay"
        }
      ]
    };
  },
  computed: {
    tabs() {
      if (this.type === "request") {
        return this.requestTabsOptions;
      } else if (this.type === "response") {
        return this.responseTabsOptions;
      }
    }
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });

      this.currentComponent = selectedTab.component;
    }
  }
};
</script>


<style scope>
</style>

