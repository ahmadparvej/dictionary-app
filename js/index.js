let input = document.querySelector('#input');
let notFound = document.querySelector('.not-found');
let def = document.querySelector('.def');

let audioBox = document.querySelector('.audio');
let searchBtn = document.querySelector('#search');
let loading = document.querySelector('.loading');

let apiKey='81855746-c3fa-4ac2-9280-d8f5595e57ae';


searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
    // clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    def.innerText = '';

    // get input data
    let word = input.value;

    // call api get data
    if (word==='') {
        alert('word is required')
        return;
    }
    getData(word);

})
async function getData(word) {
    loading.style.display = 'block'

  // Ajax call
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
    const data = await response.json();
    console.log(data);
    // if not found
    if (!data.length) {
      loading.style.display = 'none'

      notFound.innerText='No result found';
      return;
    }
    // if suggested 
    if (typeof data[0] ==='string') {

      loading.style.display = 'none'
      let heading = document.createElement('h3');
      heading.innerHTML='Did you mean?'
      notFound.appendChild(heading);
      
      
      data.forEach(element=>{
        let suggetion = document.createElement('span');
        suggetion.classList.add('suggested');
        suggetion.innerText=element;
        notFound.appendChild(suggetion)
      })
    } 
      //if found
      loading.style.display = 'none'
      let definition = data[0].shortdef[0];
      def.innerText = definition;
      
      let soundName = data[0].hwi.prs[0].sound.audio;
      
      if (soundName) {
        renderSound(soundName)
      }
      // console.log(soundName)
    }

    function renderSound(soundName) {
        let subfolder = soundName.charAt(0);
        // console.log(subfolder);
        let soundSrc = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subfolder}/${soundName}.mp3?${apiKey}`;     
        // console.log(soundSrc);

        let aud = document.createElement('audio');
        aud.src = soundSrc;
        aud.controls = true; 
        audioBox.appendChild(aud);   
    }
