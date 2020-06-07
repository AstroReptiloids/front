<template>
  <v-btn depressed @click="logout">Выйти</v-btn>
</template>

<script>
export default {
  name: 'ToolbarItems1',
  methods: {
    logout () {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('microchatsToken')
        localStorage.removeItem('microchatsUserId')
      }
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
