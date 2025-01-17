/**
 * @overview Functions to calculate heros' bond value of
 *           Nobunaga's ambition Online.
 *
 * @author Minoru Sekine
 * @copyright Copyrght 2023, 2024, 2025 Minoru Sekine
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Calculate bond value by specified limit break level and status.
 *
 * @param {number} level - Limit break level
 * @param {number} status - Status value
 * @return {number} Bond value by specified limit break level and status
 */
function calcBond(level: number, status: number) {
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
function calcStatus(level: number, bond: number) {
  return Math.ceil((bond * 100) / (level + 6));
}

/**
 * Update all elements on HTML by current inputs.
 */
function update() {
  const levelSelect = document.getElementById(
    'level-select',
  ) as HTMLSelectElement;
  const statusInput = document.getElementById(
    'status-input',
  ) as HTMLInputElement;
  const bondInput = document.getElementById('bond-input') as HTMLInputElement;
  if (levelSelect && statusInput && bondInput) {
    const level = parseInt(levelSelect.value, 10);
    const status = parseInt(statusInput.value, 10);
    const bond = calcBond(level, status);
    bondInput.value = bond.toString();

    const levelInputArray = [
      'level0-input',
      'level1-input',
      'level2-input',
      'level3-input',
      'level4-input',
    ];
    for (let i = 0; i < levelInputArray.length; i++) {
      const levelInput = document.getElementById(
        levelInputArray[i],
      ) as HTMLInputElement;
      if (levelInput) {
        levelInput.value = calcStatus(i, bond).toString();
      }
    }
  } else {
    alert('Expected HTML element(s) not found.');
  }
}

window.onload = () => {
  const levelSelect = document.getElementById('level-select');
  const statusInput = document.getElementById('status-input');
  if (levelSelect && statusInput) {
    levelSelect.addEventListener('change', () => {
      update();
    });
    statusInput.addEventListener('input', () => {
      update();
    });
  } else {
    alert('Expected HTML element(s) not found.');
  }

  update();
};
