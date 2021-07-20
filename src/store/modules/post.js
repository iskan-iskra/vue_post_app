export default{
    actions:{
        async getPosts(ctx){
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await res.json();
            ctx.commit('updatePosts', posts)
        },
        async postPost(ctx, [title, body]){
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                  title: title,
                  body: body,
                  userId: 1,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
            const post = await res.json();
            ctx.commit('addCreatedPost', post)
        },
        async deletePost(ctx, id){
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
                });
            ctx.commit('deletePost',id);
        },
        async putPost(ctx,[id,title,body]){
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  title: title,
                  body: body
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
            const post = await res.json();
            ctx.commit('changePost',post)
        }
    },
    mutations:{
        updatePosts(state, posts){
            state.posts = posts;
        },
        addCreatedPost(state, post){
            state.posts.unshift(post)
        },
        deletePost(state, gotId){
            state.posts = state.posts.filter(item => item.id !== gotId);
        },
        changePost(state, post){
            let changePost_index = state.posts.findIndex(item => item.id === post.id);
            state.posts.splice(changePost_index,1,post)
        }
    },
    state:{
        posts: []
    },
    getters:{
        allPosts(state){
            return state.posts
        }
    }
}