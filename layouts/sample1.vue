<template>
  <div class="LayoutSample1">
    <header :class="$style['LayoutSample1__Header']">
      <span>Header 1</span>
    </header>
    <div :class="$style['LayoutSample2__Body']">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
.LayoutSample1 {
    &__Header {
        position: fixed;
        top: 0;
        padding: 12px;
        min-height: 48px;
        max-height: 48px;
        width: 100%;
        background-color: #1DD96F;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    &__Body {
        margin-top: 54px;
        padding: 16px;
    }
}
</style>
