let profile = $('#profile-image'); 
profile.on('mouseover',function(err){

    
  $.ajax({
      type:'get',
      url:'user/profile/image',
      success:function(data){
        new Noty({
            theme: 'relax',
            text: "Post Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
        console.log(data);
        // profile.innerText(data.data.filename)
      },
      error:function(error)
      {
          console.log("failed to get image info");
      }  
  });
});
$('#preview').css('visibility','hidden');
$('#profimg').on('click',function(){
    
    $('#preview').css('visibility','visible');      
    
});
$('#profile-image').on('mouseout',function(err){
    $('#profile-image').css('width','100px');
});