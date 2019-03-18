<template>
  <div class="wrapper">
    <div>路由嵌套demo</div>
    <input
      type="text"
      name="ddd"
      value="ddd"
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
    <div>after router view</div>
  </div>
</template>

<script>
import VueRouter from "vue-router";
const User = {
  template: `
    <div class="user">
      <h2>你选择： {{ $route.params.id }}</h2>
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
