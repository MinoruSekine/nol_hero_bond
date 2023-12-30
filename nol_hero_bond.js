/**
 * Calculate bond value by specified limit break level and status.
 *
 * @param {number} level - Limit break level
 * @param {number} status - Status value
 * @return {number} Bond value by specified limit break level and status
 */
function calcBond(level, status) {
  return Math.floor(((level + 6) * status) / 100);
}

/**
 * Calculate necessary status to get specified bond value
 *
 * with specified limit break level.
 * This is inverted calculation of calcBond().
 * @param {number} level - Limit break level
 * @param {number} bond - Bond value
 * @return {number} Necessary status to get specified bond with specified level
 */
function calcStatus(level, bond) {
  return Math.ceil((bond * 100) / (level + 6));
}

/**
 * Update all elements on HTML by current inputs.
 */
function update() {
  let level = parseInt(document.getElementById('level-input').value, 10);
  let status = parseInt(document.getElementById('status-input').value, 10);
  let bondInput = document.getElementById('bond-input');
  const bond = calcBond(level, status);
  bondInput.value = bond;

  let levelInputArray = ['level0-input',
                         'level1-input',
                         'level2-input',
                         'level3-input',
                         'level4-input'];
  for (var i = 0; i < levelInputArray.length; i++) {
    let levelInput = document.getElementById(levelInputArray[i]);
    levelInput.value = calcStatus(i, bond);
  }
}

window.onload = () => {
  let levelInput = document.getElementById('level-input');
  levelInput.addEventListener('input', () => {
    update();
  });

  let statusInput = document.getElementById('status-input');
  statusInput.addEventListener('input', () => {
    update();
  });

  update();
};
