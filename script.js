const loadLessson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

//mange-spinner

const managespinner =(status)=>{
   if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
     document.getElementById("word-container-section").classList.add("hidden");
    }
    else{
      document.getElementById("spinner").classList.add("hidden");
     document.getElementById("word-container-section").classList.remove("hidden");
    }
}

//speak-word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}




// loadworddetail

const worddetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res=await fetch(url);
  const details=await res.json();
  displayworddetails(details.data)
};

const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return(htmlElements.join(" "));
};

const displayworddetails = (word)=>{
    const modaldata=document.getElementById("modal-container");
    modaldata.innerHTML=`<div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    `;
    document.getElementById('my_modal_5').showModal();

}



const wordload = (no) => {
  managespinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${no}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allbuttonclass = document.getElementsByClassName("btn-class");
      for (const it of allbuttonclass) {
        it.classList.remove("btn-design");
      }

      const allbutton = document.getElementById(`btn-id-${no}`);
      allbutton.classList.add("btn-design");
      loadwordData(data.data);
    });
};

const loadwordData = (data) => {
   managespinner(true);
  const wordContainer = document.getElementById("word-container-section");
  wordContainer.innerHTML = "";

  if (data.length == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full text-center p-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h1 class="opacity-80 text-1xl font-bangla mb-4">এই Lesson এ এখনও শব্দ যুক্ত করা হয়নি  </h1>
            <h1 class="text-3xl font-bangla font-bold">অন্য একটি Lesson Select করুন।</h1>
        </div>
    `;
     managespinner(false);
     return;
  }

  for (const dt of data) {
    const newword = document.createElement("div");
    newword.innerHTML = `
    <div class="text-center bg-white p-10 h-full shadow-indigo-100 rounded-md">
        <h1 class="text-2xl font-bold m-3">${dt.word ? dt.word : "🚫"}</h1>
        <h4 class="font-semibold font-bangla m-3">Meaning /Pronounciation</h4>
        <h1 class="text-1xl m-3">"${dt.meaning ? dt.meaning : "🚫"}/ ${
      dt.pronunciation ? dt.pronunciation : "🚫"
    }"</h1>

        <div class="flex justify-between items-center mt-10">
            <button onclick="worddetails(${
              dt.id
            })" class="btn bg-[#e8f4ff] h-[56px] w-[56px] rounded-md flex justify-center items-center"><i class="fa-solid fa-circle-info"></i></button>
           <button onclick="pronounceWord('${dt.word}')" class="btn bg-[#e8f4ff] h-[56px] w-[56px] rounded-md flex justify-center  items-center"> <i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.appendChild(newword);
     managespinner(false);
  }
};

const displayData = (data) => {
  const container = document.getElementById("lavel-container");

  for (const dta of data) {
    const adddata = document.createElement("div");
    adddata.innerHTML = `
         <button id="btn-id-${dta.level_no}" onclick="wordload(${dta.level_no})" class="btn-class btn btn-outline btn-primary">
         <i class="fa-brands fa-leanpub"></i>Lesson - ${dta.level_no}
         </button>
              
    `;
    container.appendChild(adddata);
  }
};

loadLessson();
