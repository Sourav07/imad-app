console.log('Loaded!');

//Changing the text content
var element = document.getElementById("main-text");
element.innerHTML = "NewValue";

//Move the image
var imgElement = document.getElementById("madi");
imgElement.onClick = function(){
    imgElement.style.marginLeft = "100px";
};