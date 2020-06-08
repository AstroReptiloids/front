<template>
  <v-row class="ma-0">
    <v-col class="ma-0 fill-height" cols="3" v-if="chats" style="overflow-y: auto; height: calc(100vh - 152px);">

      <v-list three-line>
        <template v-for="(chat, i) in chats">
          <v-list-item :key="`chat-${i}`" @click="selectChat(chat)" :style="chat.id === chatId ? 'background-color: #e2e9f3' : ''">
            <v-list-item-avatar>
              <v-img :src="getUserAvatar(chat.creator)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="subtitle-2" v-html="chat.title"></v-list-item-title>
              <v-list-item-subtitle class="body-2" v-html="chat.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="i + 1 < chats.length" :key="`divider-${i}`" inset/>
        </template>
      </v-list>

    </v-col>

    <v-col class="ma-0 fill-height" cols="9" v-if="items" style="overflow-y: auto; height: calc(100vh - 152px);">
    <v-row v-for="(item, i) of items"
           :key="`item-${i}`"
           class="ma-0"
    >
      <v-spacer v-if="isOwn(item)"/>
      <v-card :class="`px-4 pb-4 pt-2 ma-4 ${isOwn(item) ? '' : 'no-'}my-message`">
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
        <v-spacer v-if="isNotOwn(item)"/>
      </v-card>
    </v-row>
      <v-footer absolute padless>
        <v-row class="mx-8 my-4">
          <v-text-field v-model="newMessage"
                        rounded
                        hide-details
                        placeholder="Напишите сообщение..."
                        class="footer-input mr-4"
          />
          <v-btn rounded
                 class="my-2"
                 color="primary lighten-2"
                 @click="send"
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
    currentChat: {
      type: 'category',
      id: '65a69740-ddab-4d26-b1dd-81c28fd3d877'
    },
    currentUser: null,
    newMessage: '',
    chatId: 'cd685366-9c2f-4e9d-ae0e-16731283129d',
    categoryId: '65a69740-ddab-4d26-b1dd-81c28fd3d877'
  }),
  computed: {
    getCurrentUserId () {
      return localStorage.getItem('microchatsUserId')
    },
    pageHeight () {
      return document.body.scrollHeight
    }
  },
  async created () {
    this.connectWebSockets()
    await this.fetchMessages()
    await this.fetchChats()
    await this.fetchCurrentUser()
  },
  methods: {
    isOwn (item) {
      return this.getCurrentUserId && this.getCurrentUserId === item.user.id
    },
    isNotOwn (item) {
      return this.getCurrentUserId !== item.user.id
    },
    connectWebSockets () {
      this.socket = new WebSocket('ws://localhost:3000/socket')
      this.socket.onopen = (e) => {
        console.log('[open] Соединение установлено')
        console.log('Отправляем данные на сервер')
        this.socket.send(JSON.stringify({
          token: localStorage.getItem('microchatsToken')
        }))
      }

      this.socket.onmessage = (event) => {
        console.log(`[message] Данные получены с сервера: ${event.data}`)
      }

      this.socket.onclose = (event) => {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log('[close] Соединение прервано')

          setTimeout(() => {
            this.connectWebSockets()
          }, 1000)
        }
      }

      this.socket.onerror = (error) => {
        console.log(`[error] ${error.message}`)
      }
    },
    async fetchMessages () {
      const res = await this.$axios('messages', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        },
        params: {
          microchat_id: this.chatId
        }
      })
      if (res && res.data && res.data.data && res.data.data.messages) {
        this.items = res.data.data.messages
      }
    },
    async fetchChats () {
      const res = await this.$axios('microchats', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        }
        // query: {
        //   category_id: this.categoryId
        // }
      })
      if (res && res.data && res.data.data && res.data.data.microchats) {
        this.chats = res.data.data.microchats
      }
    },
    async fetchCurrentUser () {
      const res = await this.$axios(`users/${this.getCurrentUserId}`, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        }
      })
      if (res && res.data && res.data.data) {
        this.currentUser = res.data.data
      }
    },
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
    },
    async selectChat (chat) {
      this.chatId = chat.id
      await this.fetchMessages()
    },
    async send () {
      if (!this.newMessage) {
        return
      }

      const res = await this.$axios('messages', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*'
        },
        data: {
          text: this.newMessage,
          microchat_id: this.chatId,
          user_id: localStorage.getItem('microchatsToken')
        }
      })
      if (res && res.data && res.data.data) {
        this.items.push({
          ...res.data.data,
          user: this.currentUser
        })
        this.newMessage = ''

        await this.$vuetify.goTo(this.$refs.chatEnd, {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      }
    }
  }
}
</script>

<style scoped>
.my-message {
  border-radius: 4px 24px 0 24px !important;
  filter: drop-shadow(1px 2px 2px #00000023);
}
.my-message:after {
  content: '';
  position: absolute;
  bottom: 1px;
  right: 0;
  width: 0;
  height: 0;
  border: 1.5em solid transparent;
  border-top-color: #fff;
  border-bottom: 0;
  border-right: 0;
  margin-left: -0.75em;
  margin-bottom: -1.5em;
  filter: drop-shadow(1px 2px 2px #00000023);
}
.no-my-message {
  border-radius: 24px 4px 24px 0 !important;
  filter: drop-shadow(1px 2px 2px #00000023);
}
.no-my-message:before {
  content: '';
  position: absolute;
  bottom: 1px;
  left: 0;
  width: 0;
  height: 0;
  border: 1.5em solid transparent;
  border-top-color: #fff;
  border-bottom: 0;
  border-left: 0;
  margin-right: -0.75em;
  margin-bottom: -1.5em;
  filter: drop-shadow(1px 2px 2px #00000023);
}
</style>

<style>
/*.footer-input.v-text-field--outlined fieldset {*/
/*  border: none;*/
/*}*/
</style>
