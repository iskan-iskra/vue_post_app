<template>
  <div>
    <form @submit.prevent="submit">
      <fieldset>
        <div class="form-group">
          <label for="title" class="col-sm-2 col-form-label">Title</label>
          <input type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter post title" v-model="title">
        </div>
        <div class="form-group">
          <label for="body" class="form-label mt-4">Body</label>
          <textarea class="form-control" id="body" rows="3" v-model="body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-2">Create Post</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "form.vue",
  data(){
    return {
      title:  '',
      body:   '',
    };
  },
  methods:{
    ...mapActions(['postPost']),
    async submit(){
      if(this.title!=''&&this.body!=''){
        await this.postPost([this.title, this.body]);
        this.title = this.body = '';
      }
    }
  },
  async mounted(){
    
  }
}
</script>

<style scoped>

</style>
