// {
     
//        // to create post ajax request
//     let createPost = function(){            
//         let newPostForm = $('#post-form');


//         newPostForm.submit(function(e){
//             e.preventDefault();
//         $.ajax({
//             type:'post',
//             url:'/new/post',
//             data:newPostForm.serialize(),
//             success: function(data){
//                 // noty("Post Created");
//                 let newPost = newPostDom(data.data.post,data.data.name);
//                 $('#post-container').prepend(newPost);
//                 deletePost($('.Delete-post-link', newPost));
                

//             },error: function(error){
//                 console.log(error.responseText);
//             }
//         })

//         });
//     }
  

//     // $('.Delete-post-link').click(function(e){
//     //     e.preventDefault();
//     //     $.ajax({
//     //         type:'get',
//     //         url:$('.Delete-post-link').prop('href'),
//     //         success:function(data){
//     //             // noty("Post Deleted");
//     //             $(`#post-${data.data.post_id}`).remove();
//     //         },error:function(error){
//     //             console.log(error.responseText);
//     //         }
//     // })
//     // });

//     createPost();
    
//     // creating DOM function for post
//     let newPostDom = function(post,name){
//         console.log(post._id)
//             return $(`<section id="post-container">
               
//                 <div id="post-${post._id}" >
                   
//                             <h3>

//                         <a class="Delete-post-link" href="/new/delete/post/${post._id}">X</a>
                              
//                                 Content: ${post.content}<br>
//                                 User:   ${name}<br>
                
//                             </h3>
                           
//                             <div id="comment-section">
                           
//                             <ul id="post-comments-${post._id}">
                      
                        
//                             </ul>
            
//                         <div id="comment">
                      
//                             <form action="new/comment" method="POST" id="comment-form">
//                             <input type="text" name="comment" placeholder="comment">
//                             <input type="hidden" name="post" value="${ post._id }">
//                             <input type="submit" value="Add comment">
//                             </form>
                         
//                             </div>
                            
//                             </div><br>
//                 </div>


//         </section>`);
//     }

   

//     //To delete post with AJAX
//     let deletePost = function(deleteLink)
//     {
//         $(deleteLink).click(function(e){
//             e.preventDefault();
      
//         $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     // noty("Post Deleted");
//                     $(`#post-${data.data.post_id}`).remove();
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//         })
//     });
//     }
    
//     // to create comment
//     let createComment = function(){
//         let newComment = $('#comment-form');
//         newComment.submit(function(e){
//             e.preventDefault();
            
//             $.ajax({
//                 type:'post',
//                 url:'new/comment',
//                 data:newComment.serialize(),
//                 success:function(data){ 

//                 let newcomCreate = newCommentDOM(data.data.comments,data.data.name);

//                 $('#comment-section').prepend(newcomCreate);
               
//                 deleteComment($(' .delete-comment-link', newcomCreate));
                
                
//                 },error:function(error){

//                  console.log(error.responseText);
//                 }
//             });
//         });
//     }
   
//     createComment();
//     // notification function returns flash message 
//     // var noty = function(str)
//     // {
//     //    return new Noty({
//     //         theme:'metroui',
//     //         text: str,
//     //         type: 'info',
//     //         layout:'topRight',
//     //         timeout:1500
//     //                 }).show();
//     // }
//     let newCommentDOM = function(comments,name)
//     {
//         console.log("check",comments.comments._id);
      
//        return $(`<div id="comments-${comments._id}" >
       
//       <ul>
//       <li>
//       <a class="delete-comment-link" href="new/delete/comment/${comments._id}" >X</a>
//       <p> <small> ${name}</small>: ${ comments.comments}</p><br>
//       </li>
//       </ul>
      
//         </div>`);
//     }

//     let deleteComment = function(deleteComLink)
//     {
//         $(deleteComLink).click(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(deleteComLink).prop('href'),
//                 success:function(data){
//                     noty("Comment Deleted");

//                     $(`#comments-${data.data.comment_id}`).remove();
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
//             })

//     });
    
//     }
    
// }
