function login(){
  const username = document.getElementById("usrname").value;
  const password = document.getElementById("psswd").value;

  const httpRequest = new XMLHttpRequest();

  httpRequest.onreadystateChange = writeContent;
  httpRequest.open("POST", "https://api-banter-backend.onrender.com/api/auth/login"
}