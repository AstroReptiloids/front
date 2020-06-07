<template>
  <router-view name="layout">
    <router-view slot="toolbar_items" name="toolbar_items"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
