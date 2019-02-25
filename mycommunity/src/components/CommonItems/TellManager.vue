<template>
  <div>
    <v-card>
      <v-img :src="image" aspect-ratio="1.8"></v-img>

      <v-card-title primary-title>
        <div style="width:100%;height:270px">
          <h3 class="headline mb-0">{{title}}</h3>

          <!-- 找书记 -->
          <v-list subheader>
            <v-subheader style="padding-bottom:10px;">服务优势</v-subheader>
            <v-list-tile v-for="item in secretaryItems" :key="item.title" @click.prevent>
              <v-list-tile-content style="cursor:text;">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="secretary_dialog=true">书记邮箱</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 书记dialog -->
    <v-dialog v-model="secretary_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">书记</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="secretary_dialog=false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="secretary_dialog=false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "tellManager",
  data() {
    return {
      title: "找书记",
      image: require("../../assets/images/shuji.jpg"),
      secretary_dialog: false
    };
  },
  props: {
    secretaryItems: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
