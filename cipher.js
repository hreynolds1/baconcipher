chars=["A","B","C","D","E",'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','.',' ']

Number.prototype.toBinary=function(toplaces=0){
    strlist=(this>>>0).toString(2).split("")
    while (strlist.length<toplaces){
        strlist.unshift("0")
    }
    return strlist.join("")
}
String.prototype.splitInto=function(size){
    return this.match(new RegExp('.{1,' + size + '}', 'g'));
    //I have absolutely no idea how this works but ye
}

function encipher(msg,mask=0){
    splitmsg=msg.split("")
    for (x in splitmsg){
        if (!(chars.includes(splitmsg[x].toUpperCase()))){
            msg=msg.replace(splitmsg[x],"")
        }
    }
    binary=""
    splitmsg=msg.split("")
    for (x in splitmsg){
        binary+=chars.indexOf(splitmsg[x].toUpperCase()).toBinary(5)
    }
    if (mask!=0){
        background=mask.toLowerCase().substring(0,msg.length*5+1)
    } else {
        background="aaaaa".repeat(splitmsg.length)
    }
    backsplit=background.split("")
    binarysplit=binary.split("")
    for (x in backsplit){
        if (binarysplit[x]=="1"){
            backsplit.splice(x,1,backsplit[x].toUpperCase())
        }
    }
    return backsplit.join("")
}

function decipher(enc){
    if (enc.length/5!=parseInt(enc.length/5)){
        throw "length not divisible by 5"
    }
    binary=""
    dec=""
    encsplit=enc.split("")
    for (x in encsplit){
        binary+=((encsplit[x]==encsplit[x].toUpperCase())*1)
    }
    binary=binary.splitInto(5)
    for (x in binary){
        dec+=chars[parseInt(binary[x],2)]
    }
    return dec
}

function encodemode(){
    document.getElementById("encode").hidden=false
    document.getElementById("pickmode").hidden=true
}
function decodemode(){
    document.getElementById("decode").hidden=false
    document.getElementById("pickmode").hidden=true
}
function encodemessage(){
    document.getElementById("output").innerHTML=encipher(document.getElementById("encodestr").value,document.getElementById("mask").value)
}

function decodemessage(){
    document.getElementById("output").innerHTML=decipher(document.getElementById("decodestr").value)
}