<template>
  <b-row>
    <b-col align-self="start">&nbsp;</b-col>
    <b-col cols="6" align-self="center">
      <h2>
        Join Room
        <b-link href="#/">(Room List)</b-link>
      </h2>
      <v-form @submit="onSubmit">
        <v-text-field
          v-model="chat.nickname"
          label="Enter Nickname"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Join</v-btn>
    </v-form>
    </b-col>
    <b-col align-self="end">&nbsp;</b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import * as io from 'socket.io-client'
export default {
  name: 'JoinRoom',
  data () {
    return {
      chat: {},
      socket: io('http://localhost:4000')
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.$route.params.id
      this.chat.message = this.chat.nickname + ' joined the room'

      axios.post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: 'Join this room', created_date: new Date() })
          this.$router.push({
            name: 'ChatRoom',
            params: { id: this.$route.params.id, nickname: response.data.nickname }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
