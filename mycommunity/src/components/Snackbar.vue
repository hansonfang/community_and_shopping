<template>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="0">
      {{ snackbarText }}
      <v-btn dark flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
</template>
<script>
export default {
    name:"snackbar",
    data(){
        return {
            snackbar:false,
            snackbarColor:"",
            snackbarText:"",
        }
    },
    created() {
        const _this = this;
        this.bus.$on('hint', function(data) {
            _this.snackbar=true;
            _this.snackbarColor=data.color;
            _this.snackbarText=data.text;
        })
    }
}
</script>
