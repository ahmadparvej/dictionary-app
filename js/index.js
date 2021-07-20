let input = document.querySelector('#input');
let notFound = document.querySelector('.not-found');
let def = document.querySelector('.def');
let searchBtn = document.querySelector('#search');
let apiKey='81855746-c3fa-4ac2-9280-d8f5595e57ae';


searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    

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
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word} ?key=${apiKey}`)
    const data = await response.json();
    console.log(data);
    // if not found
    if (!data.length) {
      notFound.innerText='No result found';
      return;
    }
    // if suggested 
    if (typeof data[0] ==='string') {
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
      let definition = data[0].shortdef[0];
      def.innerText = definition;
      
      let sound = data[0].hwi.prs[0].sound.audio;
      console.log(sound)
}