<template>
  <v-toolbar-items>
    <v-btn color="primary lighten-1" @click="logout" style="box-shadow: none">
      Выйти
    </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  name: 'ToolbarItems1',
  methods: {
    logout () {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('microchatsToken')
        localStorage.removeItem('microchatsUserId')
        localStorage.removeItem('microchatsCurrentChatIndex')
      }
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
