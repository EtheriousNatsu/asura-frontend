<template>
    <div>
      <label class="col-form-label">
        {{title}}
        <br>
      </label>
      <b-row>
        <b-col md="12">
          <b-row
            v-for="(item, index) in localList" 
            :key="item.id">
            <b-col md="5">
              <b-form-group
                :label="label"
                :invalid-feedback="errors.first(type + '[' + index + ']')"
                :state="errors.has(type + '[' + index + ']') ? false : null">
                <b-form-input 
                  :state="errors.has(type + '[' + index + ']') ? false : null"
                  :name="type + '[' + index + ']'"
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  data-vv-as="key"
                  v-model="item.key"/>
              </b-form-group>
            </b-col>
            <b-col md="5">
              <b-form-group label="Value">
                <b-form-input 
                  v-model="item.value"/>
              </b-form-group>
            </b-col>
            <b-col 
              md="2"
              style="padding-top: 10px;">
              <br>
              <b-link>
                <i 
                  class="oi oi-trash text-dark"
                  style="margin-right: 5px; font-size: 12px;"
                  @click="deleteItem(index)"/>
              </b-link>
            </b-col>
          </b-row>          
        </b-col>
        <b-col md="12">
          <b-btn
            variant="link"
            style="padding-left: 0px;"
            @click="addItem">
            {{btnText}}
          </b-btn>
        </b-col>
      </b-row>
    </div>
</template>


<script>
import { clone } from "@/config/utils";

let id = 0;

export default {
  name: "BaseEnvironmentForm",
  inject: ["$validator"],
  props: {
    title: String,
    label: String,
    type: String,
    btnText: String,
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localList: []
    };
  },
  computed: {
    dataPack() {
      return this.localList.map(item => {
        this.$delete(item, "uniqueKey");
        return item;
      });
    }
  },
  created() {
    if (this.list && this.list.length) {
      this.localList = clone(this.list).map(item => {
        this.$set(item, "uniqueKey", id++);
        return item;
      });
    }
  },
  methods: {
    deleteItem(index) {
      this.localList.splice(index, 1);
    },
    addItem() {
      this.localList.push({ key: "", value: "", uniqueKey: id++ });
    }
  }
};
</script>


<style scoped>
</style>

