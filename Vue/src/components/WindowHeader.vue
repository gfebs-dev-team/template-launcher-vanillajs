<script setup>
</script>

<template>
    <div class="windowHeader">
        <slot>
        </slot>
    </div>
</template>

<style scoped>
.windowHeader {
    height: 50px;
    background-color: rgb(30 163 222);
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 2%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
</style>