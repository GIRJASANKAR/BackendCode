

// Server can talk to server

fetch("localhost:3000",{
    method:"POST"
}).then((result)=>console.log(result));


let methodObj={
    method:"GET"
}

function callbackFn(result){
  console.log(result);
}
fetch("localhost:3000/calculateSum",methodObj).then(callbackFn)