var idCeldaSeleccionada="";
var seleccionMultiple=[];
var contador=0,contador2=0;
var first=true;
var selMul=false;
var anterior="";
var unir=false;
var moverr=false;
var op=false;
var a=0;
var shift=false;
var seleccionMover=[];
var ceroShift=false;
document.addEventListener("keydown",teclaPrecionada, false);
$(function () {
	    $('#tablee tr>*').click(function (e) {
	    	if(moverr){
	    		if(seleccionMover.length<=1){
	    			idCeldaSeleccionada=e.target.id;
	    			seleccionMover[contador2]=idCeldaSeleccionada;
	    			contador2++;
	    			$("#"+e.target.id+"").css({
				   		"border": '1px solid blue'
				 	}); 
				 	var ant = $("#seleccion").html();
				 	$("#seleccion").html(ant+", "+idCeldaSeleccionada);
				    if(seleccionMover.length>=2){
				       	var aux1 = $("#"+seleccionMover[0]+"").html();
				       	var aux2 = $("#"+seleccionMover[1]+"").html();
				       	$("#"+seleccionMover[0]+"").html(aux2);
				       	$("#"+seleccionMover[1]+"").html(aux1);
				       	for(var i = 0 ; i< seleccionMover.length;i++){
				       		$("#"+seleccionMover[i]+"").css({
					      		"border": '1px solid black'
					       	}); 
				      	}
				      	$("#seleccion").html("Celda Seleccionada");
				       	moverr=false;
				       	seleccionMover=[];
				       	contador2=0;
				       	$("td").css({
							"cursor": 'text',
						});
				    }
	    		}
	    	}else if(selMul){
	        	if(first){
	        		if(idCeldaSeleccionada!=""){
			        	if(!seleccionMultiple.includes(idCeldaSeleccionada)){
			        		seleccionMultiple[contador]=idCeldaSeleccionada;
			        		contador++;
			        	}
			        	idCeldaSeleccionada="";
			        	first=false;
	        		}
	        	}
	        	idCeldaSeleccionada=e.target.id;
	        	if(!seleccionMultiple.includes(idCeldaSeleccionada)){
	        		seleccionMultiple[contador]=idCeldaSeleccionada;
	        		contador++;
	        		anterior = $("#seleccion").html();
			        $("#seleccion").html(""+anterior+", "+idCeldaSeleccionada+"");
			        $("#"+e.target.id+"").css({
				       	"border": '1px solid #ff0000'
				    });
	        	}else{
	        		removerElemento(seleccionMultiple,idCeldaSeleccionada);
	        		$("#"+idCeldaSeleccionada+"").css({
	        			"border": '1px solid black',
	        		});
	        		$("#seleccion").html("Celdas seleccionadas "+seleccionMultiple);
	        		idCeldaSeleccionada="";
	        	}
	        	
	        }else{
	        	if(idCeldaSeleccionada!=""){
		        	$("#"+idCeldaSeleccionada+"").css({
		        		"border": '1px solid black'
		        	});
		        	idCeldaSeleccionada=e.target.id;
			       	$("#"+e.target.id+"").css({
			       		"border": '1px solid #ff0000'
			       	});
			        $("#seleccion").html(""+e.target.id+"");
		        }else{
		        	 idCeldaSeleccionada=e.target.id;
			       	$("#"+e.target.id+"").css({
			       		"border": '1px solid #ff0000'
			       	});
			        $("#seleccion").html(""+e.target.id+"");
		        }
	        }
	    })
})

function removerElemento ( arr, item ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
}
 
function teclaPrecionada(e){
	if(shift){
		if(idCeldaSeleccionada!=""){
			if(e.keyCode==48){
				if(!ceroShift){
					$("#"+idCeldaSeleccionada+"").html("");
					ceroShift=true;
				}
				op=true;
			}
			if(op){
				var x = $("#"+idCeldaSeleccionada+"").html();
				if(e.keyCode == 13 ){
					var numero1="";
					var numero2="";
					var dato1=true;
					var signo;
					var error=false;
					for(var i = 1;i < x.length;i++){
						if(parseInt(x.charAt(i)) || x.charAt(i)=='0'){
							if(dato1){
								numero1+=x.charAt(i);
							}else{
								numero2+=x.charAt(i);
							}	
						}else if(x.charAt(i)=='+' || x.charAt(i)=='-'){
						 	signo=x.charAt(i);
							dato1=false;
						}else{
							error=true;
							i=x.length;
						}
					}
					if(!error){
						var resultado=0;
						if(signo=='+'){
							resultado=parseInt(numero1)+parseInt(numero2);
						}else{
							resultado=parseInt(numero1)-parseInt(numero2);
						}
						$("#"+idCeldaSeleccionada+"").html(resultado);
						$("#"+idCeldaSeleccionada+"").css({
								"border": '1px solid black',
						});
						$("#seleccion").html("Celda Seleccionada");
						idCeldaSeleccionada="";
					 	shift=false;
					 	ceroShift=false;
					}else{
						var letras=['a','b','c','d','e','f','g','h','i','j','k'];
						var signos=[]
						var listaNumeros=[];
						var contadorSigno=0;
						var contadorNumeros=0;
						for(var i = 1;i < x.length;i++){
							if(letras.includes(x.charAt(i)) && parseInt(x.charAt(i+1))>0 && parseInt(x.charAt(i+1))<9){
								listaNumeros[contador]=x.charAt(i)+""+x.charAt(i+1);
								contador++;
								i++;
							}else if(x.charAt(i)=='+' || x.charAt(i)=='-'){
								signos[contadorSigno]=x.charAt(i);
								contadorSigno++;
							}
						}
						var todosAprueban=false;
						for(var i = 0;i < listaNumeros.length;i++){
							var valor = $("#"+listaNumeros[i]+"").html();
							if(parseInt(valor)){
								todosAprueban=true;
							}else{
								todosAprueban=false;
								break;
							}
						}
						if(!todosAprueban){
							$("#"+idCeldaSeleccionada+"").html("Error");
							$("#"+idCeldaSeleccionada+"").css({
								"border": '1px solid black',
							});
							$("#seleccion").html("Celda Seleccionada");
							idCeldaSeleccionada="";
							shift=false;
						 	ceroShift=false;
						}else{
							var valor=0;
							var j=0;
							for(var i = 0;i < listaNumeros.length;i++){
								if(i==0){
									valor += parseInt($("#"+listaNumeros[i]+"").html());
								}else{
									if(j<signos.length){
										if(signos[j]=='+'){
											valor += parseInt($("#"+listaNumeros[i]+"").html());
											j++;
										}else{
											valor -= parseInt($("#"+listaNumeros[i]+"").html());
											j++;
										}
									}
								}
							}
							$("#"+idCeldaSeleccionada+"").html(valor);
							$("#"+idCeldaSeleccionada+"").css({
								"border": '1px solid black',
							});
							$("#seleccion").html("Celda Seleccionada");
							idCeldaSeleccionada="";
							shift=false;
						 	ceroShift=false;
						}
					}
				}	
			}
		}
	} 
	if(!selMul){
		if(idCeldaSeleccionada!=""){
			if(e.keyCode == 8){
				var texto = $("#"+idCeldaSeleccionada+"").html();
				if(texto.length > 0){
					var aux=texto.substr(0,texto.length-1);
					$("#"+idCeldaSeleccionada+"").html(aux);
				}
			}else if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 187 || e.keyCode == 189){
				var celda = document.getElementById(idCeldaSeleccionada);
				celda.innerHTML+=e.key;
			}else if(e.keyCode==16){
				shift=true;
			}else if(e.keyCode == 13 && !shift){
				var celda = document.getElementById(idCeldaSeleccionada);
				celda.innerHTML+="<br>";
			}else if(e.keyCode  == 32){
				var celda = document.getElementById(idCeldaSeleccionada);
				celda.innerHTML+=" ";
			}
		}
	}
	if(e.keyCode==17){
		if(selMul){
			for(var i = 0;i<seleccionMultiple.length;i++){
				$("#"+seleccionMultiple[i]+"").css({
			      	"border": '1px solid black'
			    });
			}
			selMul=false;
			$("td").css({
				"cursor": 'text',
			});
			seleccionMultiple=[];
			contador=0;
			idCeldaSeleccionada="";
			var todo = document.getElementsByTagName("td");
			first=true;
			$("#seleccion").html("Celda Seleccionada");
		}else{
			selMul=true;
			if(idCeldaSeleccionada!=""){
				seleccionMultiple[contador]=idCeldaSeleccionada;
				contador++;
			}
			$("td").css({
				"cursor": 'pointer',
			});
		}
	}
	if(idCeldaSeleccionada!="" || idCeldaSeleccionada==""){
		if(idCeldaSeleccionada==""){
			idCeldaSeleccionada="a1";
		}
		var letras=["a","b","c","d","e","f","g","h","i","j","k"];
		var letra;
		var numero;
		var posicion=0;
		if(e.keyCode==37){
			letra = idCeldaSeleccionada.charAt(0);
			numero = idCeldaSeleccionada.charAt(1);
			posicion=letras.indexOf(letra);
			if(posicion>0){
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid black',
				});
				var letra=letras[posicion-1];
				idCeldaSeleccionada=letra+""+numero;
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid red',
				});
				$("#seleccion").html(idCeldaSeleccionada);
			}
		}else if(e.keyCode==38){
			letra = idCeldaSeleccionada.charAt(0);
			numero = idCeldaSeleccionada.charAt(1);
			if(numero>1){
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid black',
				});
				numero--;
				idCeldaSeleccionada=letra+""+numero;
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid red',
				});
				$("#seleccion").html(idCeldaSeleccionada);
			}
		}else if(e.keyCode==39){
			letra = idCeldaSeleccionada.charAt(0);
			numero = idCeldaSeleccionada.charAt(1);
			posicion=letras.indexOf(letra);
			if(posicion<10){
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid black',
				});
				var letra=letras[posicion+1];
				idCeldaSeleccionada=letra+""+numero;
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid red',
				});
				$("#seleccion").html(idCeldaSeleccionada);
			}
		}else if(e.keyCode==40){
			letra = idCeldaSeleccionada.charAt(0);
			numero = idCeldaSeleccionada.charAt(1);
			if(numero<8){
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid black',
				});
				numero++;
				idCeldaSeleccionada=letra+""+numero;
				$("#"+idCeldaSeleccionada+"").css({
					"border": '1px solid red',
				});
				$("#seleccion").html(idCeldaSeleccionada);
			}
		}
	}
	
}

function getColor(obj){
	if(selMul && seleccionMultiple.length>0){	
		for(var i = 0;i<seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"background": ""+obj.value+""
			});
			$("#"+seleccionMultiple[i]+"").css({
				"border": "1px solid black"
			});
		}
		selMul=false;
		seleccionMultiple=[];
		contador=0;
		idCeldaSeleccionada="";
		$("#seleccion").html("Celda Seleccionada");
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"background": ""+obj.value+""
			});
		}else{
			alert("Seleccione una celda");
		}
	}
}


function subrayar(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			if($("#"+seleccionMultiple[i]+"").css("text-decoration-line")=="none"){
				$("#"+seleccionMultiple[i]+"").css({
					"text-decoration-line": 'underline',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}else if($("#"+seleccionMultiple[i]+"").css("text-decoration-line")=="underline"){
				$("#"+seleccionMultiple[i]+"").css({
					"text-decoration-line": 'none',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}
		}
	}else{
		if(idCeldaSeleccionada!=""){
			if($("#"+idCeldaSeleccionada+"").css("text-decoration-line")=="none"){
				$("#"+idCeldaSeleccionada+"").css({
					"text-decoration-line": 'underline',
				});
			}else if($("#"+idCeldaSeleccionada+"").css("text-decoration-line")=="underline"){
				$("#"+idCeldaSeleccionada+"").css({
					"text-decoration-line": 'none',
				});
			}
		}	
	}
	
}

function negritas(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			if($("#"+seleccionMultiple[i]+"").css("font-weight")=="400"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-weight": 'bold',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}else if($("#"+seleccionMultiple[i]+"").css("font-weight")=="700"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-weight": '400',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}
		}
	}else{
		if(idCeldaSeleccionada!=""){
			if($("#"+idCeldaSeleccionada+"").css("font-weight")=="400"){
				$("#"+idCeldaSeleccionada+"").css({
					"font-weight": 'bold',
				});
			}else if($("#"+idCeldaSeleccionada+"").css("font-weight")=="700"){
				$("#"+idCeldaSeleccionada+"").css({
					"font-weight": '400',
				});
			}
		}	
	}
}

function cursiva(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			if($("#"+seleccionMultiple[i]+"").css("font-style")=="normal"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-style": 'italic',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}else if($("#"+seleccionMultiple[i]+"").css("font-style")=="italic"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-style": 'normal',
				});
				// selMul=false;
				// seleccionMultiple=[];
				// contador=0;
				// idCeldaSeleccionada="";
			}
		}
	}else{
		if(idCeldaSeleccionada!=""){
			if($("#"+idCeldaSeleccionada+"").css("font-style")=="normal"){
				$("#"+idCeldaSeleccionada+"").css({
					"font-style": 'italic',
				});
			}else if($("#"+idCeldaSeleccionada+"").css("font-style")=="italic"){
				$("#"+idCeldaSeleccionada+"").css({
					"font-style": 'normal',
				});
			}
			
		}		
	}
	
}

function izquierda(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"text-align": 'left',
			});
		}
		// selMul=false;
		// seleccionMultiple=[];
		// contador=0;
		// idCeldaSeleccionada="";
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"text-align": 'left',
			});
		}
	}
}

function derecha(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"text-align": 'right',
			});
		}
		// selMul=false;
		// seleccionMultiple=[];
		// contador=0;
		// idCeldaSeleccionada="";
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"text-align": 'right',
			});
		}
	}
}

function justificado(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"text-align": 'justify',
			});
		}
		// selMul=false;
		// seleccionMultiple=[];
		// contador=0;
		// idCeldaSeleccionada="";
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"text-align": 'justify',
			});
		}
	}	
}

function centrado(){
	if(selMul && seleccionMultiple.length>0){
		for(var i = 0 ; i < seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"text-align": 'center',
			});
		}
		// selMul=false;
		// seleccionMultiple=[];
		// contador=0;
		// idCeldaSeleccionada="";
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"text-align": 'center',
			});
		}
	}
}


function getColor2(obj){
	if(selMul && seleccionMultiple.length>=0){	
		for(var i = 0;i<seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"color": ""+obj.value+""
			});
		}
		// selMul=false;
		// seleccionMultiple=[];
		// contador=0;
		// idCeldaSeleccionada="";
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"color": ""+obj.value+""
			});
		}else{
			alert("Seleccione una celda");
		}
	}
}

function juntar(){
	if(selMul && seleccionMultiple.length>1 && seleccionMultiple.length<3){
		var n1 = parseInt(seleccionMultiple[0].charAt(1));
		var n2 = parseInt(seleccionMultiple[1].charAt(1));
		if(n1 != n2){
			var menor=20;
			var pos=0;
			for(var i = 0;i < seleccionMultiple.length;i++){
				if(seleccionMultiple[i].charAt(1)<menor){
					menor=seleccionMultiple[i].charAt(1);
					pos=i;
				}
			}
			var nuevoValor = 0;
			for (var i = 0;i < seleccionMultiple.length;i++){
				var td = document.getElementById(seleccionMultiple[i]).rowSpan;
				nuevoValor+=td;
			}
			$("#"+seleccionMultiple[pos]+"").attr({
			 	"rowspan": nuevoValor,
			});
			for (var i = 0;i < seleccionMultiple.length;i++){
				if(i!=pos){
					$("#"+seleccionMultiple[i]+"").css({
				 		"display": 'none',
				 	});
				}
			}
		}else if(n1 == n2 ){
			var nuevoValor = 0;
			
			for (var i = 0;i < seleccionMultiple.length;i++){
				var td = document.getElementById(seleccionMultiple[i]).colSpan;
				nuevoValor+=td;
			}
			$("#"+seleccionMultiple[0]+"").attr({
			 	"colspan": nuevoValor,
			});
			for (var i = 1;i < seleccionMultiple.length;i++){
				$("#"+seleccionMultiple[i]+"").css({
			 		"display": 'none',
			 	});
			}
		}
		for(var i = 0;i < seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"border": '1px solid black',
			});
		}
		selMul=false;
		$("td").css({
				"cursor": 'text',
		});
		$("#seleccion").html("Celda Seleccionada");
		seleccionMultiple=[];
		idCeldaSeleccionada="";
		contador=0;
	}else{
		alert("Debe seleccionar dos celdas active la seleccion multiple con la tecla ctrl");
	}
	
}

function mover(){
	if(!selMul && seleccionMultiple.length==0){
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"border": '1px solid black'
			}); 
			$("#seleccion").html("Celda seleccionada");
			idCeldaSeleccionada="";
		}
		moverr=true;
		$("td").css({
			"cursor": 'pointer',
		});
		$("#mover").css({
			"box-shadow": '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.16);',
		});
		if(seleccionMover.length>0){
			for(var i = 0 ; i < seleccionMover.length;i++){
				$("#"+seleccionMover[i]+"").css({
					"border": '1px solid black'
				}); 
			}
		}
		seleccionMover=[];
		contador2=0;
	}else{
		alert("Desactive la seleccion multiple con la tecla ctrl");
	}
}


function guardar(){
	var todos = document.getElementsByTagName("td");
	var archivo = [];
	var c=0;
	var gfondo;
	var gsubrayado;
	var gnegrita;
	var gcursiva;
	var galineacion;
	var gcolor; 
	var gcol;
	var grow;
	var gtexto;
	var gdisplay;
	for(var i = 0;i < todos.length; i++){
		///
		gfondo=todos[i].style.backgroundColor;
		var color2 = convertir(gfondo);
		gsubrayado=todos[i].style.textDecorationLine;
		gnegrita=todos[i].style.fontWeight;
		gcursiva=todos[i].style.fontStyle;
		galineacion=todos[i].style.textAlign;
		gcolor=todos[i].style.color;
		var gcolor2 = convertir(gcolor);
		gcol=todos[i].colSpan;
		grow=todos[i].rowSpan;
		gtexto=todos[i].innerHTML;
		gdisplay=todos[i].style.display;
		archivo[c]=gsubrayado+"|"+gnegrita+"|"+gcursiva+"|"+galineacion+"|"+gcol+"|"+grow+"|"+gtexto+"|"+gdisplay+"|"+color2+"|"+gcolor2;
		c++;
	}
	guardarCookie("datos",archivo);
	alert("Registro guardado con exito");
}


function guardarCookie(nombre,valor) {
         document.cookie = nombre+"="+valor;
}

if(document.cookie){
	var misCookies = document.cookie;
	var dat = misCookies.substr(6,misCookies.length).split(",");
	if(dat.length>0){
		var todos = document.getElementsByTagName("td");
		for(var i = 0;i < todos.length;i++){
			var tdMod = document.getElementById(todos[i].id);
			var datosCelda = dat[i].split("|");
			if(datosCelda[0]!=""){
				tdMod.style.textDecorationLine=datosCelda[0];
			}
			if(datosCelda[1]!=""){
				tdMod.style.fontWeight=datosCelda[1];
			}
			if(datosCelda[2]!=""){
				tdMod.style.fontStyle=datosCelda[2];
			}
			if(datosCelda[3]!=""){
				tdMod.style.textAlign=datosCelda[3];
			}
			if(datosCelda[4]!=""){
				tdMod.colSpan=datosCelda[4];
			}
			if(datosCelda[5]!=""){
				tdMod.rowSpan=datosCelda[5];
			}
			if(datosCelda[6]!=""){
				tdMod.innerHTML=datosCelda[6];
			}
			if(datosCelda[7]!=""){
				tdMod.style.display=datosCelda[7];
			}
			if(datosCelda[8]!=""){
				tdMod.style.background=datosCelda[8];
			}
			if(datosCelda[9]!=""){
				tdMod.style.color=datosCelda[9];
			}
		}
	}
}

function convertir(colorStr){ 
		    var hex = '#'; 
		    $.each(colorStr.substring(4).split(','), function(i, str){ 
		     var h = ($.trim(str.replace(')',''))*1).toString(16); 
		     hex += (h.length == 1) ? "0" + h : h; 
		    }); 
		    return hex; 
}; 


function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}