<template>
  <v-container>

    <v-layout column>
      <v-flex xs12>
        <v-subheader>确认收货地址
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            dark
            @click="addAddressDialog=true"
          >
            <v-icon
              left
              small
            >fas fa-plus</v-icon>
            添加地址
          </v-btn>
        </v-subheader>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="receiverCode">
          <v-radio
            v-for="(item,index) in receiver"
            :key="index"
            :value="item.id"
          >
            <template v-slot:label>
              <div class="receiver">
                <span>{{item.address}}</span> <span>({{item.name}} 收)</span>
                <span>{{item.phone}}</span>
                <v-btn
                  flat
                  color="blue"
                  style="display:none;"
                >修改此地址</v-btn>
              </div>

            </template>
          </v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs12>

      </v-flex>
      <v-dialog
        v-model="addAddressDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">添加地址</span>
          </v-card-title>
          <v-card-text @click="alert=false;">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="姓名"
                    required
                    v-model="name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="手机号"
                    v-model="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-layout>
                    <v-flex xs4>
                      <v-select
                        v-model="selectedProvince"
                        :items="provinces"
                        item-text="name"
                        return-object
                        label="选择省份"
                        @input="fetchDistrict(1)"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="selectedCity"
                        :items="city"
                        item-text="name"
                        return-object
                        @input="fetchDistrict(2)"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="selectedCounty"
                        :items="county"
                        item-text="name"
                        return-object
                        @input="fetchDistrict(3)"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    label="邮编"
                    v-model="zipCode"
                  ></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field
                    label="街道地址"
                    v-model="communityAddress"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    readonly
                    :value="address"
                  ></v-text-field>
                </v-flex>

              </v-layout>
              <v-alert
                :value="alert"
                type="error"
              >
                请将信息填写完整
              </v-alert>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey darken-1"
              flat
              @click="addAddressDialog = false"
            >关闭</v-btn>
            <v-btn
              color="blue darken-1"
              flat
              @click="addAddress"
            >提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>

  <!-- 拼购付款页面 -->
    <v-layout v-if="from==1" class="red--text">
      你正在和 <span>{{tempName}}</span>拼单
    </v-layout>
    <v-subheader>确认订单信息</v-subheader>
    <v-divider></v-divider>
    <v-layout
      v-for="(item,index) in goods"
      :key="index"
      style="max-height:100px;"
      class="mt-3"
    >
      <v-flex xs2>
        <v-img
          :src="item.image"
          max-height="80"
          contain
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <h4>{{item.title}}</h4>
      </v-flex>
      <v-flex
        xs1
        class="align-center d-f"
      >
        <div class="red--text">
          <span class="caption">￥</span>
          <span class="body-1">{{item.singlePrice}}</span>
        </div>
      </v-flex>
      <v-flex xs2>
        <count v-model="item.goodsCount" />
      </v-flex>
      <v-flex
        xs1
        class="d-f justify-center align-center"
      >
        ￥{{totalPrice(index)}}
      </v-flex>
    </v-layout>

    <v-layout
      row
      nowrap
      class="mt-5"
    >
      <v-flex
        xs1
        md9
      ></v-flex>
      <v-flex
        xs10
        md2
        class="text-xs-center"
      >
        <v-btn color="orange" dark block>
          提交订单
        </v-btn>
      </v-flex>
      <v-flex
        xs1
        md1
      ></v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import { key } from "@/utils/key";
import Count from "@/components/Tool/Count";
export default {
  name: "shopOrder",
  components: {
    Count
  },
  created() {
    this.from = this.$route.query.from;
    this.goodsId = this.$route.query.id;
    this.receiver.push({
      id: 3,
      userId: 44,
      name: "hanson24",
      phone: "17864195311",
      province: "山东省",
      city: "济南市",
      district: "长清区",
      address: "山东省济南市长清区山东师范大学",
      zip: "250358"
    });
    this.receiver.push({
      id: 4,
      userId: 45,
      name: "hanson26",
      phone: "17864195311",
      province: "山东省",
      city: "济南市",
      district: "历下区",
      address: "山东省济南市历下区省实验中学",
      zip: "250358"
    });
  },
  data() {
    return {
      from: 0, //0单买    1拼购     2购物车
      goodsId: 0,
      receiver: [],
      receiverCode: 3,
      tempName:"{{name}}",
      addAddressDialog: false,
      name: "",
      phone: "",
      alert: false,
      selectedProvince: {
        name: ""
      },
      provinces: [
        {
          citycode: [],
          adcode: "440000",
          name: "广东省",
          center: "113.280637,23.125178",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "410000",
          name: "河南省",
          center: "113.665412,34.757975",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "150000",
          name: "内蒙古自治区",
          center: "111.670801,40.818311",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "230000",
          name: "黑龙江省",
          center: "126.642464,45.756967",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "650000",
          name: "新疆维吾尔自治区",
          center: "87.617733,43.792818",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "420000",
          name: "湖北省",
          center: "114.298572,30.584355",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "210000",
          name: "辽宁省",
          center: "123.429096,41.796767",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "370000",
          name: "山东省",
          center: "117.000923,36.675807",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "610000",
          name: "陕西省",
          center: "108.948024,34.263161",
          level: "province",
          districts: []
        },
        {
          citycode: "021",
          adcode: "310000",
          name: "上海市",
          center: "121.472644,31.231706",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "520000",
          name: "贵州省",
          center: "106.713478,26.578343",
          level: "province",
          districts: []
        },
        {
          citycode: "023",
          adcode: "500000",
          name: "重庆市",
          center: "106.504962,29.533155",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "540000",
          name: "西藏自治区",
          center: "91.132212,29.660361",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "340000",
          name: "安徽省",
          center: "117.283042,31.86119",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "350000",
          name: "福建省",
          center: "119.306239,26.075302",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "430000",
          name: "湖南省",
          center: "112.982279,28.19409",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "460000",
          name: "海南省",
          center: "110.33119,20.031971",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "320000",
          name: "江苏省",
          center: "118.767413,32.041544",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "630000",
          name: "青海省",
          center: "101.778916,36.623178",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "450000",
          name: "广西壮族自治区",
          center: "108.320004,22.82402",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "640000",
          name: "宁夏回族自治区",
          center: "106.278179,38.46637",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "360000",
          name: "江西省",
          center: "115.892151,28.676493",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "330000",
          name: "浙江省",
          center: "120.153576,30.287459",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "130000",
          name: "河北省",
          center: "114.502461,38.045474",
          level: "province",
          districts: []
        },
        {
          citycode: "1853",
          adcode: "820000",
          name: "澳门特别行政区",
          center: "113.54909,22.198951",
          level: "province",
          districts: []
        },
        {
          citycode: "1886",
          adcode: "710000",
          name: "台湾省",
          center: "121.509062,25.044332",
          level: "province",
          districts: []
        },
        {
          citycode: "1852",
          adcode: "810000",
          name: "香港特别行政区",
          center: "114.173355,22.320048",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "620000",
          name: "甘肃省",
          center: "103.823557,36.058039",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "510000",
          name: "四川省",
          center: "104.065735,30.659462",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "220000",
          name: "吉林省",
          center: "125.3245,43.886841",
          level: "province",
          districts: []
        },
        {
          citycode: "022",
          adcode: "120000",
          name: "天津市",
          center: "117.190182,39.125596",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "530000",
          name: "云南省",
          center: "102.712251,25.040609",
          level: "province",
          districts: []
        },
        {
          citycode: "010",
          adcode: "110000",
          name: "北京市",
          center: "116.405285,39.904989",
          level: "province",
          districts: []
        },
        {
          citycode: [],
          adcode: "140000",
          name: "山西省",
          center: "112.549248,37.857014",
          level: "province",
          districts: []
        }
      ],
      selectedCity: {
        name: ""
      },
      city: [],
      selectedCounty: {
        name: ""
      },
      county: [],
      communityAddress: "",
      zipCode: "",
      goods: [
        {
          image: "https://picsum.photos/600/500/?random",
          title:
            "元盛 进口整切 牛排套餐 自营生鲜 牛肉生鲜 8连包（西冷*4 眼肉*4）",
          singlePrice: 132, //单买价格
          goodsId: 0,
          goodsCount: 1,
          goodsLeft: 24,
          totalPrice: 0
        }
      ]
    };
  },
  methods: {
    fetchDistrict(type) {
      this.$log.debug("fetchDistrict");
      if (type === 1) {
        // 市
        this.$log.debug("fetchCity");
        this.$axios({
          url: "https://restapi.amap.com/v3/config/district",
          methods: "get",
          params: {
            key,
            keywords: this.selectedProvince.adcode
          }
        })
          .then(res => {
            this.city = res.data.districts[0].districts;
            this.county = [];
            this.selectedCity = { name: "" };
            this.selectedCounty = { name: "" };
            this.communityAddress = "";
          })
          .catch(e => {
            this.$log.error(e);
          });
      } else if (type === 2) {
        this.$log.debug("fetchCounty");
        this.$axios({
          url: "https://restapi.amap.com/v3/config/district",
          methods: "get",
          params: {
            key,
            keywords: this.selectedCity.adcode
          }
        })
          .then(res => {
            this.county = res.data.districts[0].districts;
            this.selectedCounty = { name: "" };
            this.communityAddress = "";
          })
          .catch(e => {
            this.$log.error(e);
          });
      } else if (type === 3) {
        this.communityAddress = "";
        this.zipCode = this.selectedCounty.adcode;
      }
    },
    addAddress() {
      if (
        !this.name ||
        !this.phone ||
        !this.selectedCounty.name ||
        !this.communityAddress
      ) {
        this.alert = true;
      }
    }
  },
  computed: {
    address() {
      return `${this.selectedProvince.name}${this.selectedCity.name}${
        this.selectedCounty.name
      }${this.communityAddress}`;
    },
    totalPrice() {
      return function(index) {
        const total =
          this.goods[index].singlePrice * this.goods[index].goodsCount;
        // eslint-disable-next-line
        this.goods[index].totalPrice = total;
        return total;
      };
    }
  }
};
</script>
<style>
.receiver > span {
  margin-left: 20px;
}
.accent--text .v-label {
  color: black !important;
  border: 2px solid #fb8320;
  /* box-shadow: 2px 2px 4px #f05a00; */
  border-radius: 3px;
  padding: 8px;
}
.accent--text .v-label .v-btn {
  display: inline-block !important;
}
</style>
