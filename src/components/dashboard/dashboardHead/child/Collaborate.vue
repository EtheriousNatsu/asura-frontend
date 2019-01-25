<template>
    <li class="nav-item">
        <a href="#">
            <span id="tooltip">
                <i
                    class="oi oi-people mr-1 mt-2"
                    style="color: rgb(129, 138, 145);vertical-align:middle" />
            </span>
            <b-tooltip
                target="tooltip"
                placement="leftbottom">
                <span style="font-size: 13px;">
                    Collaborate with your team
                </span>
            </b-tooltip> 
        </a>            
    </li>
</template>


<script>
export default {
  name: "Collaborate"
};
</script>


<style scoped>
</style>
