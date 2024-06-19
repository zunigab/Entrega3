var g_id_usuario ="";

//Agregar datos
function agregarUsuario() {
//Variables con datos de formulario
var txt_id_usuario  = document.getElementById("txt_id_usuario").value;
var txt_dv          = document.getElementById("txt_dv").value;
var txt_nombres     = document.getElementById("txt_nombres").value;
var txt_apellidos   = document.getElementById("txt_apellidos").value;
var txt_email       = document.getElementById("txt_email").value;
var txt_celular     = document.getElementById("txt_celular").value;
var txt_username    = document.getElementById("txt_username").value;
var txt_password    = document.getElementById("txt_password").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

const raw = JSON.stringify({
  "id_usuario": txt_id_usuario,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "username": txt_username,
  "password": txt_password,
  "fecha_registro": fechaHoraActual 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
    else{
      location.href="../error/mensaje.html"
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

//Listar Datos
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML  +=
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

//Actualizar datos
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);
}

function obtenerDatosActualizar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFormulario(element,index,arr) {
  var id_usuario = element.id_usuario;
  var dv = element.dv;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  var username = element.username;
  var password = element.password;
  
  document.getElementById("txt_id_usuario").value = id_usuario;
  document.getElementById("txt_dv").value = dv;
  document.getElementById("txt_nombres").value = nombres;
  document.getElementById("txt_apellidos").value = apellidos;
  document.getElementById("txt_email").value = email;
  document.getElementById("txt_celular").value = celular;
  document.getElementById("txt_username").value = username;
  document.getElementById("txt_password").value = password;
}

function actualizarUsuario(){
  var txt_id_usuario  = document.getElementById("txt_id_usuario").value;
  var txt_dv          = document.getElementById("txt_dv").value;
  var txt_nombres     = document.getElementById("txt_nombres").value;
  var txt_apellidos   = document.getElementById("txt_apellidos").value;
  var txt_email       = document.getElementById("txt_email").value;
  var txt_celular     = document.getElementById("txt_celular").value;
  var txt_username    = document.getElementById("txt_username").value;
  var txt_password    = document.getElementById("txt_password").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_usuario": txt_id_usuario,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "username": txt_username,
  "password": txt_password,
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
    else{
      location.href="../error/mensaje.html"
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}

//Eliminar Datos
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}

function obtenerDatosEliminar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element,index,arr) {
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar este usuario? <b>"+ nombres +" "+ apellidos+"</b>";
}

function eliminarUsuario(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href="listar.html";
      }
      else{
        location.href="../error/mensaje.html"
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }

//Obtener fecha con formato deseado
function obtenerFechaHora(){
  var fechaActual = new Date();
  var fechaFormateada = fechaActual.toLocaleString('es-ES',{
    hour12:false, 
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
return fechaFormateada;
} 