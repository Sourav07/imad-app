console.log('Loaded!');

//Changing the text content
var element = document.getElementById("main-text");
element.innerHTML = "NewValue";

//Move the image
var imgElement = document.getElementById("madi");
var marginLeft = 0;
imgElement.onclick = function(){
    var interval = setInterval(moveRight, 100);
};

function moveRight(){
    marginLeft = marginLeft+10;
    imgElement.style.marginLeft = marginLeft+"px";
}