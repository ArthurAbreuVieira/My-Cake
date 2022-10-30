const cepInput = document.getElementById('CEP');
const addressInput = document.getElementById('address');
const cepMessageElement = document.querySelector('[data-js=cep-message]');

async function getAddress(cep) {
  const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const json = await data.json();

  if(json.erro) return false;
  
  return json;
}

cepInput.addEventListener("input", async e => {
  if(e.target.value.length >= 8) {
    const address = await getAddress(e.target.value);

    if(!address) cepMessageElement.innerText = "- Endereço não encontrado";
    else {
      cepMessageElement.innerText = "";
      addressInput.value = `${address.logradouro}, ${address.bairro} - ${address.localidade} - ${address.cep}`
    }
  }
});