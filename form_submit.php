<?php

// Declare all empty varibles
$name = $email = $phone = $message = $success = '';
$nameErr = $emailErr = $messageErr = "";
$errCount = array();

//helper functions
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
    }

// testing each required input fields
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    if (empty($_POST["name"])) {
        $nameErr = "Name is required";
        array_push($errCount, $nameErr);
    } else {
    $name = test_input($_POST["name"]);
        //check if name only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
        $nameErr = "Only letters and white space allowed"; 
        array_push($errCount, $nameErr);
        }
    }

    if (empty($_POST["email"])) {
    $emailErr = "Email is required";
    array_push($errCount, $emailErr);
    } else {
    $email = test_input($_POST["email"]);
        // check if e-mail address is well-formed
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format"; 
            array_push($errCount, $emailErr);
        }
    }

    if (empty($_POST["message"])) {
    $messageErr = "Message is required";
    array_push($errCount, $messageErr);
    } else {
    $message = test_input($_POST["message"]);
    }


    //if there are no errors with the input fiels
    if (empty($errCount)) {
        //set strings for mail
        $to = 'bradleymurchison@gmail.com';
        $subject = 'Portfolio contact form';
        $msg_body ='';
        foreach ($_POST as $key => $value) {
            $msg_body = "$key: $value\n";
        }
        //send the email and display success message
        if (mail($to, $subject, $msg_body)) {
            $success = 'Message succesfully sent';
            // reset the $_POST global variable
            unset($_POST);
            // empty all variables
            $name = $email = $phone = $message = $success = '';
            $nameErr = $emailErr = $messageErr = "";
            $errCount = array();
        }
    }
}
?>