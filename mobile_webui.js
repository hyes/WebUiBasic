bookList ="";

window.addEventListener('load', function (){
 requestJson();  
 baseTask();
    
}, false); 


function requestJson(){
 var url = "http://localhost:8000/mobile_booklisk.json";
  var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send(null);
     
    request.onreadystatechange = function(){
        if(request.readyState ===4 && request.status ===200){
            result = JSON.parse(request.responseText);
            bookList = result;
        }
    }
}

function baseTask(){
document.addEventListener("touchstart", function(e) {
 console.log(e.touches[0]);
    if(e.touches[0].target.className === "moreLeft"){
        requestChangeBook("genreA");
    }
    else if(e.touches[0].target.className === "moreRight"){
         requestChangeBook("genreB");
    }
    
    }, false);
}
                          

function requestChangeBook(clickedPos){

    var showMoreBooks = document.querySelectorAll("article>ul>li");
    var moreBooks = makeMoreBook(clickedPos);
    var i;
    for(i =0; i < 3; i++){
        showMoreBooks[i].innerHTML = moreBooks;
    }

}
                          
                                
function makeMoreBook(targetKeyName) {

    
             var sTemplate = 
                      "<li><div class='img'><img src='<%=PageLink%>' width='180', height='240'></div><div class='d'><%=bookTitle%><br><span><%=author%></span><div class='price'><a href=#><%=price%></a></div></div></li>";

             var patternTitle = "<%=bookTitle%>"; 
             var patternLink = "<%=PageLink%>"; 
             var patternAuthor = "<%=author%>";
             var patternPrice = "<%=price%>";
             var result = [];
             bookList[targetKeyName].forEach(function(item){ 
                 result.push(sTemplate.replace(patternTitle, item.name).replace(patternLink, item.imgSrc).replace(patternAuthor, item.author).replace(patternPrice, item.price)); 
             }); 
            var final = result.join('');
            return final;
        }   