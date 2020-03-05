<template>
    <v-row class="ma-0" style="height: 100%;" justify="center">
        <v-card v-for="i in 20" :key="i" color="blue lighten-3" width="100" height="100" class="ma-2">
            <v-layout align-center justify-center row fill-height>
                <span class="headline font-weight-thin white--text">Item {{i}}</span>
            </v-layout>
        </v-card>
    </v-row>
</template>

<script>
export default {
  name: 'Component3'
}
</script>

<style scoped>

</style>
