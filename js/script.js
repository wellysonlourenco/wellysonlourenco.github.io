$(document).ready(function() {
    var data = new Date().getFullYear();
    $("#data").html(data);
});

$(document).scroll(function() {
    var posicao = window.pageYOffset;
    var navbar = $('#navbar');
    var itensmenu = $(".nav-item");
    trocaNav(navbar, posicao, itensmenu);
});

var navbtn = $(".btn-nav");
$(navbtn).click(function(){
  navbtn.removeClass("active");
  $(this).addClass("active");
});

var $root = $('html, body');
$('a').click(function() {
    $root.animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 500);
    return false;
});

function trocaNav(navbar, posicao, itensmenu) {
    if (posicao == 0) {
        navbar.css("background-color", "transparent");
        itensmenu.css("color", "#fff");
    } else {
        navbar.css("background-color", "#fff");
        itensmenu.css("color", "#292929");
    }
}


$("#formcontato").submit(function(event) {
    event.preventDefault();
    if (validar()) {
        request();
    }
});

$('input, textarea').keypress(function(e) {
    if (e.which == 13 && validar()) {
        request();
        return false;
    }
});

function request() {
    $.ajax({
        url: "https://formspree.io/tiago_tmax@hotmail.com",
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        beforeSend: function() {
            antesEnvio();
        },
        success: function() {
            sucessoRequest();
        },
        error: function() {
            erroRequest();
        }
    });
}

function antesEnvio() {
    $('input,textarea').blur();
    $("#notificacao").fadeIn("slow");
    $("#txtnotif").html("");
    $("#titnotif").html("Enviando...");
    $("#notificacao").attr('class', 'notificacao info');
}

function sucessoRequest() {
    $("#titnotif").html("Seu formulário foi enviado com sucesso!");
    $("#txtnotif").html("Logo farei contato :)");
    $("#notificacao").attr('class', 'notificacao boa');
    $("#notificacao").fadeIn("slow");
    $("input").val("");
    $("textarea").val("");
    setTimeout(function() {
        $("#notificacao").fadeOut("slow");
    }, 6500);
}

function erroRequest() {
    $("#titnotif").html("Sua mensagem não foi enviada!");
    $("#txtnotif").html("Por favor, tente contato pelo meu E-mail, ou telefone.");
    $("#notificacao").attr('class', 'notificacao ruim');
    $("#notificacao").fadeIn("slow");

    setTimeout(function() {
        $("#notificacao").fadeOut("slow");
    }, 6500);
}

function validar() {
    var nome = $("#nome");
    var email = $("#email");
    var telefone = $("#telefone").val();
    var mensagem = $("#mensagem");
    var valido = true;
    var filtro = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (nome.val() === "") {
        $("#valida_nome").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Preencha o Campo Nome</p>");
        $("#valida_nome").show();
        valido = false;
    } else {
        $("#valida_nome").hide();
    }

    if (email.val() === "") {
        $("#valida_email").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Preencha o Campo E-mail</p>");
        $("#valida_email").show();
        valido = false;
    } else if (!filtro.test(email.val())) {
        $("#valida_email").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Preencha com um e-mail válido</p>");
        $("#valida_email").show();
        valido = false;
    } else if (filtro.test(email.val())) {
        $("#valida_email").hide();
    }

    if (telefone === "") {
        $("#valida_telefone").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Preencha o campo Telefone</p>");
        $("#valida_telefone").show();
        valido = false;
    } else if (telefone.toString().length < 8 || telefone.toString().length > 11) {
        $("#valida_telefone").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Insira uma quantidade de números correta (entre 8 e 11 caracteres)</p>");
        $("#valida_telefone").show();
        valido = false;
    } else if (telefone.toString().length >= 8 && telefone.toString().length <= 11) {
        $("#valida_telefone").hide();

    }

    if (mensagem.val() === "") {
        $("#valida_mensagem").html("<p class='palerta'><span class='glyphicon glyphicon-info-sign'></span> Preencha o campo Mensagem</p>");
        $("#valida_mensagem").show();
        valido = false;
    } else {
        $("#valida_mensagem").hide();

    }
    return valido;
}
