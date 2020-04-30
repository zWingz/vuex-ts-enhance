<template>
  <div>
    {{getName}}
    {{getUsername}}
    {{getUsername1}}
  </div>
</template>

<script>
// @ts-check
import { mapGetters, mapActions } from './store'
export default {
  computed: {
    ...mapGetters('user', ['getUsername']),
    ...mapGetters(['getName']),
    ...mapGetters('user', {
      getUsername1: 'getUsername'
    })
  },
  mounted() {
    console.log(this.getName);
    console.log(this.getUsername);
    console.log(this.getUsername1);
    // this.()
  },
  methods: {
    ...mapActions('user', ['setUsername']),
    ...mapActions(['setName'])
  }
}
</script>

<style>

</style>
