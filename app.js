var $main=document.getElementsByClassName("main")[0];//getting the main section ie(whole page)

var $container=document.createElement("div"); //hold the movie infos for seperate movies
$container.classList.add("container")        //adding container class to container element
$main.appendChild($container)                //appending container into main section

var $popup=document.getElementById("popup")  //getting popup element
var $ok=document.getElementById("ok")        //getting  ok button in popup

var apikey = "6af5e413e17f42d047fcc0b61f2c0618";//API KEY
var $language=document.getElementById("language");//getting language element
var category="";   //category intialy empty string and it shows the movie category(Popular/Upcoming)
var language="";   //language intialy empty string(Language of the movie)

var $nextscreen=document.createElement("div");  //trailer page
var $back=document.createElement("div")      //back button trailer page
$back.innerHTML="BACK"
var $ifrm=document.createElement("iframe")   //iframe element containing trailer

var $dropdown=document.getElementsByClassName("appear")[0];//getting the dropdown element

function fun1(){   //In Language if tamil is Clicked
  category="popular";
  language="ta";
  omg(category,language)
}

function fun2(){    //In Language if English is Clicked
  category="popular";
  language="en";
  omg(category,language)
}

function fun3(){     //In Language if Hindi is Clicked
  category="popular";
  language="hi";
  omg(category,language)
}

function fun4(){      //In Language if Telungu is Clicked
  category="popular";
  language="te";
  omg(category,language)
}

function fun5(){      //In Language if Kanadam is Clicked
  category="popular";
  language="kn";
  omg(category,language)
}



function fun1_1(){  //In Upcoming if tamil is Clicked
  category="upcoming";
  language="ta";
  omg(category,language)
}

function fun2_1(){    //In upcoming if English is Clicked
  category="upcoming";
  language="en";
  omg(category,language)
}

function fun3_1(){    //In Language if Hindi is Clicked
  category="upcoming";
  language="hi";
  omg(category,language)
}

function fun4_1(){     //In Language if Telungu is Clicked
  category="upcoming";
  language="te";
  omg(category,language)
}

function fun5_1(){     //In Language if kanadam is Clicked
  category="upcoming";
  language="kn";
  omg(category,language)
}




//omg function occur when clicking popup,language,upcoming
function omg(category,language){ 
axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=${language}&page=1`)
.then(response=>{
      console.log(response.data)
      if($container.children.length>0){ //if already in one language the we need to remove when clicking happen on other language
        $main.removeChild($container)
        $container=document.createElement("div");//recreate the container section and it now initially hold nothing
        $container.classList.add("container")
        $main.appendChild($container)
        real(response.data.results)  //passing the reponse to real()
      }
      else{
      real(response.data.results)  //passing reponse to real() when first time clicking on languages when page loads
      }
  })
  .catch(error=>{
    console.log("Error"+error)  //handling error when fetching the API
})
}

function real(values){   //Iterate throung the reponse
    values.forEach(val=>{
    $display_details=document.createElement("div")  //hold all movie info and it will be inside of container
    var $movie_name=document.createElement("div");  //movie name section
    var $release_date=document.createElement("div"); //Release date section
    var $image=document.createElement("img");        //Movie Image Section
    var $liked_views=document.createElement("div")   //Movie vies and likes section

    $movie_name.textContent=val.original_title;      
    $release_date.innerHTML="Released:"+" "+val.release_date;
    if(val.poster_path==null){                        //if movie image not found we are displaying a blank image
      $image.src="https://i.stack.imgur.com/WeyM8.jpg"
    }
    else{   
    $image.src=`https://image.tmdb.org/t/p/w500/${val.poster_path}`;//fetching movie image in API
    }
    
    $image.onclick=function getTrailer(){ //When image is clicked we need to show the trailer
      let id=val.id  //getting movie's id and its unique for every movie and using this id we are going to display the trailer 
      axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=${language}`)//trailer fetching in API
      .then(response=>{
      console.log(response.data)
      if(response.data.results[0].key){   //if key found ie(trailer url)
        $container.replaceWith($nextscreen);//replace old scren with new if trailer found
        $nextscreen.appendChild($back)      //append back button and iframe in the new screen
        $nextscreen.appendChild($ifrm) 
        //localStorage.setItem("a",`https://www.youtube.com/embed/${response.data.results[0].key}`)
        $ifrm.src=`https://www.youtube.com/embed/${response.data.results[0].key}`;//opening trailer in new tab
        funs() //call the fun() it conntainer some class to the new screen and its children
        $back.addEventListener("click",funs1) //if back button clicked
        
      }
    })
    .catch(error=>{   //if key not found (trailer not found)
      $popup.style.display="block"   //displaying the none popup into block with animation
      $ok.onclick=function clicky(){ //if Ok button is clicked then displaying the popup into none
        $popup.style.display="none"
      }
    })
  }
    $liked_views.innerHTML="🖤"+val.vote_count+'&nbsp &nbsp &nbsp &nbsp &nbsp'+"👁"+val.popularity;
    $display_details.appendChild($movie_name) //appending movie name element into display section
    $display_details.appendChild($release_date) //appending movie release date element into display section
    $display_details.appendChild($image)        //appending movie image element into display section
    $display_details.appendChild($liked_views)  //appending movie likes&views element into display section
    $display_details.classList.add("display")   //adding class display to display element
   
    $container.appendChild($display_details)    //finally adding display elemnt into container section
    
    })
  }

function funs(){ //toggle btw classes if trailer found
  $back.classList.toggle("back")
  $ifrm.classList.toggle("ifrm")
  $nextscreen.classList.toggle("trail")
}

function funs1(){   //if back button is clicked
  $back.classList.toggle("back")
  $ifrm.classList.toggle("ifrm")
  $nextscreen.classList.toggle("trail")
  $nextscreen.replaceWith($container)
}