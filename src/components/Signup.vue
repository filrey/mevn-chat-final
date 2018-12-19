<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Signup form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form @submit.prevent="onSignup">
            <v-text-field prepend-icon="person" name="email" label="Signup Email" id="email" v-model="email" type="email" required></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Create a new password" v-model="password" type="password" required></v-text-field>
            <v-text-field id="confirmPassword" prepend-icon="check_circle" name="confirmPassword" label="Confrim Password" v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Signup</v-btn>
              </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/Login')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    }
  }
}
</script>
