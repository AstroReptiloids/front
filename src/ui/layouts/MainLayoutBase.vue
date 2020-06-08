<template>
    <v-app id="inspire">
        <v-app-bar app flat color="primary">
            <v-toolbar-title class="white--text">Microchats</v-toolbar-title>
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
  name: 'MainLayoutBase'
}
</script>

<style scoped>

</style>
