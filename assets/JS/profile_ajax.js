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

//adding friend through ajax
$('#addfriendbtn').click(function(e){
    e.preventDefault();

    $(this).css('backgroundColor','green');
    $(this).val('You are Friends now');

    $.ajax({
        type:'POST',
        url:$(this).attr('href')

    })
    .done(function(data){

    })
    .fail(function(){
        console.log("Error in adding friend");
    })

});

// unfriending through ajax

$('#unfriendbtn').click(function(e){
    e.preventDefault();
    
    $(this).val('Add Friend');
    $.ajax({
        type:'POST',
        url:$(this).attr('href')
    })
    .done(function(data){

    })
    .fail(function(){
        console.log("Error in removing friend");
    })
});