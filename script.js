const loadLessson=()=>{fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res=>res.json())
.then(json=>displayData(json.data))
};


const displayData=(data)=>{
   const container=document.getElementById('lavel-container');

   for(const dta of data){
    const adddata=document.createElement("div");
    adddata.innerHTML=`
         <button class="btn btn-outline btn-primary">
         <i class="fa-brands fa-leanpub"></i>Lesson - ${dta.level_no}
         </button>
              
    `
    container.appendChild(adddata)
   }
};

loadLessson();