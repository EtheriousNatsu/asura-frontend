<template>
    <b-modal
        body-bg-variant="warning"
        body-text-variant="light"
        ref="myModalRef">
        <template slot="modal-title">
            <slot name="title"></slot>
        </template>
        <div class="d-block">
            <p>
                <slot name="body"></slot>
                <strong>You can not revert this action.</strong>
            </p>
        </div>
        <b-btn
            variant="outline-danger"
            size="sm"
            slot="modal-footer"
            @click="onDelete"
            block>
            <span>I'm sure, delete </span>
        </b-btn>
    </b-modal>
</template>



<script>
export default {
  name: "BaseModal",
  methods: {
    show() {
      this.$refs.myModalRef.show();
    },
    hide() {
      this.$refs.myModalRef.hide();
    },
    onDelete() {
      this.$emit("delete");
    }
  }
};
</script>



<style scoped>
</style>


