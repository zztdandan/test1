<template>
  <div class="dash-board-panel" :style="dashboard_bg">
    <div>
      <div class="dash-board-title">{{title}}</div>
      <slot name="title"></slot>
    </div>
    <div class="dash-board-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      bg: {
        type: String,
        default: "white"
      },
      fc: {
        type: String,
        default: "black"
      },
      title: { type: String, default: "" }
    },
    name: "lg-dash-board",
    computed: {
      dashboard_bg() {
        return "background-color:" + this.bg + ";color:" + this.fc + ";";
      }
    }
  };
</script>

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
