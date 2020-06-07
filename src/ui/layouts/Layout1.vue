<template>
    <v-col class="pa-0 fill-height fixed-background">
        <v-row class="ma-0 fill-height" justify="center" style="overflow: auto;">
            <slot></slot>
        </v-row>
    </v-col>
</template>

<script>
export default {
  name: 'Layout1'
}
</script>

<style scoped>
.fixed-background {
  background: url(https://piaf-vue.coloredstrategies.com/assets/img/balloon.jpg) no-repeat 50% fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
