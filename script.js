//reader
const reader=document.querySelector(".reader"),
form=reader.querySelector("form"),
fileInput=form.querySelector("input"),
infoText=form.querySelector("p"),
copyBtn=reader.querySelector(".copy"),
closeBtn=reader.querySelector(".close");
//generator
const generatorW=document.querySelector(".generator"),
qrInput=generatorW.querySelector(".form-generator input"),
generateBtn=generatorW.querySelector(".form-generator button"),
qrImg=generatorW.querySelector(".qr-code img");




function fetchRequest(formData,file){
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST", body:formData
    }).then(responsive=>responsive.json()).then(result=>{
        result=result[0].symbol[0].data;
        infoText.innerText=result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        reader.querySelector("textarea").innerText=result;
        form.querySelector("img").src=URL.createObjectURL(file);
        reader.classList.add("active");
       
    }).catch(()=>{
        infoText.innerText="Couldn't Scan QR Code";
    })
}




fileInput.addEventListener("change",e => {
    let file=e.target.files[0]; //kullanıcı sectiği dosyayı alır
    if(!file) return  // Dosya seçilmediyse fonksiyonu sonlandır
    let formData=new FormData(); //yeni bir FormData object oluşturur
    formData.append("file",file); //seçilen dosyayi formdata ekler
    fetchRequest(formData,file);   
});

copyBtn.addEventListener("click",()=>{
    let text=reader.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", ()=>fileInput.click());
closeBtn.addEventListener("click", () => reader.classList.remove("active"));


//Generator==================================================================
generateBtn.addEventListener("click", () => {
   let qrValue=qrInput.value;
   if(!qrValue) return;
   generateBtn.innerText="Generating QR Code...";
   qrImg.src=` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
   qrImg.addEventListener("load", ()=> {
      generatorW.classList.add("active");
      generateBtn.innerText="Generate QR code";
   });
   
});

qrInput.addEventListener("keyup",()=>{
    if(!qrInput.value){
        generatorW.classList.remove("active");
    }
})