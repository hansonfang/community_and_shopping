<template>
  <div class="service-box">
    <v-card-title primary-title class="mb-3">
      <div style="width:100%;height:270px">
        <h3 class="headline mb-0 text-xs-center">价格</h3>

        <!-- 送水 -->
        <v-data-table hide-actions flat :headers="headers" :items="brands">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.brand }}</td>
            <td class="text-xs-center">{{ props.item.price }}</td>
          </template>
        </v-data-table>
      </div>
    </v-card-title>
    <v-divider></v-divider>

    <v-card flat>
      <v-card-title class="justify-center">
        <span class="f-1"></span>
        <span class="headline f-1">预约送水</span>
        <v-btn flat color="blue" to="recordWater">送水预约记录</v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-select
                v-model="selectedValue"
                :items="waterBrandPrice"
                attach
                chips
                label="选择品牌"
                multiple
              ></v-select>
              <v-list>
                <v-list-tile v-for="(item,index) in selectedInfo" :key="index">
                  <v-list-tile-content>{{item.brand}} - {{item.price}} * {{item.count}}</v-list-tile-content>
                  <v-list-tile-action>
                    <Count v-model="item.count"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="电话" value="取默认用户注册时的电话" required>{{telephone}}</v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="地址" required value="取默认用户注册时的地址">{{address}}</v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-menu
                ref="menu"
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="expectedDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="100px"
              >
                <v-text-field
                  slot="activator"
                  v-model="expectedDate"
                  label="期望上门日期"
                  prepend-icon="fa-calendar-week"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="expectedDate"
                  no-title
                  scrollable
                  locale="zh-cn"
                  @input="$refs.menu.save(expectedDate);dateMenu=false"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <!-- 时间 -->
            <v-flex xs6>
              <v-menu
                ref="timeMenu"
                v-model="timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="expectedTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-model="expectedTime"
                  label="期望上门时间"
                  prepend-icon="fa-clock"
                  readonly
                ></v-text-field>
                <v-time-picker
                  v-if="timeMenu"
                  v-model="expectedTime"
                  full-width
                  format="24hr"
                  @click:minute="$refs.timeMenu.save(expectedTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-textarea solo name="repairText" label="备注信息" v-model="orderText"></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="confirm_dialog=true">提交</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="confirm_dialog" max-width="290">
      <v-card v-if="selectedInfo.length">
        <v-card-title class="headline">确定提交吗？</v-card-title>

        <v-card-text>
          你选择
          <span v-for="(item,i) in selectedInfo" :key="i">{{item.brand}} {{item.count}}桶,</span>
          价格共
          <span class="red--text subheading">￥{{totalPrice}}</span>
          元
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="confirm_dialog = false">改一下</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="sendWaterSubmit()">确定</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="headline">提示</v-card-title>
        <v-card-text>请选择桶装水品牌及数量</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirm_dialog=false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Count from "@/components/Tool/Count";
import { getWaterBrands, orderWater } from "~/services";
export default {
  name: "orderWater",
  components: {
    Count
  },
  created() {
    getWaterBrands()
      .then(() => {
        // bug
        // this.brands=JSON.parse(JSON.stringify(res.data.data))
      })
      .catch(e => {
        this.$log.error(e);
      });
  },
  data() {
    return {
      title: "送水服务",
      headers: [
        { text: "品牌", value: "brand", align: "center" },
        { text: "价格(元/桶)", value: "price", align: "center" }
      ],
      selectedValue: [],
      selectedInfo: [],
      orderText: "", //预约送水备注信息
      address: "",
      telephone: "",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: null,
      dateMenu: false,
      timeMenu: false,
      confirm_dialog: false,
      brands: [
        { brand: "农夫山泉", price: 24, id: "001" },
        { brand: "百脉泉", price: 16, id: "002" },
        { brand: "娃哈哈", price: 20, id: "003" },
        { brand: "雀巢纯水", price: 22, id: "004" }
      ]
    };
  },
  mounted() {
    this.brands.forEach(element => {
      element["count"] = 1;
    });
  },
  computed: {
    waterBrandPrice() {
      return this.brands.map(value => `${value.brand} - ${value.price}`);
    },
    totalPrice() {
      return this.selectedInfo
        .map(item => item.count * item.price)
        .reduce((sum, curr) => {
          return sum + curr;
        });
    }
  },
  methods: {
    sendWaterSubmit() {
      this.$snackbar({ text: "提交成功，正在转到送水记录页面" });

      /*  this.$log("post");
      orderWater({})
        .then(() => {
          this.$snackbar({ text: "提交成功，正在转到送水记录页面" });
        })
        .catch(e => {
          this.$snackbar({ text: "发生错误" });
          this.$log.error(e);
        }); */
    }
  },
  watch: {
    selectedValue() {
      const temp = [];
      this.selectedValue.forEach(value => {
        const arr = value.split(" -");
        temp.push({ brand: arr[0], price: arr[1], count: 1 });
      });
      this.selectedInfo = temp;
    },
    selectedInfo: {
      handler(now) {
        now.forEach((value, index) => {
          if (value.count === 0) {
            now.splice(index, 1);
          }
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.service-box {
  padding-top: 20px;
}
</style>
