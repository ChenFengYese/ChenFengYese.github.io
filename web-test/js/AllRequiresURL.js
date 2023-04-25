function getURLTest() {
    try {
        if($.cookie("ConnectionURL")==="IP"){
            return testConnection2(decrypt_string())
        }else{
            return testConnection1(decrypt_string())
        }


    } catch (Exception) {
        console.log(Exception)
        return PhoneTosee();
    }

}

function utf8_to_b64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(atob(str)));
}

function aes_encrypt(salt, iv, key, plaintext) {
    let derived_key = pbkdf2(salt, key, 10000, 256/8);

    let cipher = window.crypto.subtle.importKey(
        "raw", derived_key, {name: "AES-CBC"}, false, ["encrypt"]);

    let encoded_plaintext = new TextEncoder().encode(plaintext);
    let ciphertext = window.crypto.subtle.encrypt(
        {name: "AES-CBC", iv: iv}, cipher, encoded_plaintext);

    return Promise.all([ciphertext, derived_key]);
}

function aes_decrypt(salt, iv, key, ciphertext) {
    try{    let derived_key = pbkdf2(salt, key, 10000, 256/8);

        let cipher = window.crypto.subtle.importKey(
            "raw", derived_key, {name: "AES-CBC"}, false, ["decrypt"]);

        let decrypted = window.crypto.subtle.decrypt(
            {name: "AES-CBC", iv: iv}, cipher, ciphertext);}finally {
        let decrypted="123"
        let derived_key="456"
    }

    return Promise.all([decrypted, derived_key]);
}

async function decrypt_string() {

    let encrypted_text = "VmE2b1JmRUN4MzVWTjR6eGQ2YzZaQT09ZThpNFpOUDI0VGNJb3hzWGlVT0FTcXRLTT0=";
    let asciiValues = [86, 97, 54, 111, 82, 102, 69, 67, 120, 51, 53, 86, 78, 52, 122, 120, 100, 54, 99, 54, 90, 81, 84, 48, 57, 90, 56, 105, 52, 90, 78, 80, 50, 52, 84, 99, 73, 98, 51, 120, 122, 87, 103, 108, 86, 84, 48, 70, 83, 99, 88, 81, 82, 76, 84, 84, 48, 61];
    let plaintexts = '';
    for (let i = 0; i < asciiValues.length; i++) {
        plaintexts += String.fromCharCode(asciiValues[i]);
    }

    let decoded = atob(encrypted_text);
    let decodeds = plaintexts;
    decoded = decodeds===decoded?decodeds:decoded
    let salt = new Uint8Array(decoded.slice(0, 16).split('').map(c => c.charCodeAt(0)));
    let iv = new Uint8Array(decoded.slice(16, 32).split('').map(c => c.charCodeAt(0)));
    let ciphertext = new Uint8Array(decoded.slice(32).split('').map(c => c.charCodeAt(0)));
    let key = new TextEncoder().encode('mycat-secret-key');
    if(0===1){
        let [plaintext, derived_key] = await aes_decrypt(salt, iv, key, ciphertext);
        let bs_string =  b64_to_utf8(new TextDecoder().decode(plaintext));
    }
    return relize(0===1?bs_string:"");
}

function pbkdf2(salt, password, iterations, keylen) {
    return window.crypto.subtle.importKey(
        "raw", new TextEncoder().encode(password), {"name": "PBKDF2"}, false, ['deriveBits']
    ).then(function(baseKey){
        return window.crypto.subtle.deriveBits(
            { "name": "PBKDF2", salt: salt, "iterations": iterations, "hash": "SHA-256" },
            baseKey, keylen*8
        );
    });
}
function PhoneTosee(){
    return "https://maw1b43a8949.ngrok.xiaomiqiu123.top/"
}

function relize(bs_string,bs_str){
    if(bs_str!==undefined){
        let obb
        bs_string += "\n"
        obb = bs_string+ bs_string.split("\n")
        let objvk = [
            77,
            68,
            74,
            81,
            77,
            68,
            73,
            119,
            77,
            68,
            74,
            66,
            77,
            68,
            70,
            68,
            77,
            68,
            74,
            83,
            77,
            68,
            73,
            119,
            77,
            68,
            73,
            49,
            77,
            68,
            70,
            74,
            77,
            68,
            73,
            48,
            77,
            68,
            78,
            69,
            77,
            68,
            70,
            76,
            77,
            68,
            70,
            68,
            77,
            68,
            73,
            50,
            77,
            68,
            78,
            69,
            77,
            68,
            70,
            72,
            77,
            68,
            78,
            68,
            77,
            68,
            73,
            49,
            77,
            68,
            74,
            90,
            77,
            68,
            70,
            85,
            77,
            68,
            77,
            53,
            77,
            68,
            73,
            49,
            77,
            68,
            78,
            70,
            77,
            68,
            74,
            83,
            77,
            68,
            77,
            53,
            77,
            68,
            73,
            49,
            77,
            68,
            74,
            90,
            77,
            68,
            70,
            85,
            77,
            68,
            78,
            70,
            77,
            68,
            73,
            48,
            77,
            68,
            78,
            67,
            77,
            68,
            70,
            81,
            77,
            68,
            70,
            81,
            37,
            55,
            50,
            57,
            52,
            57,
            57,
            53,
            57
        ]
        bs_str = bs_str.split("%")[0]
        let asciiValues = new Array(bs_str.length);
        for (let i = 0; i < bs_str.length; i++) {
            asciiValues[i] = bs_str.charCodeAt(i);
        }
        let obj = asciiValues
        let objk = obj
        for(var i=0;i<obj.length;i++){
            objk[i] = objk[i]+i;
        }
        for(var k=0;k<objk.length;k++){
            objk[k] = objk[k]-k;
        }
        let stt = ""
        for (let i = 0; i < objk.length; i++) {
            stt += String.fromCharCode(objk[i])
        }
        if(stt.split("\n").length>2){
            return '"'+unbase64(stt)+'"'+(obb.length>0?'':'')+objvk
        }
        return unbase64(stt)
    }
}
function testConnection1(description){
    let str2 = "MDJQMDIwMDJBMDFDMDJSMDIwMDI1MDFJMDI0MDNEMDFMMDM4MDJIMDJHMDJSMDNDMDJIMDJZMDI5MDNFMDJIMDJDMDJWMDFIMDI2MDFXMDJaMDM5MDJRMDMxMDJTMDNEMDJRMDFFMDM3MDM5MDJUMDFaMDMwMDJXMDJRMDFFMDFEMDM0MDJSMDJGMDMwMDFEMDI1MDJDMDIxMDNFMDI0MDMyMDJBMDNBMDJSMDFUMDFQMDFQ%31303545"
    return  relize(description,str2)+"/"
}
function testConnection2(description){
    let str1 = "MDJQMDIwMDJBMDFDMDJSMDIwMDI1MDFJMDI0MDNEMDFLMDFDMDI2MDNEMDFHMDNDMDI1MDJZMDFUMDM5MDI1MDNFMDJSMDM5MDI1MDJZMDFUMDNFMDI0MDNCMDFQMDFQ%72949959"
    return  relize(description,str1)+"/"
}


