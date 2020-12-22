

window.addEventListener('load', function (){

    var form = document.getElementById("target2");
    //console.log(form);

    form.addEventListener("submit",function(){

        //userinput = document.getElementById("userinput")

        var Url = this.elements["URL"].value;
        var path = new URL("Https://" + String(Url));
        var Tpath = path.pathname

        console.log(Tpath);

        if(Tpath){
            this.action = Tpath;
            this.submit();
        }        

    })
},false);
