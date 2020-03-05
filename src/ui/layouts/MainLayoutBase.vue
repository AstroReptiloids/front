<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <slot name="navbar"></slot>
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="toolbar_items"></slot>
        </v-app-bar>
        <v-content style="height: 100vh;">
            <transition name="fade" mode="out-in">
                <slot></slot>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'MainLayoutBase',
  props: ['navbarActions'],
  data: () => ({
    drawer: null
  })
}
</script>

<style scoped>

</style>
