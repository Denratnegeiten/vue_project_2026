<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text-secondary mb-3 mt-3">Orders</h1>
        
        <v-list lines="two" flat>
          <v-list-item
            v-for="order in orders"
            :key="order.id"
          >
            <template v-slot:prepend>
              <v-checkbox
                :model-value="order.done"
                color="primary"
                @click.stop="markDone(order)"
              ></v-checkbox>
            </template>

            <v-list-item-title>{{ order.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>

            <template v-slot:append>
              <v-btn 
                color="primary" 
                variant="elevated"
                :to="'/ad/' + order.adId"
              >
                Open
              </v-btn>
            </template>
          </v-list-item>
        </v-list>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
    }
  }
}
</script>