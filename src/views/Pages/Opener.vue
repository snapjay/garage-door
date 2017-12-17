<template lang="pug">
  .md-layout
    .md-layout-item
      p
        md-button.md-dense.md-raised.md-primary(@click='getStatus()') Activate
      p {{ status }}
      h4 Alerts
      ul
        li(v-for='alert in alerts') {{ alertsConts[alert] }}

    .md-layout-item
      door-image(:status='status')

</template>

<script>
  import axios from 'axios'
  import DoorImage from '../../components/DoorImage'

  export default {
    name: 'Opener',
    components: {
      'door-image': DoorImage
    },
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