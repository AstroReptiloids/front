<template>
    <v-row class="mx-auto my-8" justify="center" style="max-width: 83.33333%;">
        <v-col cols="5" class="pa-0" style="overflow: hidden">
<!--          <div class="image-side" style="width: 100%; height: 100%"/>-->
          <v-card class="image-side" tile style="width: 100%">
<!--            <v-img-->
<!--              src="https://piaf-vue.coloredstrategies.com/assets/img/login-balloon.jpg"-->
<!--              class="white&#45;&#45;text fill-height"-->
<!--            >-->
              <v-card-title class="white--text"
                            v-text="'Попробуй новый формат общения'"
                            style="text-transform: uppercase"
              ></v-card-title>
              <v-card-text class="white--text"
                           v-text="'Присоединяйся к инновационной платформе онлайн нетфоркинга!'"
              ></v-card-text>
<!--            </v-img>-->
          </v-card>
        </v-col>
        <v-col cols="7" class="pa-0">
          <v-card style="padding: 80px" tile>
            <div class="display-2 my-8 ml-n1">Microchats</div>
            <div class="title my-4">Авторизация</div>
            <v-text-field v-model="login" dense outlined label="Логин"/>
            <v-text-field v-model="password" dense outlined label="Пароль" type="password"/>
            <v-row class="ma-0">
              <v-spacer/>
              <v-btn @click="auth" depressed color="primary">Войти</v-btn>
            </v-row>
          </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'LoginElement',
  data: () => ({
    login: '',
    password: ''
  }),
  methods: {
    async auth () {
      const res = await this.$axios('auth/login', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        },
        data: {
          login: this.login,
          password: this.password
        }
      })
      if (res && res.data && res.data.data && res.data.data.token) {
        localStorage.setItem('microchatsToken', res.data.data.token)
        localStorage.setItem('microchatsUserId', res.data.data.user_id)
        this.$axios.defaults.headers.common.Authorization = res.data.data.token
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.image-side {
  width: 40%;
  background: url("https://piaf-vue.coloredstrategies.com/assets/img/login-balloon.jpg") no-repeat center top;
  background-size: cover;
  padding: 80px 40px;
}
</style>
