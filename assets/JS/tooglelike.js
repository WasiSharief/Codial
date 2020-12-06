
class Togglelike{

    constructor(toggleElement)
    {
        this.toggler = toggleElement;
        this.togglelike();
    
    }

     togglelike() {
    
    let count =0;

$(this.toggler).click(function(e){
    e.preventDefault();

    let like = $(this);
    like.toggleClass('liker-toggle');
    
    // let likescount = parseInt($(self).attr('data-likes'));

    let counter = $(this).parent().children('.likecount')
    
    $.ajax({
        type:'get',
        url:like.parent().attr('href'),
    })
    .done(function(data){
        
        if(data.data.deleted==false){
            // $('.likecount').text(likescount);
            counter.text(++data.data.count);
            like.css('color','rgb(53, 109, 231)');
            console.log("liked");
            
        }
        else{

            counter.text(--data.data.count);   
            like.css('color','black');
            console.log("unliked");
        }
    })
    .fail(function (errData){
        console.log('error in completing request');
    })
    
});
     }

//selecting child class of commentclickdiv div which is comments and adding toggle class


}

class ToggleComment{

    constructor(toggleElement)
    {
        this.toggler = toggleElement;
        this.togglecomment();
    }

    togglecomment(){

        $(this.toggler).click(function(e){
            e.preventDefault();
            let commentvisible = $(this).parent().children('.comments');
            commentvisible.toggleClass('commentshide');
            });
    }

}































