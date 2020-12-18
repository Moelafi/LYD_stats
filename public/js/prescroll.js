

window.addEventListener('load', function (){

    var form = document.getElementById("target2");
    console.log(form);

    form.addEventListener("submit",function(){

        //userinput = document.getElementById("userinput")

        var Url = this.elements["URL"].value;

        console.log(Url);

        if(Url){
            this.action = Url;
            this.submit();
        }

    })
},false);