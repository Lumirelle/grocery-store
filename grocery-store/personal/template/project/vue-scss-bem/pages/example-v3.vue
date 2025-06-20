<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useNamespace } from '@/hooks/use-namespace-v3'

defineComponent({
  name: 'ExamplePage',
})

const ns = useNamespace('example-page')
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('body')" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

@include b(example-page) {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 600px;

  @include e(body) {
    width: 100%;

    & > * {
      width: calc(100% - 32px);
      max-width: 1366px;
      margin: 0 auto;
    }
  }
}
</style>
