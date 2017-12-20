<template lang="pug">
  .md-layout
    .md-layout-item
      md-card(md-with-hover)
        md-card-header
          .md-title Garage Door Status
        md-card-content Status: {{ status | capitalize}}
        md-card-actions
          md-button.md-dense.md-raised.md-primary(@click='action()') Activate

    .md-layout-item
      md-card(md-with-hover)
        md-card-header
          .md-title Alerts
        md-card-content
          p(v-if='alerts.length === 0') No Alerts
          md-list
            md-list-item(v-for='alert in alerts')
              md-icon(v-text='alertsConts[alert].icon')
              span.md-list-item-text(v-text='alertsConts[alert].title')
    .md-layout-item
      md-card(md-with-hover)
        md-card-header
          .md-title Lights
        md-card-content
          p 3 Phillips Hue lights
        md-card-actions
          md-button.md-dense.md-raised.md-primary(@click='hue("on")') On
          md-button.md-dense.md-raised.md-primary(@click='hue("off")') Off

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
          NIGHT_WATCH: {title: 'Night Watch', icon: 'hotel'},
          DOOR_TRANSITION: {title: 'Door Stuck in Transition', icon: 'priority_high'},
          DOOR_OPEN: {title: 'Door as been left open', icon: 'lock_open'},
          HOME_ALONE: {title: 'Door Activated when no ones home', icon: 'accessibility'}
        }
      }
    },
    mounted () {
      this.$options.sockets.alert = (data) => {
        this.alerts.unshift(data)
      }
      this.$options.sockets.statusChange = (data) => {
        this.status = data.status
      }

      axios.get('/api/getStatus')
        .then(rsp => {
          this.status = rsp.data.status
        })
        .catch(() => {
          this.status = `Unable to connect`
        })
    },
    methods: {
      action: function () {
        axios.get('/api/action')
          .catch(() => {
            this.status = `Unable to connect`
          })
      },
      hue: function (state) {
        axios.get(`/api/hue?state=${state}`)
          .catch(() => {
            this.hue = `Unable to connect`
          })
      }
    }
  }
</script>