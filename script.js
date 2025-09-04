const loadLessson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

const wordload = (no) => {
  const url = `https://openapi.programming-hero.com/api/level/${no}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadwordData(data.data));
};

const loadwordData = (data) => {
   const wordContainer=document.getElementById('word-container-section');
   wordContainer.innerHTML='';
    
   if(data.length==0){
    wordContainer.innerHTML=`
    <div class="col-span-full text-center p-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h1 class="opacity-80 text-1xl font-bangla mb-4">এই Lesson এ এখনও শব্দ যুক্ত করা হয়নি  </h1>
            <h1 class="text-3xl font-bangla font-bold">অন্য একটি Lesson Select করুন।</h1>
        </div>
    `;
   }

   for(const dt of data){
    const newword=document.createElement('div');
    newword.innerHTML=`
    <div class="text-center bg-white p-10 h-full shadow-indigo-100 rounded-md">
        <h1 class="text-2xl font-bold m-3">${dt.word?dt.word:"🚫"}</h1>
        <h4 class="font-semibold font-bangla m-3">Meaning /Pronounciation</h4>
        <h1 class="text-1xl m-3">"${dt.meaning?dt.meaning:"🚫"
        }/ ${dt.pronunciation?dt.pronunciation:"🚫"}"</h1>

        <div class="flex justify-between items-center mt-10">
            <button class="btn bg-[#e8f4ff] h-[56px] w-[56px] rounded-md flex justify-center items-center"><i class="fa-solid fa-circle-info"></i></button>
           <button class="btn bg-[#e8f4ff] h-[56px] w-[56px] rounded-md flex justify-center  items-center"> <i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.appendChild(newword);
   }
};

const displayData = (data) => {
  const container = document.getElementById("lavel-container");

  for (const dta of data) {
    const adddata = document.createElement("div");
    adddata.innerHTML = `
         <button onclick="wordload(${dta.level_no})" class="btn btn-outline btn-primary">
         <i class="fa-brands fa-leanpub"></i>Lesson - ${dta.level_no}
         </button>
              
    `;
    container.appendChild(adddata);
  }
};

loadLessson();
