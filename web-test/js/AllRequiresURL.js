function getURLTest(){
    return decrypt_string();
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
    let derived_key = pbkdf2(salt, key, 10000, 256/8);

    let cipher = window.crypto.subtle.importKey(
        "raw", derived_key, {name: "AES-CBC"}, false, ["decrypt"]);

    let decrypted = window.crypto.subtle.decrypt(
        {name: "AES-CBC", iv: iv}, cipher, ciphertext);

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

    let [plaintext, derived_key] = await aes_decrypt(salt, iv, key, ciphertext);


    let bs_string =  b64_to_utf8(new TextDecoder().decode(plaintext));
    return '"' + bs_string + '"'
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


