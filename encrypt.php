<?php

$GetUser = $_POST["user"];
$GetScore = (int)$_POST["score"];


// Create token header as a JSON string
$header = json_encode(['typ' => 'JWT', 'alg' => 'HS512']);

// Create token data as a JSON string
$data = json_encode(
[
  'aud' => "vespa", // audience, let it be vespa
  'exp' => 1619740800, // expired time as unix timestamp   -->  04/30/2021 @ 12:00am (UTC)
  'iat' => 1586865510, // issued time as unix timestamp
  'iss' => "vespa", // issuer, let it be vespa
  'jti' => "bd4b6955-892a-4e07-96bb-431be2d09aab", // token unique id, may auto generate from your lib
  'nbf' => 1586865509, // not valid before . . . , may auto generate from lib
  'sub' => $GetUser, //"6c6dff18-c1fa-4cfd-a2a1-b9b839571619", // user id
  'typ' => "score", // let defined this token as a score token
  'score' => $GetScore // as a millisec
]
);

// Encode Header to Base64Url String
$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

// Encode Data to Base64Url String
$base64UrlData= str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));

// Create Signature Hash
$signature = hash_hmac('sha512', $base64UrlHeader . "." . $base64UrlData, 'V#SPA-R@CING-V#RY-S#CR#T-K#Y', true);

// Encode Signature to Base64Url String
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

// Create JWT
$jwt = $base64UrlHeader . "." . $base64UrlData . "." . $base64UrlSignature;

echo $jwt;

?>
