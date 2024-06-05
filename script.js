
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
var sidemenu = document.getElementById("sidemenu");
var cv = document.getElementById("response1");
function opentab(tabname){
    for(tablink of tablinks){
      tablink.classList.remove("active-link")

    }
    for(tabcontent of tabcontents){
      tabcontent.classList.remove("active-tab")
      
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// side menu


function openmenu(){
  sidemenu.style.right = "0";
}

function closemenu(){
  sidemenu.style.right = "-200px";
}

// cv button


function settext(){
cv.textContent = "Currently unavailable!"
}
setTimeout(() => {
       cv.textContent= " ";
}, 3000);

/* mongodb connect */


document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = (new FormData(form));

    const urlEncodedData = new URLSearchParams(formData).toString();
    fetch("http://localhost:3019/submit-form", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlEncodedData
    })
    .then(response => {
      if(response.status==200){
        return response.text()
      }else{
        throw new Error("Invalid status code");
      }
    })
    .then(data => {
      document.getElementById('response').textContent = 'Form submitted successfully.';
      setTimeout(()=>{
        document.getElementById('response').textContent = "";
        form.reset();
      },3000);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      document.getElementById('response').textContent = 'An error occurred.';
    });
  });
})
