<template>
    <v-row class="ma-0" style="height: 100%;" justify="center">
        <v-card v-for="i in 30" :key="i" color="red lighten-3" width="200" height="200" class="ma-2">
            <v-layout align-center justify-center row fill-height>
                <span class="headline font-weight-thin white--text">Item {{i}}</span>
            </v-layout>
        </v-card>
    </v-row>
</template>

<script>
export default {
  name: 'Component1'
}
</script>

<style scoped>

</style>
