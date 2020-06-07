<template>
    <v-app id="inspire">
        <v-content style="height: 100vh;">
            <transition name="fade" mode="out-in">
                <slot></slot>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'MinimalLayoutBase'
}
</script>

<style scoped>

</style>
