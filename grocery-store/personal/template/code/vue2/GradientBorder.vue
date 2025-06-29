<script>
/**
 * Div with gradient border and transition, does not support border style now like `dashed`, `dotted`, etc.
 *
 * It's recommended to use `isolation: isolate` on the parent element to avoid the gradient border being affected by the parent element's background.
 *
 * Or you can uncomment `*:has(> .gradient-div)` in the global style to avoid the gradient border being affected by the parent element's background. But it may cause some other issues.
 */
export default {
  name: 'GradientBorder',

  props: {
    /**
     * Support any valid CSS length value
     */
    borderWidth: {
      type: String,
      required: true,
    },
    /**
     * Support any valid CSS length value
     */
    hoverBorderWidth: {
      type: String,
      default: null,
    },

    /**
     * Support any valid CSS color value
     */
    borderColor: {
      type: String,
      required: true,
    },
    /**
     * Support any valid CSS color value
     */
    hoverBorderColor: {
      type: String,
      default: null,
    },

    /**
     * Support any valid CSS background value.
     *
     * Note: If you set a alpha background, the background will mix with the border color.
     *
     * @example
     * 'red'
     * @example
     * '#777'
     * @example
     * '#777777'
     * @example
     * 'rgb(119, 119, 119)'
     * @example
     * 'linear-gradient(to right, #777, #999)'
     * @example
     * 'url("https://example.com/image.png")'
     * @example
     * // Not recommended, the background will mix with the border color.
     * 'rgba(119, 119, 119, 0.5)'
     */
    background: {
      type: String,
      required: true,
    },

    /**
     * Support any valid CSS transition duration value, default is 0.3s
     */
    transitionDuration: {
      type: String,
      default: '0.3s',
    },
    /**
     * Support any valid CSS transition function value, default is ease
     */
    transitionFunction: {
      type: String,
      default: 'ease',
    },
  },

  computed: {
    /**
     * Transform border width to negative margin value
     */
    borderMargin() {
      return this.borderToMargin(this.borderWidth)
    },

    /**
     * Transform border width to negative margin value, if hoverBorderWidth is not set, use borderWidth as default
     */
    hoverBorderMarginOrDefault() {
      return this.borderToMargin(this.hoverBorderWidth ?? this.borderWidth)
    },

    /**
     * If hoverBorderColor is not set, use borderColor as default
     */
    hoverBorderColorOrDefault() {
      return this.hoverBorderColor ?? this.borderColor
    },
  },

  methods: {
    /**
     * Transform border width to negative margin value
     */
    borderToMargin(borderWidth) {
      return `-${borderWidth}`
    },
  },
}
</script>

<template>
  <div class="gradient-div">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.gradient-div {
  position: relative;
  background: v-bind(background) !important;
  background-clip: padding-box;
  border-color: transparent !important;

  &::before,
  &::after {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    content: "";
    border-radius: inherit;
    transition: all v-bind(transitionDuration) v-bind(transitionFunction);
  }

  &::before {
    margin: v-bind(borderMargin) !important;
    background: v-bind(borderColor) !important;
    opacity: 1;
  }

  &::after {
    margin: v-bind(hoverBorderMarginOrDefault) !important;
    background: v-bind(hoverBorderColorOrDefault) !important;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
// May cause some other issues, it's recommend to manually set `isolation: isolate` on the parent element instead of using this global style.
// *:has(> .gradient-div) {
//   isolation: isolate;
// }
</style>
