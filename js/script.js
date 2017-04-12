var contabarra = 0;
$(document).scroll(function(){
   var brand  = $('#brand');
   var posicao = window.pageYOffset;
   var navbar = $('#navbar');
   var itensmenu = $(".nav-item");
   var topo = $("#topo");
   trocaNav(navbar, topo, posicao, brand, itensmenu);
   console.log(posicao, contabarra);
   if (posicao>=900 && contabarra == 0) {
     move();
     contabarra++;
   }
});

$('#toggle').click(function(){
   var offcanvas = $('#offcanvas');
   var toggle = $('#toggle');
   var expand = $('#expand');
   escondeCanvas(offcanvas, expand, toggle);
});

$('#expand').click(function(){
   var offcanvas = $('#offcanvas');
   var toggle = $('#toggle');
   var expand = $('#expand');
   mostraCanvas(offcanvas, expand, toggle);
});
$('.off-item').click(function(){
   var offcanvas = $('#offcanvas');
   var toggle = $('#toggle');
   var expand = $('#expand');
   escondeCanvas(offcanvas, expand, toggle);
});


function trocaNav(navbar, topo, posicao, brand, itensmenu){
  if (posicao == 0){
    navbar.css("background-color", "transparent");
    brand.attr("src","img/logo_bp.png");
  } else{
    navbar.css("background-color", "white");
    brand.attr("src","img/logo.png");
  }

  var bg = "white", fonte = "black", borda = "black";

    if (posicao == 0) {
      fonte = "white";
//       borda = "white";
       bg = "transparent";
    }

    else{
          fonte = "black";
          bg = "white";

    }
    topo.each(function (i) {
      $(this).css({
         "background-color": bg
        });
    });
    itensmenu.each(function (i) {
      $(this).css({
         "color": fonte,
         "border-bottom-color": borda
        });
    });

}
function escondeCanvas(offcanvas, toggle, expand){
     offcanvas.css("display","none");
     expand.css("display","none");
     toggle.css("display","inline");
}
function mostraCanvas(offcanvas, toggle, expand){
     offcanvas.css("display","inline");
     expand.css("display","inline");
     toggle.css("display","none");

}
function move() {
  var barras = $('.barra');
  var labels = [$("#porcentagemhtml"), $("#porcentagemcss"),  $("#porcentagemjs"), $("#porcentagemphp"), $("#porcentagemsql")];
  var width = 1;
  var tempo = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(tempo);
    } else {
      width++;
      labels[0].html(width +"%");
      barras[0].style.width = width + '%';
      labels[1].html(width - 20 +("%") );
      barras[1].style.width = (width-20) + '%';
      labels[2].html(width - 20 + ("%"));
      barras[2].style.width = (width - 20) + '%';
      labels[3].html(width - 30 +("%"));
      barras[3].style.width = (width-30) + '%';
      labels[4].html(width - 40 +("%"));
      barras[4].style.width = (width-40)+ '%';
    }
  }
}
