// Defining our token parts
var header = {
  "alg": "HS512",
  "typ": "JWT"
};
var gamescore = "";
var userid = "";

function GetScore(score, user){
  gamescore = score;
  userid = user;
};

var data = {
  "aud": "vespa", // audience, let it be vespa
  "exp": 1586951910, // expired time as unix timestamp
  "iat": 1586865510, // issued time as unix timestamp
  "iss": "vespa", // issuer, let it be vespa
  "jti": "bd4b6955-892a-4e07-96bb-431be2d09aab", // token unique id, may auto generate from your lib
  "nbf": 1586865509, // not valid before . . . , may auto generate from lib
  "sub": userid, //"6c6dff18-c1fa-4cfd-a2a1-b9b839571619", // user id
  "typ": "score", // let defined this token as a score token
  "score": gamescore // as a millisec (String format MM:SS:MS)
};

var secret = "V#SPA-R@CING-V#RY-S#CR#T-K#Y";


function base64url(source) {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);
  
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');
  
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');
  
  return encodedSource;
}

var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);
document.getElementById("header").innerText = encodedHeader;

var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
var encodedData = base64url(stringifiedData);
document.getElementById("payload").innerText = encodedData;

var signature = encodedHeader + "." + encodedData;
signature = CryptoJS.HmacSHA256(signature, secret);
signature = base64url(signature);

document.getElementById("signature").innerText = signature;



function SetEncode(){
	var JWT_Enc = encodedHeader + "." + encodedData + "." + signature;
	return JWT_Enc;
}



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};