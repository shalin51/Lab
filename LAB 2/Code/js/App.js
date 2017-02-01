$(document).ready(function () {  
    $("#btnLogin").on("click", function () {
        var username = $("#txtUser").val();
        var password = $("#txtPass").val();
        if (username === "") {
            alert("enter usrname");
        }
        if (password==="") {
            alert("enter password");
        }
        if (username === $.cookie("username") && password==$.cookie("pass")) {
            window.open("Home.html");
        } 
    });
    $("#btnRegister").on("click", function () {
        var username = $("#txtUser").val();
        var password = $("#txtPass").val();
        var confirPassword = $("#txtConfirm").val();
        if (username === "") {
            alert("enter usrname");
        }
        if (password === "") {
            alert("enter password");
        }
        if (password === confirPassword) {
            $.cookie("username", username);
            $.cookie("pass", password);
            window.open("Index.html");
        }
        else {
            alert("Password and Confirm password must be same");
        }
    }); 
});



