<template>
  <div>
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({
    socket: null
  }),
  created () {
    const connect = () => {
      this.socket = new WebSocket('ws://localhost:3000/socket')
      this.socket.onopen = (e) => {
        console.log('[open] Соединение установлено')
        console.log('Отправляем данные на сервер')
        this.socket.send(JSON.stringify({
          token: 'ivan-qwe'
        }))
      }

      this.socket.onmessage = function (event) {
        console.log(`[message] Данные получены с сервера: ${event.data}`)
      }

      this.socket.onclose = function (event) {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log('[close] Соединение прервано')

          setTimeout(function () {
            connect()
          }, 1000)
        }
      }

      this.socket.onerror = function (error) {
        console.log(`[error] ${error.message}`)
      }
    }

    connect()
  },
  methods: {
    test () {
      this.socket.send(JSON.stringify({
        token: 'ivan-qwe'
      }))
    }
  }
}
</script>

<style scoped>

</style>
