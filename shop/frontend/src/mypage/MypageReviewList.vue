<template>
    <SideVar/>
    <div id="padd">
      <div class="fontSize">
        <b-nav tabs align="center">
          <b-nav-item @click="activeTab = 'yesReview'" :active="activeTab === 'yesReview'">
            작성 가능한 리뷰
          </b-nav-item>
          <b-nav-item @click="activeTab = 'noReview'" :active="activeTab === 'noReview'">
            작성한 리뷰
          </b-nav-item>
        </b-nav>
      </div>
      <div v-if="activeTab === 'yesReview'">
        <yesReview/>
      </div>
      <div v-if="activeTab === 'noReview'">
        <noReview/>
      </div>
    </div>
  </template>
  
  <script>
  import noReview from '../components/MypageNoReview.vue'
  import yesReview from '../components/MypageYesReview.vue'
  import pageCalcMixin from '../mixin.js'
  import SideVar from '../components/SideVar.vue'
  import PagingComponent from '../components/PagingComponent.vue'
  import axios from 'axios'
  
  export default {
    mixins: [pageCalcMixin],
    components: { SideVar, PagingComponent, yesReview, noReview },
    data() {
      return {
        id: 9999,
        activeTab: 'yesReview' // 초기 활성 탭 설정
      };
    },
    created() {
      this.id = this.$store.getters.getUserInfo.user_id
    },
    methods: {
      // 기존 메서드들 주석 처리됨
    }
  }
  </script>
  
  <style>
  /* 필요한 스타일 지정 */
  </style>
  