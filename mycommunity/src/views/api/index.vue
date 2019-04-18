<template>
  <div>
    <v-layout row class="mt-5">
      <v-flex md6>
        <v-text-field :value="baseUrl"></v-text-field>
      </v-flex>
      <v-flex md5>
        <v-text-field v-model="url" label="地址"></v-text-field>
      </v-flex>
      <v-flex md1>
        <v-btn @click="send()">发送请求</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { baseUrl } from "@/config";
import request from "@/utils/request";

export default {
  name: "api",
  data() {
    return {
      baseUrl,
      url: ""
    };
  },
  methods: {
    send() {
      request({
        url: this.url,
        method: "get",
        data: {}
      })
        .then(res => {
          this.$log.debug("api", res.data);
        })
        .catch(e => {
          this.$log.error(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>