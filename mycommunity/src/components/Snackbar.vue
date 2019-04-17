<template>
  <v-snackbar top v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  name: "snackbar",
  data() {
    return {
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
      snackbarTimeout: 6000
    };
  }
};
</script>
