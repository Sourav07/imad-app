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
