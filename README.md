# vuex-ts-enhance

enhance types from vuex

it will check `mapXXXX()` params for `state`, `getters`, `actions` in store

## Example

[state](./dev/store.ts)

![](example/2020-04-30-18-48-36.png)
![](example/2020-04-30-18-49-06.png)
![](example/2020-04-30-18-49-23.png)

## Usage

```ts
import { EnhanceStore } from 'vuex-ts-enhance'
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const state = {
  // your state
}
const s = new EnhanceStore(state);
export const { mapGetters, store, mapActions } = s;
```

```html
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
    ...mapGetters('namespace', ['namespaceGetter']), // will check type
    ...mapGetters(['getter1']),
    ...mapGetters('namespace', {
      getterAlias: 'namespaceGetter'
    })
  },
  mounted() {
    console.log(this.namespaceGetter)
    console.log(this.getter1)
    console.log(this.getterAlias)
    this.namespaceAction
    this.action1
  },
  methods: {
    ...mapActions('namespace', ['namespaceAction']),
    ...mapActions(['action1'])
  }
}
</script>
```

## develop

- `git clone project`
- `yarn dev`
- edit dev files
