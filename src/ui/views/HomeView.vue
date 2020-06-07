<template>
  <v-row class="ma-0">
    <v-col class="ma-0" cols="3" v-if="chats">
      <!--    <v-btn @click="test">test</v-btn>-->
      <v-list three-line>
        <template v-for="(chat, i) in chats">
          <v-list-item :key="`chat-${i}`" @click="alert(i)">
            <v-list-item-avatar>
              <v-img :src="getUserAvatar(chat.creator)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="chat.title"></v-list-item-title>
              <v-list-item-subtitle v-html="chat.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="i + 1 < chats.length" :key="`divider-${i}`" inset/>
        </template>
      </v-list>
    </v-col>

    <v-col class="ma-0" cols="9" v-if="items">
    <v-row v-for="(item, i) of items"
           :key="`item-${i}`"
           class="ma-0"
    >
      <v-spacer v-if="getCurrentUserId && getCurrentUserId === item.user.id"/>
      <v-card class="px-4 pb-4 pt-2 ma-4" shaped>
        <v-list-item class="mt-3">
          <v-list-item-avatar>
            <v-img :src="getUserAvatar(item.user)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="subtitle-2" v-html="`${item.user.first_name} ${item.user.last_name}`"></v-list-item-title>
            <v-list-item-subtitle class="body-2" v-html="formatDateTime(item.user.createdAt)"></v-list-item-subtitle>
          </v-list-item-content>

  <!--        <v-list-item-action v-if="isOwn">-->
  <!--          <v-btn icon x-small @click="removeFeed(i)">-->
  <!--            <v-icon color="grey lighten-1" x-small>fa-trash</v-icon>-->
  <!--          </v-btn>-->
  <!--        </v-list-item-action>-->

        </v-list-item>
        <v-card-text class="body-2"
                     style="white-space: pre-wrap">
          {{item.text}}
        </v-card-text>
        <v-spacer v-if="getCurrentUserId !== item.user.id"/>
      </v-card>
    </v-row>

    <v-footer fixed padless>
      <v-row class="mx-8 my-4">
        <v-text-field outlined
                      hide-details
                      placeholder="Напишите сообщение..."
                      class="footer-input"
        />
        <v-btn depressed
               class="my-2"
               color="primary lighten-2"
        >Отправить</v-btn>
      </v-row>
    </v-footer>

    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HomeView',
  data: () => ({
    socket: null,
    items: null,
    chats: null,
    current: {
      type: 'category',
      id: '65a69740-ddab-4d26-b1dd-81c28fd3d877'
    }
  }),
  computed: {
    getCurrentUserId () {
      return localStorage.getItem('microchatsUserId')
    }
  },
  async created () {
    const connect = () => {
      this.socket = new WebSocket('ws://localhost:3000/socket')
      this.socket.onopen = (e) => {
        console.log('[open] Соединение установлено')
        console.log('Отправляем данные на сервер')
        this.socket.send(JSON.stringify({
          token: localStorage.getItem('microchatsToken')
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

    const res = await this.$axios('messages', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      },
      data: {
        microchat_id: 'cd685366-9c2f-4e9d-ae0e-16731283129d'
      }
    })
    if (res && res.data && res.data.data && res.data.data.messages) {
      this.items = res.data.data.messages
    }

    const chatsRes = await this.$axios('microchats', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      },
      data: {
        category_id: '65a69740-ddab-4d26-b1dd-81c28fd3d877'
      }
    })
    if (chatsRes && chatsRes.data && chatsRes.data.data && chatsRes.data.data.microchats) {
      this.chats = chatsRes.data.data.microchats
    }
  },
  methods: {
    test () {
      this.socket.send(JSON.stringify({
        token: localStorage.getItem('microchatsToken')
      }))
    },
    formatDateTime (dt) {
      return moment(dt).locale('ru').fromNow()
    },
    getUserAvatar (user) {
      const color = this.stringToColour(user.id)
      return `https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=${color}&color=ffffff`
    },
    stringToColour (str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      let colour = ''
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF
        colour += ('00' + value.toString(16)).substr(-2)
      }
      return colour
    }
  }
}
</script>

<style>
.footer-input.v-text-field--outlined fieldset {
  border: none;
}
</style>
