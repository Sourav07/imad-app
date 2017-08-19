console.log('Loaded!');

//Changing the text content
var element = document.getElementById("main-text");
element.innerHTML = "NewValue";

//Move the image
var imgElement = document.getElementById("madi");
var marginLeft = 0;
imgElement.onclick = function(){
    var interval = setInterval(moveRight, 50);
};

function moveRight(){
    if(marginLeft == 400){
        marginLeft = 0;
    }
    marginLeft = marginLeft+10;
    imgElement.style.marginLeft = marginLeft+"px";
}