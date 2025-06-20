<script>
/**
 * Div with gradient border and transition, does not support border style now like `dashed`, `dotted`, etc.
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
  border-color: transparent !important;
  background: v-bind(background) !important;
  background-clip: padding-box;

  &::before,
  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    border-radius: inherit;

    transition: all v-bind(transitionDuration) v-bind(transitionFunction);
  }

  &::before {
    margin: v-bind(borderMargin) !important;
    opacity: 1;
    background: v-bind(borderColor) !important;
  }

  &::after {
    margin: v-bind(hoverBorderMarginOrDefault) !important;
    opacity: 0;
    background: v-bind(hoverBorderColorOrDefault) !important;
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
