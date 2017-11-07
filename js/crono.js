	var dInicial;
	var dUltimaMarcacao;
	var intervalo;
	var somaTempos = 0;
	var qtdeMarcas = 0;
	var maior = 0;
	var menor = 99999999;
	
	
	function iniciar(){
		dInicial = new Date();
		dUltimaMarcacao = new Date();
		intervalo = setInterval(atualizar,51);
		document.getElementById("i").disabled = true;
		document.getElementById("m").disabled = false;
		document.getElementById("p").disabled = false;
		somaTempos = 0;
	    qtdeMarcas = 0;
		maior = 0;
		menor = 99999999;
	
	}
	 function atualizar(){
		d = new Date();
		dif = d.getTime()-dInicial.getTime();
		document.getElementById("marcador").innerHTML = (dif/1000).toFixed(1) +"s";
		parcial = d.getTime()-dUltimaMarcacao.getTime();
		document.getElementById("parcial").innerHTML = (parcial/1000).toFixed(1) +"s";
	 }
	 function marcar(){
		d = new Date();
		dif = d.getTime()-dUltimaMarcacao.getTime();
		qtdeMarcas++;
		somaTempos = somaTempos + dif;
		dUltimaMarcacao = d;
		
		if (maior < dif){
			maior = dif;
		}
		if (menor > dif){
			menor = dif;
		}
		
		//alert("A primeira marcação "+dif);
		registros = document.getElementById("registros").innerHTML;
		registros = registros+" "+dif;
		document.getElementById("registros").innerHTML = registros;
	 }
	 function parar(){
		clearInterval(intervalo);
		document.getElementById("i").disabled = false;
		document.getElementById("m").disabled = true;
		document.getElementById("p").disabled = true;
		calcularEstatistica();
	}
	function calcularEstatistica(){
		media = somaTempos / qtdeMarcas;
		document.getElementById("media").innerHTML = (media/1000).toFixed(1)+"s";
		document.getElementById("maior").innerHTML = maior+" ms";
		document.getElementById("menor").innerHTML = menor+" ms";
		document.getElementById("amostras").innerHTML = qtdeMarcas;
		
	}
	function carregarConfiguracao(){
	    document.getElementById("i").disabled = false;
		document.getElementById("m").disabled = true;
		document.getElementById("p").disabled = true;
	}
	function salvarTempos(){
			
				produto = document.getElementById("sProdutos").value;
				processo = document.getElementById("sProcessos").value;
				data = ""; //YYYY/MM/dd
				tempos = document.getElementById("registros").innerHTML;
				obs = document.getElementById("obs").value;
				if (produto == "" || processo == ""){
					document.getElementById("errProd").style.display = "block";
				} else {
					inserirTempos(produto, processo, data, tempos, maior, menor, media, qtdeMarcas, obs);
				}
	}
	function redirect(){
		setInterval(redirecionar,3000)
	}
	function redirecionar(){
		location.href="historico.html"
	}
	function emBranco(){
		document.getElementById("i").disabled = true;
	}
	function cancelar(){
		location.reload();
	}