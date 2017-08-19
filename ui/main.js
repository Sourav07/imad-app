console.log('Loaded!');

var counter = 0;
var button = document.getElementById("counter");
button.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechanged = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
                var counter = request.responseText;
                var countElement = document.getElementById("count");
                countElement.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET', "http://souravnayak111.imad.hasura-app.io/counter", true);
    request.send(null);
};

var submitButton = document.getElementById("submit_btn");
submitButton.onclick = function(){
    var list = "";
    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    var request = new XMLHttpRequest();
    request.onreadystatechanged = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
                var names = (JSON.parse(request.responseText)).namesList;
                for(var i = 0; i < names.length; i++){
                    list += "<li>"+names[i]+"</li>";
                }
                var listElement = document.getElementById("name_list");
                listElement.innerHTML = list;
            }
        }
    };
    request.open("GET", "http://souravnayak111.imad.hasura-app.io/submit-name/"+name, null);
    request.send(null);
};