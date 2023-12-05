

// Server can talk to server

fetch("localhost:3000",{
    method:"POST"
}).then((result)=>console.log(result));


let methodObj={
    method:"GET"
}

function callbackFn(result){
   result.json()     //. to extract the body you need to call result.json()
}
fetch("localhost:3000/calculateSum",methodObj).then(callbackFn)