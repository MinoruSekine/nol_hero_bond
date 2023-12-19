function CalcBond(level, status){
    return Math.floor(((level + 6) * status) / 100);
}

function CalcStatus(level, bond){
    return Math.ceil((bond * 100) / (level + 6));
}

function Update() {
    let level = parseInt(document.getElementById('level-input').value, 10);
    let status = parseInt(document.getElementById('status-input').value, 10);
    let bond_input = document.getElementById('bond-input');
    const bond = CalcBond(level, status);
    bond_input.value = bond;

    let level_input_array = ['level0-input', 'level1-input', 'level2-input', 'level3-input', 'level4-input']
    for (var i = 0; i < level_input_array.length; i++) {
	let leveli_input = document.getElementById(level_input_array[i]);
	leveli_input.value = CalcStatus(i, bond);
    }
}

window.onload = () => {
    let level_input = document.getElementById('level-input');
    level_input.addEventListener('input', () => {
	Update();
    });

    let status_input = document.getElementById('status-input');
    status_input.addEventListener('input', () => {
	Update();
    });

    Update();
}
