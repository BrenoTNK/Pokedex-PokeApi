function loadPokemon()
{
    let srcPk = document.getElementById("srcPoke");
    let pokemon = srcPk.value;
    pokemon = pokemon.toLowerCase();
    url = sourcePokemon(pokemon);
    is_shiny = checkedShiny();
    fetch(url)
        .then((response) => {
            // Get data (json)
            return response.json();
        })
        .then((data) => {
            // Show name and number
            document.getElementById("pokeName").textContent = data["name"];
            document.getElementById("pokeNum").textContent = `N° ${data['id']}`;
            
            // Pokemon sprit
            let img = data["sprites"][is_shiny];
            document.getElementById("pokeSprit").setAttribute("src", img);

            // Set type pokemon
            let id = "typeI";
            let numberTypes = data["types"]["length"];
            let firstType = data["types"][0]["type"]["name"];
            let firstTypeImg = `./img/${firstType}.png`;
            pokemonTypes(firstType, firstTypeImg, id);
            if (numberTypes == 1)
            {
                pokemonTypes("None", img="./img/typenull.png");
            }
            else if (numberTypes == 2)
            {
                let secondType = data["types"][1]["type"]["name"];
                let secondTypeImg = `./img/${secondType}.png`;
                pokemonTypes(secondType, secondTypeImg);     
            }

            // Info about pokemon
                // Height
            let height = data["height"];
            document.getElementById("dataHeight").textContent = `${height / 10} m`;
                // Weight
            let weight = data["weight"]
            document.getElementById("dataWeight").textContent = `${weight / 10} kg`;
                // Abilities
            let number_abilities = data["abilities"]["length"];
            for (let i = 0; i < number_abilities; i++)
            {
                let name = data["abilities"][i]["ability"]["name"];
                let is_hidden = data["abilities"][i]["is_hidden"];
                pokemonAbilities(name, is_hidden, i);
            }

            // Base status
            let total = 0;
            for (let j = 0; j < 6; j++)
            {
                let status = data["stats"][j]["base_stat"];
                baseStatus(j, status);
                total += status;
            }
            document.getElementById("totalBase").textContent = `${total}`;
        })
        .catch((error) => {
            console.log("[ERROR!] " + error);
        });
}

function sourcePokemon(pokemon)
{
    return `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
}

function checkedShiny()
{
    let checkShiny = document.getElementById("pokeShiny");
    return checkShiny.checked ? "front_shiny" : "front_default";
}

function pokemonTypes(type, img, id="typeII")
{
    document.getElementById(id).setAttribute("title", `${type}`);
    document.getElementById(id).setAttribute("src", img);
}

function pokemonAbilities(name, hidden, num)
{
    if (num == 0)
    {
        document.getElementById("dataAbilityI").textContent = `${name}`;
    }
    else if (num > 0 && !hidden)
    {
        document.getElementById("dataAbilityII").textContent = `${name}`;
    }
    if (hidden)
    {
        document.getElementById("dataHidden").textContent = `${name}`;
    }
}

function baseStatus(index, value)
{
    switch(index)
    {
        case 0:
            document.getElementById("baseHP").textContent = `${value}`;
            let cellHP = document.getElementById("cellHP");
            cellHP.style.width = `${value * 18 / 255}em`;
            cellHP.style.backgroundColor = rgbCell(value);
            break
        case 1:
            document.getElementById("baseAttack").textContent = `${value}`;
            let cellAttack = document.getElementById("cellAttack");
            cellAttack.style.width = `${value * 18 / 255}em`;
            cellAttack.style.backgroundColor = rgbCell(value);
            break
        case 2:
            document.getElementById("baseDefence").textContent = `${value}`;
            let cellDefence = document.getElementById("cellDefence");
            cellDefence.style.width = `${value * 18 / 255}em`;
            cellDefence.style.backgroundColor = rgbCell(value);
            break
        case 3:
            document.getElementById("baseSpAttack").textContent = `${value}`;
            let cellSpAttack = document.getElementById("cellSpAttack");
            cellSpAttack.style.width = `${value * 18 / 255}em`;
            cellSpAttack.style.backgroundColor = rgbCell(value);
            break
        case 4:
            document.getElementById("baseSpDefence").textContent = `${value}`;
            let cellSpDefence = document.getElementById("cellSpDefence");
            cellSpDefence.style.width = `${value * 18 / 255}em`;
            cellSpDefence.style.backgroundColor = rgbCell(value);
            break
        case 5:
            document.getElementById("baseSpeed").textContent = `${value}`;
            let cellSpeed = document.getElementById("cellSpeed");
            cellSpeed.style.width = `${value * 18 / 255}em`;
            cellSpeed.style.backgroundColor = rgbCell(value);
            break
    }
}

function rgbCell(value)
{
    let rgb;
    if (value <= 85)
    {
        rgb = `rgb(255, ${value * 3}, 0)`;
    }
    else if (value <= 170)
    {
        rgb = `rgb(${255 - ((value - 85) * 3)}, 255, 0)`;
    }
    else
    {
        rgb = `rgb(0, ${255 - (value - 170)}, ${(value - 170) * 3})`;
    }
    return rgb;
}

document.getElementById("pokeGet").addEventListener("click", loadPokemon);
