<template lang="pug">

    md-app(md-mode="reveal")
        md-app-toolbar.md-primary
            md-button.md-icon-button(@click='menuVisible = !menuVisible')
                md-icon menu
            span.md-title Garage Door
        md-app-drawer(:md-active.sync='menuVisible')
            md-toolbar.md-transparent(md-elevation='0') Garage Door
            md-list
                md-list-item
                    md-icon move_to_inbox
                    span.md-list-item-text Door Opener
                md-list-item
                    md-icon send
                    span.md-list-item-text Logs
                md-list-item
                    md-icon delete
                    span.md-list-item-text Log Out
        md-app-content
            router-view

</template>

<style lang="scss" scoped>
    // Demo purposes only
    .md-app {
        border: 1px solid rgba(#000, .12);
    }

    .md-app-content {
        min-height: 500px;
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>

<script>
  export default {
    name: 'Main',
    data: () => ({
      menuVisible: false
    })
  }
</script>