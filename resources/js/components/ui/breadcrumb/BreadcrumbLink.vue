<script setup>
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps({
  as: {
    type: String,
    default: "a",
  },
  asChild: Boolean,
  class: [String, Object, Array],
})
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="as"
    :as-child="asChild"
    :class="cn('hover:text-foreground transition-colors', props.class)"
  >
    <slot />
  </Primitive>
</template>
