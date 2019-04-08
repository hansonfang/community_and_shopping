<template>
  <div>
    <div class="text-div">
      <h1 class="number">404</h1>
    </div>
    <router-link to="/index">
      <button class="btn">返回</button>
    </router-link>

    <div class="tumble"></div>
  </div>
</template>

<style scoped>
body {
  font-family: "Comfortaa", cursive;
  overflow: hidden;
  background: #eee;
}

.number {
  position: relative;
  text-align: center;
  animation: mymove 2s forwards;
}
.number::before {
  content: "";
  display: block;
  position: absolute;
  left: 0%;
  right: 0%;
  margin: auto;
  width: 210px;
  height: 100px;
  background: #bf360c;
  clip-path: polygon(
    0% 97%,
    0% 90%,
    25% 80%,
    30% 10%,
    40% 0%,
    50% 5%,
    60% 0%,
    70% 10%,
    75% 80%,
    100% 90%,
    100% 97%,
    50% 100%
  );
  border-radius: 30px;
}
.number::after {
  content: "你来错地方了。。。";
  display: block;
  font-size: 10%;
}

.btn {
  position: relative;
  top: 150px;
  display: block;
  margin: 0 auto;
  background: none;
  border: 2px solid #bf360c;
  border-radius: 5px;
  padding: 3px 8px;
  color: black;
}

.tumble {
  position: absolute;
  bottom: 0;
  width: 100px;
  height: 100px;
  left: -120px;
  background: url("../assets/images/404_page.png");
  background-size: contain;
  animation: tumbleRoll 7.5s infinite forwards;
}

/* Standard syntax */
@keyframes mymove {
  0% {
    top: 0px;
    font-size: initial;
  }
  100% {
    top: 100px;
    font-size: 200px;
  }
}

@keyframes tumbleRoll {
  0% {
    left: -120px;
  }
  10% {
    bottom: 30px;
  }
  15% {
    bottom: 0px;
  }
  40% {
    bottom: 30px;
  }
  55% {
    bottom: 0px;
  }
  70% {
    bottom: 30px;
  }
  75% {
    bottom: 0px;
  }
  100% {
    left: 100vw;
    transform: rotate(600deg);
  }
}
</style>
