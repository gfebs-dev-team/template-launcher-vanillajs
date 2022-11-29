<script setup>
</script>

<template>
    <div class="boxed">
        <slot></slot>
    </div>
</template>

<style scoped>
.boxed {
      width: 800px;
      height: 650px;
      background-color: rgb(45 76 83);
      display: flex;
      margin: auto;
      border-radius: 1%;
      flex-direction: column;
    }
</style>