	
html5sql.openDatabase("cronov1","BD CronoV1",3*1024*1024);

	function createTableProdutos(){
            
        html5sql.process(
             [
                "CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY "+
						"KEY AUTOINCREMENT, descricao TEXT);",
             ],
             function(){
                console.log("tabela criada com sucesso! ");
             },
             function(error, statement){
               //  errors.append("<li>"+error.message+" Occured while processing: "+statement+"</li>");
             }
        );
		
		carregarListaProdutos();
	}

	function createTableProcessos(){
            
        html5sql.process(
             [
                "CREATE TABLE IF NOT EXISTS processos (id INTEGER PRIMARY "+
						"KEY AUTOINCREMENT, descricao TEXT);",
             ],
             function(){
                console.log("tabela criada com sucesso! ");
             },
             function(error, statement){
               //  errors.append("<li>"+error.message+" Occured while processing: "+statement+"</li>");
             }
        );
		
		carregarListaProcessos();
	}
	
	function salvarProduto(){
		produto = document.getElementById("descricao").value;
		inserirProduto(produto);
	}
	
	function salvarProcesso(){
		processo = document.getElementById("descricao").value;
		inserirProcesso(processo);
	}

	function inserirProduto(descricao){
            
        html5sql.process(
             [
                "INSERT INTO produtos (descricao) values ('"+descricao+"') ;",
             ],
             function(){
                console.log("Item inserido com sucesso");
				location.reload();
             },
             function(error, statement){
				 console.log(error.message);
				 console.log(statement);
             }
        );
    }
	
	function inserirProcesso(descricao){
            
        html5sql.process(
             [
                "INSERT INTO processos (descricao) values ('"+descricao+"') ;",
             ],
             function(){
                console.log("Item inserido com sucesso");
				location.reload();
             },
             function(error, statement){
				 console.log(error.message);
				 console.log(statement);
             }
        );
    }
	
	function carregarListaProdutos(){
		var tabela = document.getElementById("tabela");
                 
        html5sql.process(
             [{
                 sql:"SELECT * FROM produtos",
				 data:[],
             }],
             function(transaction, results, rowsArray){
                 for(var i = 0; i < rowsArray.length; i++){
					 
                     var linha = tabela.insertRow(tabela.rows.length);
					 var id = linha.insertCell(0);
					 var desc = linha.insertCell(1);
					 id.innerHTML = rowsArray[i].id;
					 desc.innerHTML = rowsArray[i].descricao;
					 
                 }
                 console.log("Leitura efetuada com sucesso");
             },
             function(error, statement){
                 console.log("Erro: "+error.message+" Occured while processing: "+statement+"");
             }
        );
    }
	function carregarListaProcessos(){
		var tabela = document.getElementById("tabela");
                 
        html5sql.process(
             [{
                 sql:"SELECT * FROM processos",
				 data:[],
             }],
             function(transaction, results, rowsArray){
                 for(var i = 0; i < rowsArray.length; i++){
					 
                     var linha = tabela.insertRow(tabela.rows.length);
					 var id = linha.insertCell(0);
					 var desc = linha.insertCell(1);
					 id.innerHTML = rowsArray[i].id;
					 desc.innerHTML = rowsArray[i].descricao;
					 
                 }
                 console.log("Leitura efetuada com sucesso");
             },
             function(error, statement){
                 console.log("Erro: "+error.message+" Occured while processing: "+statement+"");
             }
        );
    }
	
	function createTableTempos(){
		document.getElementById("errProd").style.display = "none";		
        html5sql.process(
             [
                "CREATE TABLE IF NOT EXISTS tempos (id INTEGER PRIMARY "+
						"KEY AUTOINCREMENT, produto TEXT, processo TEXT, data DATE, tempos TEXT, media TEXT, maior TEXT, menor TEXT, amostras TEXT, obs TEXT);",
             ],
             function(){
                console.log("tabela criada com sucesso! ");
             },
             function(error, statement){
               //  errors.append("<li>"+error.message+" Occured while processing: "+statement+"</li>");
             }
        );
		
		montarListaProdutos();
		montarListaProcessos();
	}
	
	function inserirTempos(produto, processo, data, tempos, maior, menor, media, qtdeMarcas, obs){
		html5sql.process(
             [
                "INSERT INTO tempos (produto, processo, data, tempos, media, menor, maior, amostras, obs) values ('"+produto+"','"+processo+"','"+data+"', '"+tempos+"', '"+media+"', '"+menor+"', '"+maior+"', '"+qtdeMarcas+"', '"+obs+"');",
             ],
             function(){
                console.log("Item inserido com sucesso");
				location.reload();
             },
             function(error, statement){
				 console.log(error.message);
				 console.log(statement);
             }
        );
	};
	
	function montarListaProdutos(){
		var s = document.getElementById("sProdutos");
                 
        html5sql.process(
             [{
                 sql:"SELECT * FROM produtos order by descricao desc",
				 data:[],
             }],
             function(transaction, results, rowsArray){
                 for(var i = 0; i < rowsArray.length; i++){
					 
                     var option = document.createElement("option");
					 option.text = rowsArray[i].descricao;
					 s.add(option, s[0]);
					 
                 }
                 console.log("Leitura efetuada com sucesso");
             },
             function(error, statement){
                 console.log("Erro: "+error.message+" Occured while processing: "+statement+"");
             }
        );
    }
	function montarListaProcessos(){
		var s = document.getElementById("sProcessos");
                 
        html5sql.process(
             [{
                 sql:"SELECT * FROM processos order by descricao desc",
				 data:[],
             }],
             function(transaction, results, rowsArray){
                 for(var i = 0; i < rowsArray.length; i++){
					 
                     var option = document.createElement("option");
					 option.text = rowsArray[i].descricao;
					 s.add(option, s[0]);
					 
                 }
                 console.log("Leitura efetuada com sucesso");
             },
             function(error, statement){
                 console.log("Erro: "+error.message+" Occured while processing: "+statement+"");
             }
        );
    }
	
	function carregarHistorico(){
		
		div = document.getElementById('listaHistorico');
		
		html5sql.process(
             [{
                 sql:"SELECT * FROM tempos",
				 data:[],
             }],
             function(transaction, results, rowsArray){
                 for(var i = 0; i < rowsArray.length; i++){
					 
					 newlink = document.createElement('a');
					 newlink.setAttribute('class','list-group-item');
					 newlink.setAttribute('data-toggle','collapse');
					 newlink.setAttribute('href','#'+rowsArray[i].id);
					 
					 h4 = document.createElement("h4");
					 h4.innerHTML = rowsArray[i].produto+"/"+rowsArray[i].processo;
					 h4.setAttribute('class','list-group-item-heading');
					 newlink.appendChild(h4);
					 p = document.createElement("p");
					 p.innerHTML = rowsArray[i].data;
					 newlink.appendChild(p);
					 div2 = document.createElement("div");
					 div2.setAttribute('class', 'collapse');
					 div2.setAttribute('id',rowsArray[i].id);
					 divW = document.createElement("div");
					 divW.setAttribute('class','well');
					 h55 = document.createElement("h5");
					 h55.innerHTML = "<strong> Nº Amostras: </strong>" +rowsArray[i].amostras;
					 h5 = document.createElement("h5");
					 h5.innerHTML = "<strong> Tempos: </strong>" +rowsArray[i].tempos;
					 h52 = document.createElement("h5");
					 h52.innerHTML = "<strong> Média: </strong>" +(rowsArray[i].media/1000).toFixed(1)+ "s";
					 h53 = document.createElement("h5");
					 h53.innerHTML = "<strong> Maior: </strong>" +rowsArray[i].maior+ "ms";
					 h54 = document.createElement("h5");
					 h54.innerHTML = "<strong> Menor: </strong>" +rowsArray[i].menor+ "ms";
					 h56 = document.createElement("h5");
					 h56.innerHTML = "<strong> Observação: </strong>" +rowsArray[i].obs;
					 
					 divW.appendChild(h55);
					 divW.appendChild(h5);
					 divW.appendChild(h52);
					 divW.appendChild(h53);
					 divW.appendChild(h54);
					 divW.appendChild(h56);
					 div2.appendChild(divW);
					 
					 
					 
					 newlink.appendChild(div2);
					 
					 div.appendChild(newlink);
			 
                 }
                 console.log("Leitura efetuada com sucesso");
             },
             function(error, statement){
                 console.log("Erro: "+error.message+" Occured while processing: "+statement+"");
             }
        );
    }