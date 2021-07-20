<template>
  <div>
    <div class="card mb-3 mt-3">
      <div class="card-body" v-for="post in allPosts" :key="post.id">
        <div class="card-title" >
          <input v-model="title" v-if="isEditing===post.id">
          <div v-if="isEditing != post.id">{{post.title}}</div>
        </div>
        <div  class="card-text">
          <input v-model="body" v-if="isEditing===post.id">
          <div v-if="isEditing != post.id">{{post.body}}</div>
        </div>
        <button @click="deletethisPost(post.id)">Delete</button>
        <button @click="isEditing=post.id" v-if="isEditing != post.id">Edit</button>
        <button @click="save(post.id)" v-else-if="isEditing===post.id">Save</button>
        <button v-if="isEditing===post.id" @click="cancelPostEdit()">Cancel</button>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "index",
  data(){
    return {
      title:  '',
      body:   '',
      isEditing: null,
    };
  },
  computed: mapGetters(["allPosts"]),
  methods:{
    ...mapActions(["getPosts","deletePost","putPost"]),
    async deletethisPost(ID){
      await this.deletePost(ID);
    },
    async cancelPostEdit(){
      this.isEditing = this.title = this.body = null;
    },
    async save(ID){
      if(this.title!=''&&this.body!=''){
        await this.putPost([ID,this.title, this.body])
        this.isEditing = this.title = this.body = null;
        console.log(ID);
      }
      alert('You can not make empty post')
    }
    
  },  
  async mounted(){
    this.getPosts();
  }
}
</script>

<style scoped>

</style>
