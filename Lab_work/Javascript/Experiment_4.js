function sumbitButtonClick(){

    //get values using DOM
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    //Clear old message
    document.getElementById('nameError').innerHTML = "";
    document.getElementById('emailError').innerHTML = "";
    document.getElementById('passwordError').innerHTML = "";

    let isValid = true;

    //validation
    if(name == ""){
        document.getElementById('nameError').innerHTML = "Name field is required";
        isValid = false;
    }
    
    if(email == ""){
        document.getElementById('emailError').innerHTML = "email field is required";
        isValid = false;
    }
    
    if(password == ""){
        document.getElementById('passwordError').innerHTML = "password field is required";
        isValid = false;
    }
    else if(password.length <= 6){
        document.getElementById('passwordError').innerHTML = "at least 8 characters required";
        isValid = false;
    }

    if(isValid){
        alert("Form submitted successfully");
        return true;
    }
    else{
        return false;
    }
}