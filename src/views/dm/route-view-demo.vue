<template>
  <div class="wrapper">
    <div>dddkdk</div>
    <input
      type="text"
      name="ddd"
      id
    >
    <ul id="main">
      <li>
        <router-link to="/user/food">商品</router-link>
      </li>
      <li>
        <router-link to="/user/rating">评价</router-link>
      </li>
      <li>
        <router-link to="/user/seller">商家</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from "vue-router";
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
};
const router = new VueRouter({
  routes: [{ path: "/user/:id", component: User }]
});
export default {
  name: "RouteViewDemo",
  components: {},
  props: {},
  data() {
    return {};
  },
  router
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
