
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
    citySelect.innerHTML = "<option value='' disabled selected>Selecione a cidade </option>";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then((cities) =>{
        console.log(cities);
        for(citie of cities){
            citySelect.innerHTML += `<option value="${citie.nome}">${citie.nome}</option>`;
        }

        citySelect.disabled = false;
    });

}


populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta.



const itemsToCollect = document.querySelectorAll(".items-grid li");

for(let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    //const alreadySelected = selectedItems.findIndex(item => item == itemId);
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId
        return itemFound;
    });
    

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;

}