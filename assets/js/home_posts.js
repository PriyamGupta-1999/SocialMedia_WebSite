{
    //method created to submit the form data for new post using ajax
    let createPost= function(){
        let newPostForm= $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost= newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    //creating the post in DOM
    let newPostDom = function(post){
        //remove all <%%> from post.ejs and make them ${} --> to operate 
        //remove if condition to check if user is logged in or not before deleting as we can see them for now 
        //this file will be send by above ajax request 
        return $(`<li id="post-${post._id}">
        <p>
        
           
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>    
            
              
            
            ${ post.content }
            <br>
            <small>
                ${ post.user.name }
            </small>
        </p>
        <!-- POST COMMENTS  -->
        <div class="post-comments">
            
                
                 <form action="/comments/create" method="POST">
                     <input type="text" name="content" placeholder="type here to add comments..">
                     <!-- sending hidden data  -->
                     <input type="hidden" name="post" value="${post._id }">
                     <input type="submit" value="Add Comment">
    
                 </form>
            
        </div>
    
    
        <div id="post-comments-list">
            <ul id="post-comments-${post._id }" >
                
                    
                
            </ul>
        </div>
    </li>`)
    }
    createPost();
}