<template>
  <div>
    <h1>Product Reviews</h1>
    <table class="review-table">
      <thead>
        <tr>
          <th>Review No</th>
          <th>Content</th>
          <th>Score</th>
          <th>Date</th>
          <th>User ID</th>
          <th>Photos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.review_no">
          <td>{{ review.review_no }}</td>
          <td>{{ review.review_content }}</td>
          <td> <div><template v-for="star in review.review_score">★</template></div></td>
          <td>{{ getDateFormat(review.review_date) }}</td>
          <td>{{ review.user_id }}</td>
          <td>
            <div class="photos">
              <img v-for="photo in review.add_names.split(',')" :key="photo" :src="`/api/upload/${photo.trim()}`" :alt="`Photo of review ${review.review_no}`">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import pageCalcMixin from '../mixin.js'
import axios from "axios";
    export default{
    mixins:[pageCalcMixin],
    data(){
     return {
        reviews:{}
     }; 
    },
    created(){
    },
    methods:{
        async getData(no){
            console.log(no,'여긴리스트')
            await axios.get(`/api/mypage/ProductReview/?pno=${no}`)
            .then(result=>{console.log(result),this.reviews=result.data})
            .catch(err=>console.log(err))
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    }
    }
</script>
<style scoped>
.review-table {
  width: 100%;
  border-collapse: collapse;
}

.review-table th, .review-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.review-table th {
  background-color: #f2f2f2;
}

.review-table img {
  max-width: 100px;
  height: auto;
  margin-right: 5px;
}
</style>