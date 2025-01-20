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
 * Interface to observe NolHeroBondModel.
 */
interface NolHeroBondModelObserverInterface {
  onUpdateBond(bond: number): void;
  onUpdateSameStatusForLevel(level: number, status: number): void;
}

/**
 * Model of Nol Hero Bond Calculator.
 */
class NolHeroBondModel {
  private level = 0;
  private status = 1000;
  private observers: NolHeroBondModelObserverInterface[] = [];

  /**
   * Initialize instance.
   */
  public initialize() {
    this.setLevel(0);
    this.setStatus(1000);
  }

  /**
   * Register observer for this instance.
   */
  public registerObserver(observer: NolHeroBondModelObserverInterface) {
    this.observers.push(observer);
  }

  /**
   * Set level of limit break.
   */
  public setLevel(level: number) {
    this.level = level;
    this.update();
  }

  /**
   * Set status.
   */
  public setStatus(status: number) {
    this.status = status;
    this.update();
  }

  private update() {
    for (const observer of this.observers) {
      const bond = calcBond(this.level, this.status);
      observer.onUpdateBond(bond);
      for (let level = 0; level <= 4; level++) {
        observer.onUpdateSameStatusForLevel(level, calcStatus(level, bond));
      }
    }
  }
}

class NolHeroBondController {
  private levelSelect = document.getElementById(
    'level-select',
  ) as HTMLSelectElement;
  private statusInput = document.getElementById(
    'status-input',
  ) as HTMLInputElement;
  private model: NolHeroBondModel;

  public constructor(model: NolHeroBondModel) {
    this.model = model;
  }

  public initialize() {
    this.levelSelect = document.getElementById(
      'level-select',
    ) as HTMLSelectElement;
    if (this.levelSelect) {
      this.levelSelect.addEventListener('change', () => {
        this.model.setLevel(parseInt(this.levelSelect.value, 10));
      });
    }
    this.statusInput = document.getElementById(
      'status-input',
    ) as HTMLInputElement;
    if (this.statusInput) {
      this.statusInput.addEventListener('input', () => {
        this.model.setStatus(parseInt(this.statusInput.value, 10));
      });
    }
  }
}

class NolHeroBondView implements NolHeroBondModelObserverInterface {
  public initialize(model: NolHeroBondModel) {
    model.registerObserver(this);
  }

  public onUpdateBond(bond: number): void {
    const bondInput = document.getElementById('bond-input') as HTMLInputElement;
    if (bondInput) {
      bondInput.value = bond.toString();
    }
  }
  public onUpdateSameStatusForLevel(level: number, status: number): void {
    const statusForLevelInputName: [string, string, string, string, string] = [
      'level0-input',
      'level1-input',
      'level2-input',
      'level3-input',
      'level4-input',
    ];
    const statusForLevelInput = document.getElementById(
      statusForLevelInputName[level],
    ) as HTMLInputElement;
    if (statusForLevelInput) {
      statusForLevelInput.value = status.toString();
    }
  }
}

const gModel = new NolHeroBondModel();
const gController = new NolHeroBondController(gModel);
const gView = new NolHeroBondView();

window.onload = () => {
  gView.initialize(gModel);
  gController.initialize();
  gModel.initialize();
};
