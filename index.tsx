/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const BINGO_ITEMS: string[] = [
  'Found someone from the Platforms team',
  'Knows what "Mogen" is for (doc generation)',
  'Has used "Chaperone" to start a project',
  'Checked "Showcase" for a solution this month',
  'Found "Alexandria", our collective brain',
  'Met a "Force Multiplier" (like Ed)',
  'Spotted someone with "Infrared Solution Discovery" skills (like Paolo)',
  'Talked about AI Governance (like Vincent)',
  'Asked for help to "Untangle Git Repositories" (like Pablo)',
  'Heard someone say "reinventing the wheel"',
  'Met a Googler from Sydney or New York',
  'High-fived a Noogler',
  'Spotted a 10+ year Googler',
  'Heard an acronym you didn\'t know',
  'Someone said "Let\'s take this offline"',
  'Saw a multi-colored propeller hat',
  'Took a picture with the Burj Khalifa in view',
  'Knows the weekend in Dubai is Saturday-Sunday',
  'Tried a date (the fruit!)',
  'Rode in a Tesla taxi',
  'Spotted a supercar that wasn\'t a taxi',
  'Can name the tallest building in the world',
  'Learned an Arabic word (e.g., "Shukran")',
  'Met someone from a different gTech team',
  'Found someone wearing Google swag',
  'Overheard a discussion about "GenAI"',
  'Someone mentioned their OKRs',
  'Took a selfie with the team booth',
  'Found someone who rode a camel',
  'Someone complained about the AC being too cold',
  'Saw a presentation with a meme in it',
  'Someone asked a question you also had',
  'Found someone with the same favorite superhero',
  'Talked to one of the speakers after their session',
];

const WINNING_COMBINATIONS: number[][] = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];

let isGameOver = false;

const bingoCard = document.getElementById('bingo-card')!;
const resetButton = document.getElementById('reset-button')!;
const winnerOverlay = document.getElementById('winner-overlay')!;

const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createBoard = () => {
    isGameOver = false;
    bingoCard.innerHTML = '';
    winnerOverlay.classList.remove('show');
    winnerOverlay.setAttribute('aria-hidden', 'true');

    const shuffledItems = shuffle([...BINGO_ITEMS]);
    const boardItems = shuffledItems.slice(0, 24);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('role', 'gridcell');

        if (i === 12) {
            cell.classList.add('free-space', 'marked');
            cell.textContent = 'BINGO';
        } else {
            const itemIndex = i < 12 ? i : i - 1;
            cell.textContent = boardItems[itemIndex];
            cell.addEventListener('click', handleCellClick);
        }
        bingoCard.appendChild(cell);
    }
};

function handleCellClick(event: MouseEvent) {
    if (isGameOver) return;
    const cell = event.target as HTMLDivElement;
    cell.classList.toggle('marked');
    checkWin();
}

function checkWin() {
    const cells = bingoCard.querySelectorAll('.cell');
    for (const combination of WINNING_COMBINATIONS) {
        const isWin = combination.every(index => cells[index].classList.contains('marked'));
        if (isWin) {
            celebrateWin();
            return;
        }
    }
}

function celebrateWin() {
    isGameOver = true;
    winnerOverlay.classList.add('show');
    winnerOverlay.setAttribute('aria-hidden', 'false');
}

resetButton.addEventListener('click', createBoard);

// Initial board creation
createBoard();
