let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
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
function name(params) {
    
}