var idCeldaSeleccionada="";
var seleccionMultiple=[];
var contador=0,contador2=0;
var first=true;
var selMul=false;
var second=false;
var anterior="";
var moverr=false;
var op=false;
var a=0;
var shift=false;
var seleccionMover=[];
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
	        	}
	        	$("#"+e.target.id+"").css({
			       		"border": '1px solid #ff0000'
			    });
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

function teclaPrecionada(e){
	if(shift){
		if(idCeldaSeleccionada!=""){
			if(e.keyCode==48){
				$("#"+idCeldaSeleccionada+"").html("");
				op=true;
			}
			if(op){
				var x = $("#"+idCeldaSeleccionada+"").html();
				if(e.keyCode == 13 && x.length==6){
					var sumaOresta=[];
					 for(var i = 0; i < x.length; i++){
					 	if(x.charAt(i)=="="){
					 		var id1 = x.charAt(i+1); 
					 		id1+= x.charAt(i+2);
					 		sumaOresta[1]=id1;
					 	}else if(x.charAt(i)=="+" || x.charAt(i)=="-"){
					 		if(x.charAt(i)=="+"){
					 			sumaOresta[0]="+";
					 		}else{
					 			sumaOresta[0]="-";
					 		}
							var id2 = x.charAt(i+1); 
					 		id2+= x.charAt(i+2);
					 		sumaOresta[2]=id2;	
					 	}
					 }
					 var todos = document.getElementsByTagName("td");
					 var sr=0;
					 var contAux=0;
					 var valores=[];
					 var aprobo=false;
					 var aprobo2=false;
					 for(var i = 0;i < todos.length; i++){
					 	if(todos[i].id==sumaOresta[1]){
					 		if($("#"+todos[i].id+"").html()!=""){
					 			sumaOresta[1]=$("#"+todos[i].id+"").html();
					 			aprobo=true;
					 		}
					 	}else if(todos[i].id==sumaOresta[2]){
							if($("#"+todos[i].id+"").html()!=""){
					 			sumaOresta[2]=$("#"+todos[i].id+"").html();
					 			aprobo2=true;
					 		}
					 	}
					 }
					 if(aprobo && aprobo2){
					 	var num1=parseInt(sumaOresta[1]);
					 	var num2=parseInt(sumaOresta[2]);
					 	var res=0;
					 	if(sumaOresta[0]=="+"){
					 		res =num1+num2;
					 	}else{
					 		res =num1-num2;
					 	}
					 	$("#"+idCeldaSeleccionada+"").html(res);
					 }else{
					 	$("#"+idCeldaSeleccionada+"").html("Invalido");
					 	shift=false;
					 }
				}else if(e.keyCode == 13 && x.length<6 || e.keyCode == 13 && x.length>6){
					$("#"+idCeldaSeleccionada+"").html("Invalido");
					shift=false;
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
	}else{
		if(e.keyCode==17){
			if(selMul){
				for(var i = 0;i<seleccionMultiple.length;i++){
					$("#"+seleccionMultiple[i]+"").css({
				      	"border": '1px solid black'
				    });
				}
				selMul=false;
				seleccionMultiple=[];
				contador=0;
				var todo = document.getElementsByTagName("td");
				first=true;
				$("#seleccion").html("Celda Seleccionada");
			}else{
				selMul=true;
			}
		}
	}
	
}

function getColor(obj){
	if(selMul && seleccionMultiple.length>=0){	
		for(var i = 0;i<seleccionMultiple.length;i++){
			$("#"+seleccionMultiple[i]+"").css({
				"background": ""+obj.value+""
			});
		}
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
			}else if($("#"+seleccionMultiple[i]+"").css("text-decoration-line")=="underline"){
				$("#"+seleccionMultiple[i]+"").css({
					"text-decoration-line": 'none',
				});
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
			}else if($("#"+seleccionMultiple[i]+"").css("font-weight")=="700"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-weight": '400',
				});
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
			}else if($("#"+seleccionMultiple[i]+"").css("font-style")=="italic"){
				$("#"+seleccionMultiple[i]+"").css({
					"font-style": 'normal',
				});
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
	}else{
		if(idCeldaSeleccionada!=""){
			$("#"+idCeldaSeleccionada+"").css({
				"text-align": 'center',
			});
		}
	}
}

function mover(){
	if(idCeldaSeleccionada!=""){
		$("#"+idCeldaSeleccionada+"").css({
			"border": '1px solid black'
		}); 
		$("#seleccion").html("Celda seleccionada");

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
}


function guardar(){
	var todos = document.getElementsByTagName("td");
	var archivo = [];
	var c=0;
	for(var i = 0;i < todos.length; i++){
		archivo[c]=todos[i].innerHTML;
		c++;
	}
	guardarCookie("datos",archivo);
}

function guardarCookie(nombre,valor) {
         document.cookie = nombre+"="+valor;
}

var misCookies = document.cookie;
var dat = misCookies.substr(6,misCookies.length).split(",");

if(dat.length>0){
	var todos = document.getElementsByTagName("td");
	for(var i = 0;i < todos.length;i++){
		$("#"+todos[i].id+"").html(dat[i]);
	}
}
	