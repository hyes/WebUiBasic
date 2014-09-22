aBookList ="";

window.addEventListener('load', function (){
 requestJson();
 toggleSubgenre();
 changeGenre();
 requestMoreBooks();    

}, false); 


function requestJson(){
 var url = "http://localhost:8000/booklist.json";
  var request2 = new XMLHttpRequest();
    request2.open("GET", url, true);
    request2.send(null);
     
    request2.onreadystatechange = function(){
        if(request2.readyState ===4 && request2.status ===200){
            result = JSON.parse(request2.responseText);
            aBookList = result;
        }
    }
}

function toggleSubgenre(){ 
    var clickPosition = document.body.getElementsByClassName("subgenre");  //querySelector
    var testDiv = document.getElementById('gnb_left').querySelector('li');
    document.body.addEventListener("click", function(e){
        if (e.target.id === 'genre' && clickPosition[0].style.display === 'none'){
            clickPosition[0].style.display = 'block';
            return;
        }
        clickPosition[0].style.display = 'none';                              
    }, false);
}



function changeGenre(){  
    
 var getSubgenre = document.getElementById('subgenre');
 getSubgenre.addEventListener("click", function(e) {
     
    if(e.target.nodeName === "LI"){
        targetKeyName = e.target.className;
        var	eBooksList = document.querySelectorAll('article>ul');
        var sBooks = makeBookElement(targetKeyName);
        var eBooksListLength = eBooksList.length;
        var i;
        for (i = 0; i < eBooksListLength; i++) {
            eBooksList[i].innerHTML = sBooks;
        }
     }
    }, false);
}
        

    
    
function makeBookElement(targetKeyName) {

             var sTemplate = 
                      "<li><div class='img'><a href =#><img src='<%=PageLink%>' width='180', height='240'></a></div><div class='d'><%=bookTitle%><br><span><%=author%></span><div class='price'><a href=#><%=price%></a></div></div></li>";

             var patternTitle = "<%=bookTitle%>"; 
             var patternLink = "<%=PageLink%>"; 
             var patternAuthor = "<%=author%>";
             var patternPrice = "<%=price%>";
             var result = [];
             aBookList[targetKeyName].forEach(function(item){ 
                 result.push(sTemplate.replace(patternTitle, item.name).replace(patternLink, item.imgSrc).replace(patternAuthor, item.author).replace(patternPrice, item.price)); 
             }); 
            var final = result.join('');
            return final;
        }   


function requestMoreBooks(){

 var moreButton = document.getElementsByTagName('button');
 moreButton[3].addEventListener("click", function(e) {
     
     var showMoreBooks = document.querySelector("article");
     var moreBooks = makeMoreBook('genreComics');
     console.log(moreBooks);
     var i;
        for (i = 0; i < 2; i++) {
            showMoreBooks.insertAdjacentHTML('beforeend', moreBooks);
           
        }        
    
        
        } , false);
}



function makeMoreBook(targetKeyName) {

             var sTemplate = 
              "<ul><li><div class='img'><a href =#><img src='<%=PageLink%>' width='180', height='240'></a></div><div class='d'><%=bookTitle%><br><span><%=author%></span><div class='price'><a href=#><%=price%></a></div></div></li></ul>";

             var patternTitle = "<%=bookTitle%>"; 
             var patternLink = "<%=PageLink%>"; 
             var patternAuthor = "<%=author%>";
             var patternPrice = "<%=price%>";
             var result = [];

             aBookList[targetKeyName].forEach(function(item){ 
                 result.push(sTemplate.replace(patternTitle, item.name).replace(patternLink, item.imgSrc).replace(patternAuthor, item.author).replace(patternPrice, item.price)); 
             }); 
            var final = result.join('');
            return final;
        } 




