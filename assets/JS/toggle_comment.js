

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