<template>
  <v-container>
    <v-layout v-if="this.userIsAuthenticated">
      <v-flex >
        <h1 v-if="user.data.email !== null">Welcome back {{user.data.email}}</h1>
        <h2>Room List</h2>
        <v-data-table
          :headers="headers"
          :items="rooms"
          class="elevation-2"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.room_name }}</td>
            <td class="text-xs-center">{{ props.item.created_date }}</td>
            <td class="text-xs-right"><v-btn color="primary" @click.stop="join(props.item._id)">Join</v-btn></td>
          </template>
        </v-data-table>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors" :key="error.id">
            {{error.message}}
          </li>
        </ul>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <h1>Welcome to my final project for Comp 584 advanced web engineering!</h1>
      <h3>In order to get started please signup for a new account by choosing "Sign up" in the menu</h3>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RoomList',
  data () {
    return {
      fields: {
        room_name: { label: 'Room Name', sortable: true, 'class': 'text-left' },
        created_date: { label: 'Created Date', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      rooms: [],
      errors: [],
      headers: [
        {
          text: 'Room Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Created Date',
          align: 'center',
          sortable: false,
          value: 'createdDate'
        },
        { text: 'Action',
          align: 'right',
          sortable: false,
          value: 'action'
        }
      ]
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
      .then(response => {
        this.rooms = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    join (id) {
      console.log(id)
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>
