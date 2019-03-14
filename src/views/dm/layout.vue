<template>
  <div class="dash-board-panel">
    <div class="dash-board-title">hello
      <slot name="title"></slot>
    </div>
    <div class="dash-board-content">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.dash-board-panel {
  margin: 0.3rem;
  border: solid 0px #e6a23c;
  box-shadow: 0 0.1rem 0.5rem 0 rgba(10, 9, 7, 0.3);
  border-radius: 0.5rem;
}
.dash-board-title {
  padding: 0.3rem 0.5rem;
  /* border-bottom: 1px solid #ebeef5; */
  font-size: 1.2rem;
  text-align: center;
}
.dash-board-content {
  padding: 0.3rem 0.5rem;
}
.dash-title {
}
</style>
<style>
.title-icon {
  font-size: 1.3rem;
}
</style>
