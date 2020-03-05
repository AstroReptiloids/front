<template>
  <router-view name="layout">
    <router-view slot="toolbar_items" name="toolbar_items"></router-view>
    <navbar1 slot="navbar"></navbar1>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </router-view>
</template>

<script>
import Navbar1 from '@/ui/services/Navbar1'

export default {
  name: 'App1',
  components: {
    Navbar1
  }
}
</script>
