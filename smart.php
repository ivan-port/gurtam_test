<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;



require 'https://github.com/ivan-port/gurtam_test/blob/05cc911ce4b5d22f170c9e2779d7cbdf9530414d/phpmailer/src/PHPMailer.php';
require 'https://github.com/ivan-port/gurtam_test/blob/05cc911ce4b5d22f170c9e2779d7cbdf9530414d/phpmailer/src/SMTP.php';
require 'https://github.com/ivan-port/gurtam_test/blob/05cc911ce4b5d22f170c9e2779d7cbdf9530414d/phpmailer/src/Exception.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';


    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'ivan.portsiankov@gmail.com';                     //SMTP username
    $mail->Password   = 'utxfszdynuerayni';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($email , 'Pulse');         // От кого письмо 
    $mail->addAddress('ivan.portsiankov@gmail.com');     //Add a recipient
/*     $mail->addAddress('ellen@example.com');               //Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com'); */

    //Attachments
/*     $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name */

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $order ;
    $mail->Body    = '
                    Пользователь оставил данные получения демо версии <br> 
                    Имя: ' . $name . ' <br> 
                    Номер телефона: ' . $phone . '<br>
                    E-mail: ' . $email . '<br>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    /**Обработчик отправки */
    if(!$mail->send()) {/**если форма не отправилась */
        $message='Ошибка 22';
        return false;
    } else {
        $message='Данные отправлены!';
        return true;
    }
    
   $response = ['message' => $message];
     header('Content-type: application/json');
     echo json_encode($response);
    

?>