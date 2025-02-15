window.addEventListener("load", function() {
    document.getElementById("forma").addEventListener("submit", function(){
      event.preventDefault(); //dodato
      var validno = true;
      if (document.getElementById("naziv").value.length < 3){
        validno = false;
        document.getElementById("naziv").classList.add("error");
        document.getElementById("naziv").classList.remove("success");
      } 
      else {
        document.getElementById("naziv").classList.add("success");
        document.getElementById("naziv").classList.remove("error");
      }
     
      
        var spanovi = document.querySelectorAll("#oprema > span.badge");
        var niz = [];
        for(let i = 0; i< spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
        }
        
        

        return validno;
        
    });
   
    document.getElementById("dodaj-opremu").addEventListener("click", function(){ //this
    var id = document.getElementById("spisak-opreme").value;
    if(!id){
        alert("Izaberi opremu");
        return;
    }
    dodajOpremu(id);
  })
});
 function dodajOpremu(id){
    document.querySelector(`#spisak-opreme > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-opreme").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-opreme > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-dark");
    span.dataset.id = id;
    span.innerHTML = naziv;

    var button = document.createElement("button");
    button.type = "button"
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";

    span.appendChild(button);
    document.getElementById("oprema").appendChild(span);
    document.getElementById("oprema").appendChild(document.createTextNode(" "));

    button.addEventListener("click", function(){  
    var id = this.parentNode.dataset.id;
    this.parentNode.parentNode.removeChild(this.parentNode);
    document.querySelector(`#spisak-opreme > option[value='${id}']`).disabled = false;
});

 }
 console.log(document.getElementById("naziv"));
//  document.getElementById("naziv").addEventListener("keypress", function(){
//   this.classList.remove('success');
//   this.classList.remove('error')
// });

