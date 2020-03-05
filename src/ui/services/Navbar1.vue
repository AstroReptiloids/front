<template>
    <v-list dense>
        <v-list-item v-for="(action, actionIndex) in navbarActions"
                     :key='`action-${actionIndex}`'
                     @click="action.onClick()">
            <v-list-item-action>
                <v-icon>{{action.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{action.label}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
`
<script>
export default {
  name: 'Navbar1',
  data: function () {
    const self = this
    return {
      navbarActions: [
        {
          label: 'Dashboard',
          icon: 'fa-home',
          onClick: function () {
            self.$router.push('/')
          }
        },
        {
          label: 'Page 1',
          icon: 'fa-home',
          onClick: function () {
            self.$router.push('/page1')
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
