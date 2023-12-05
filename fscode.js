const fs=require('fs');  // in built packages

fs.writeFile('myfile.txt','SAY MY NAME' , (e)=>{
  if(e){
    console.log('Cannot able to write');
    return;
  }
})

fs.readFile('myfile.txt','utf8',(e,d)=>{
   if(e) return;
   console.log(d);
})

fs.appendFile('myfile.txt','\nGirja',(e)=>{
  if (e) return;
  console.log("Appended");
})

fs.unlink('myfile.txt',(e)=>{
  if (e) return;
  console.log("deleted");
})