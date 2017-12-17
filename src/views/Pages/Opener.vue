<template lang="pug">
    div
        p
            md-button.md-dense.md-raised.md-primary(@click='getStatus()') Activate
        p {{ status }}
        h4 Alerts
        ul
            li(v-for='alert in alerts') {{ alert }}

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Opener',
    data () {
      return {
        status: 'Unknown',
        alerts: [],
        alertsConts: {
          NIGHT_WATCH: 'Night Watch',
          DOOR_TRANSITION: 'Door Stuck in Transition',
          DOOR_OPEN: 'Door as been left open',
          HOME_ALONE: 'Door Activated when no ones home'
        }
      }
    },
    mounted () {
      this.$options.sockets.alert = (data) => {
        this.alerts.push(data)
      }
      this.$options.sockets.statusChange = (data) => {
        this.status = data.status
      }
    },
    methods: {
      getStatus: function () {
        axios.get('/api/getStatus')
          .then(rsp => {
            this.status = rsp.status
          })
          .catch(() => {
            this.status = `Unable to connect`
          })
      }
    }
  }
</script>