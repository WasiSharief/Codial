{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/new/post',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Togglelike ($('.liker',newPost));

                    new ToggleComment ($('.commentclickdiv',newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li class="post-class" id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="new/delete/post/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="likes-comments-section">

                    <div class="likes">
                    <a class="likeanchor" href="/likes/toggle/?id=${post._id}&type=Post"  ><i class="fas fa-thumbs-up liker" ></i><p class="likecount">${post.likes.length}</p> Likes</a>
                     </div>

                    <div class="post-comments">
                        
                    <div class="commentclickdiv"><a href="" id="comment_visible">Comments</a></div>
               
                <div class="comments" id="comments">

                            <form id="post-${ post._id }-comments-form" action="new/comment" method="POST">
                                <input type="text" name="comment" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            
                            </ul>
                        </div>
                    </div>
                    </div>
                    </div>
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}