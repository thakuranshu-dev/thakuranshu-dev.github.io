// Blocks Background Interactive Effect

let blocks = [];
const BLOCK_SIZE = 55;
const BLOCK_GAP = 5;

function generateBlocks() {
  const container = document.getElementById('blocks-background');
  const homeSection = document.getElementById('home');
  
  if (!container || !homeSection) return;

  const rect = homeSection.getBoundingClientRect();
  const containerWidth = homeSection.clientWidth;
  const containerHeight = homeSection.clientHeight;

  // Calculate grid dimensions
  const cols = Math.ceil(containerWidth / (BLOCK_SIZE + BLOCK_GAP)) + 2;
  const rows = Math.ceil(containerHeight / (BLOCK_SIZE + BLOCK_GAP)) + 2;

  // Clear previous blocks
  container.innerHTML = '';
  blocks = [];

  // Create block grid
  for (let row = -1; row < rows - 1; row++) {
    for (let col = -1; col < cols - 1; col++) {
      const block = document.createElement('div');
      block.className = 'block';
      block.dataset.row = row;
      block.dataset.col = col;

      const x = col * (BLOCK_SIZE + BLOCK_GAP);
      const y = row * (BLOCK_SIZE + BLOCK_GAP);

      block.style.left = x + 'px';
      block.style.top = y + 'px';

      block.addEventListener('mouseenter', () => handleBlockHover(block, col, row, container));

      container.appendChild(block);
      blocks.push({ element: block, col, row });
    }
  }
}

function handleBlockHover(hoveredBlock, col, row, container) {
  const blockMap = new Map();
  
  // Create a map for quick lookup
  blocks.forEach(b => {
    blockMap.set(`${b.col},${b.row}`, b.element);
  });

  // Get surrounding blocks (max 1 from each side)
  const positions = [
    { col, row }, // center
    { col: col - 1, row }, // left
    { col: col + 1, row }, // right
    { col, row: row - 1 }, // top
    { col, row: row + 1 }, // bottom
    { col: col - 1, row: row - 1 }, // top-left
    { col: col + 1, row: row - 1 }, // top-right
    { col: col - 1, row: row + 1 }, // bottom-left
    { col: col + 1, row: row + 1 }, // bottom-right
  ];

  positions.forEach(pos => {
    const key = `${pos.col},${pos.row}`;
    const blockElement = blockMap.get(key);
    
    if (blockElement && !blockElement.classList.contains('popped')) {
      // Calculate translation for pop effect
      const centerX = col * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;
      const centerY = row * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;

      const blockX = pos.col * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;
      const blockY = pos.row * (BLOCK_SIZE + BLOCK_GAP) + BLOCK_SIZE / 2;

      const dx = blockX - centerX;
      const dy = blockY - centerY;

      // Pop outward
      const distance = Math.sqrt(dx * dx + dy * dy);
      const tx = (dx / distance) * 80;
      const ty = (dy / distance) * 80;

      blockElement.style.setProperty('--tx', tx + 'px');
      blockElement.style.setProperty('--ty', ty + 'px');
      
      blockElement.classList.add('popped');

      // Remove popped class after animation
      setTimeout(() => {
        blockElement.classList.remove('popped');
      }, 600);
    }
  });
}

function handleWindowResize() {
  generateBlocks();
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    generateBlocks();
    window.addEventListener('resize', handleWindowResize);
  });
} else {
  generateBlocks();
  window.addEventListener('resize', handleWindowResize);
}
