<template>
    <nav id="navbar" class="navbar navbar-expand-md navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><h1>核心玩家</h1></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto mr-3">
            <!-- <li class="nav-item">
              <a href="" class="nav-link">編輯精選</a>
            </li>-->
            <li class="nav-item">
              <router-link to="/games" class="nav-link">遊戲商城</router-link>
            </li>
          </ul>
          <cart></cart>
        </div>
      </div>
    </nav>
</template>

<script>
import Cart from "@/components/front/cart.vue";
export default {
    components:{Cart}
}
</script>