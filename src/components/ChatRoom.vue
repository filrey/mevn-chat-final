<template>
  <v-layout>
    <v-flex>
      <v-card>
        <h2>
          Chat Room - <b-btn size="sm" @click.stop="logout()">Leave Room</b-btn>
        </h2>
        <v-list two-line class="panel-body" v-chat-scroll>
          <template v-for="(item, index) in chats">
            <v-list-tile :key="index" avatar ripple>
              <v-list-tile-content v-if="item.nickname === nickname">
                <v-list-tile-title>
                  <!-- <v-avatar :size="48" color="grey lighten-4"><img src="http://placehold.it/50/55C1E7/fff&text=ME" alt="avatar"></v-avatar> -->
                  {{ item.nickname }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.message }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.created_date }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-content v-else>
                <v-list-tile-title>
                  <!-- <v-avatar :size="48" color="grey lighten-4"><img src="http://placehold.it/50/55C1E7/fff&text=ME" alt="avatar"></v-avatar> -->
                  <p class="text-xs-right">{{ item.nickname }}</p></v-list-tile-title>
                <v-list-tile-sub-title class="text--primary"><p class="text-xs-right">{{ item.message }}</p></v-list-tile-sub-title>
                <v-list-tile-sub-title><p class="text-xs-right">{{ item.created_date }}</p></v-list-tile-sub-title>
              </v-list-tile-content>                  
            </v-list-tile>
            <v-divider v-if="index + 1 < chats.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors" :key="error.id">
            {{error.message}}
          </li>
        </ul>
        <b-form @submit="onSubmit" class="chat-form">
          <b-input-group prepend="Message">
            <b-form-input id="message" :state="state" v-model.trim="chat.message"></b-form-input>
            <b-input-group-append>
              <b-btn type="submit" variant="info">Send</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form>
        <v-spacer></v-spacer>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import * as io from 'socket.io-client'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

export default {
  name: 'ChatRoom',
  data () {
    return {
      chats: [],
      errors: [],
      nickname: this.$route.params.nickname,
      chat: {},
      roomId: this.$route.params.id,
      socket: io('http://localhost:4000')
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/chat/`)
    .then(response => {
        console.log("Response data from: http://localhost:3000/api/chat/")
        console.log(response)
      this.chats = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    this.socket.on('new-message', function (data) {
      if(data.message.room === this.$route.params.id) {
        this.chats.push(data.message)
      }
    }.bind(this))
  },
  methods: {
    logout () {
      this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: this.chat.nickname + ' left this room', created_date: new Date() });
      this.$router.push({
        name: 'RoomList'
      })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.$route.params.id
      this.chat.nickname = this.$route.params.nickname
      axios.post(`http://localhost:3000/api/chat`, this.chat)
      .then(response => {
        this.socket.emit('save-message', response.data)
        this.chat.message = ''
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
  .chat .left .chat-body {
    text-align: left;
    margin-left: 100px;
  }

  .chat .right .chat-body {
    text-align: right;
    margin-right: 100px;
  }

  .chat .chat-body p {
    margin: 0;
    color: #777777;
  }

  .panel-body {
    overflow-y: scroll;
    height: 350px;
  }

  .chat-form {
    margin: 20px auto;
    width: 80%;
  }
</style>