
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then((states) => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    console.log(event.target.value)

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then(res => res.json())
    .then((cities) =>{
        console.log(cities);
        for(citie of cities){
            citySelect.innerHTML += `<option value="${citie.id}">${citie.nome}</option>`;
        }

        citySelect.disabled = false;
    });

}


populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)