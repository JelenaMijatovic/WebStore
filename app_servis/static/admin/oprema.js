var id = null;

window.addEventListener("load", function(){

    var url = new URL( window.location.href );
    id = url.searchParams.get("id"); 

    fetch("http://localhost:9000/oprema/" + id, {headers:{ 'Authorization': `Bearer ${token}`}}).then( resp=>resp.json() )
    .then( data=>{
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("opis").value = data.opis; 
        document.getElementById("kategorija").value = data.kategorija_id; 
        document.getElementById("cena").value = data.cena; 
        console.log(data);

        for(let i=0; i<data.tagovi.length; i++){
            dodajTag(data.tagovi[i].id);
        }
        
    })
    .catch(err=>console.log(err));

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();

        if (document.getElementById("naziv").value.length < 3) {
          document.getElementById("naziv").classList.add("error");
          document.getElementById("naziv").classList.remove("success");
          event.preventDefault();
        } else {
          document.getElementById("naziv").classList.remove("error");
          document.getElementById("naziv").classList.add("success");
        }

        var spanovi = document.querySelectorAll("#tagovi > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
         }
        document.getElementById("tagovi-input").value = JSON.stringify(niz);
        console.log(document.getElementById("tagovi-input").value);

        var novaOprema = {};
        novaOprema.naziv = document.getElementById("naziv").value; 
        novaOprema.opis = document.getElementById("opis").value;
        novaOprema.kategorija_id = document.getElementById("kategorija").value;
        novaOprema.cena = document.getElementById("cena").value;
        novaOprema.tagovi = document.getElementById("tagovi-input").value;
        console.log(novaOprema);

        fetch("http://localhost:9000/oprema/" +id, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(novaOprema)
        })
        .then(succ=>succ.json())
        .then(data=>{
        window.location.href=`/admin/oprema.html`;
        })
        .catch(err => console.log(err));	

        return true;
    });

    document.getElementById("naziv").addEventListener("keypress", function(){
		this.classList.remove('success'); 
        this.classList.remove('error'); 
    });

    document.getElementById("dodaj-tag").addEventListener("click", function(){
        var id = document.getElementById("spisak-tagova").value;
        if(!id){
            alert("Izaberi tag");
            return;
        }
        dodajTag(id);
    });

});

function dodajTag(id) {

    document.querySelector(`#spisak-tagova > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-tagova").selectedIndex = 0;
    var naziv = document.querySelector(`#spisak-tagova > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;

    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";
    button.addEventListener("click", function(){
        var id = this.parentNode.dataset.id;
        this.parentNode.parentNode.removeChild( this.parentNode );
        document.querySelector(`#spisak-tagova > option[value='${id}']`).disabled = false;
        });
    span.appendChild(button);

    document.getElementById("tagovi").appendChild(span);
    document.getElementById("tagovi").appendChild(document.createTextNode(" "));
}

