<script setup>
import Close from '../components/Close.vue';
import Window from '../components/Window.vue';
import WindowHeader from '../components/WindowHeader.vue';
import { openLRC } from '../helpers/scormFunctions';
</script>

<template>
  <main>
    <Window>
      <WindowHeader>
        <Close />
      </WindowHeader>
      <div class="homeTitle">
        <h1>Financial Management School</h1>
        <h2>L210E Redirect Launcher</h2>
      </div>

      <div class="homeParagraph">
        <span>
          After completing this course, review all the modules and test for the <br />
          GFEBS Financials Process Overview Post Assessment.
        </span>
        <span class="homeNote">
          Note: This will launch module content and take you to an external .Mil website.
        </span>
      </div>

      <button class="buttonDefault" @click="openLRC()">Click Here to head to LRC</button>
    </Window>
  </main>
</template>

<style scoped>
.homeTitle {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-weight: bold;
  margin: 1%;
}

h1 {
  font-weight: bold;
  margin-bottom: 0%;
  margin: 2% 2% 0% 2%;
}

.homeImage {
  display: flex;
  justify-content: center;
  height: 180px;
}

.homeParagraph {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1% 10%;
  align-items: center;
}

.homeNote {
  color: rgb(247 222 154);
  font-weight: bold;
}

span {
  text-align: center;
}

.buttonDefault {
  padding: 2%;
  margin: 1%;
  background-color: rgb(36 46 44);
  color: white;
  border-radius: 5px;
}
</style>