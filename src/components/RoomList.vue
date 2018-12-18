<template>
  <div>
    <b-row v-if="this.userIsAuthenticated">
      <b-col cols="12">
        <h1 v-if="user.data.email !== null">Welcome back {{user.data.email}}</h1>
        <h2>
          Room List
          <b-link href="#/add-room">(Add Room)</b-link>
          <b-link href="#/sign-up">(Sign Up)</b-link>

        </h2>
        <b-table striped hover :items="rooms" :fields="fields">
          <template slot="actions" scope="row">
            <b-btn size="sm" @click.stop="join(row.item._id)">Join</b-btn>
          </template>
        </b-table>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors" :key="error.id"> 
            {{error.message}}
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-row v-else>
      <h1>Welcome to my final project for Comp 584 advanced web engineering!</h1>
      <h3>In order to get started please signup for a new account by choosing "Sign up" in the menu</h3>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RoomList',
  data () {
    return {
      fields: {
        room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
        created_date: { label: 'Created Date', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      rooms: [],
      errors: []
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
  },
}
</script>