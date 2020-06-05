<template>
  <div>
    {{getName}}
    {{getUsername}}
    {{getUsername1}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapState, mapMutations } from './store'
export default Vue.extend({
  computed: {
    ...mapState('user', ['username']),
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
    this.updateUsername('updateUsername')
    this.updateUserMeta({ age: 21 });
    // this.()
  },
  methods: {
    ...mapActions(['setName']),
    ...mapActions('user', ['updateUsername', 'updateUserMeta']),
    ...mapMutations('user', ['setUsername', 'setUserMeta'])
  }
});
</script>

<style>

</style>
