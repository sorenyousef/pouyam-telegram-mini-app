


function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
}

  // Function to show or hide the check icon abi
function toggleImageVisibility(shouldShowImage) {
    const image = document.getElementById('conditionalimage');
    if (shouldShowImage) {
      image.style.display = 'block'; // Show the image
    } else {
      image.style.display = 'none'; // Hide the image
    }


  }
  
  // Example usage
  toggleImageVisibility(true); // Show the image
  // toggleImageVisibility(false); // Hide the image
//   baraye neshon dadan on check mark abi
// ///////////////////////////////







  


  const createProgressPath = (containerId, totalLevels, currentLevel) => {
    const container = document.getElementById(containerId);

    // Constants for layout
    const rowHeight = 160;
    const rowWidth = 700;
    const padding = 50;
    const nodeRadius = 20;

    // Create an SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgHeight = Math.ceil(totalLevels / 4) * rowHeight + 100;
    svg.setAttribute("viewBox", `0 0 ${rowWidth} ${svgHeight}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // Generate points
    const points = Array.from({ length: totalLevels }, (_, i) => {
      const row = Math.floor(i / 4);
      const isEvenRow = row % 2 === 0;
      const colPosition = i % 4;

      const maxOffset = 55;
      const waveOffset =
        Math.sin(i * 0.8) * maxOffset + Math.cos(i * 0.5) * (maxOffset * 0.75);

      const baseX = isEvenRow
        ? (colPosition / 3) * (rowWidth - 2 * padding) + padding
        : (rowWidth - padding) - (colPosition / 3) * (rowWidth - 2 * padding);

      const x = Math.min(Math.max(baseX + waveOffset, padding), rowWidth - padding);
      const yOffset = Math.sin(i * 1.2) * 25;
      const y = row * rowHeight + 50 + yOffset;

      return { x, y };
    });

    // Draw paths
    points.forEach((point, index) => {
      if (index < points.length - 1) {
        const nextPoint = points[index + 1];
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const midX = (point.x + nextPoint.x) / 2;
        const midY = (point.y + nextPoint.y) / 2;
        const curveOffset = Math.sin(index * 0.8) * 30;

        const pathData = `M ${point.x},${point.y} Q ${midX + curveOffset},${midY} ${nextPoint.x},${nextPoint.y}`;
        path.setAttribute("d", pathData);
        path.setAttribute("stroke", "#ddd");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-dasharray", "5,5");
        svg.appendChild(path);
      }
    });

    // Draw nodes
    points.forEach((point, index) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", nodeRadius);
    
      if (index < currentLevel) {
        // Completed levels (filled green)
        circle.setAttribute("fill", "rgb(34, 197, 94)"); // Green
        circle.setAttribute("stroke", "none"); // No border
      } else if (index === currentLevel) {
        // Current level (filled yellow)
        circle.setAttribute("fill", "rgb(234, 179, 8)"); // Yellow
        circle.setAttribute("stroke", "none"); // No border
      } else {
        // Upcoming levels (gray border only)
        circle.setAttribute("fill", "rgba(14, 19, 28, 1)"); // No fill
        circle.setAttribute("stroke", "rgb(156, 163, 175)"); // Gray border
        circle.setAttribute("stroke-width", "2"); // Border width
      }

      // Add text label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", point.x);
      text.setAttribute("y", point.y);
      text.textContent = index + 1;
    
      svg.appendChild(circle);
      svg.appendChild(text);
    });

    // Add SVG to container
    container.appendChild(svg);
  };



  // yani usser taa level 15 ro complete karde va alan bayad 16 ro anjam bede 
  createProgressPath("progress-path-container", 70, 15);





// Mapping between div IDs and associated image IDs
const divButtonMap = {
  friend: 'people',
  topholder: 'globe',
  leaderboard: 'trophy',
  transactions: 'More_Vertical'
};

/**
* Toggles the display of a specific div.
* @param {string} divId - The ID of the div to toggle.
*/
function toggleDiv(divId) {
  const targetDiv = document.getElementById(divId);
  // Toggle the `display` style between 'block' and 'none'
  targetDiv.style.display = targetDiv.style.display === 'block' ? 'none' : 'block';
}

/**
 * Updates the image source of a button when a div's visibility changes.
 * @param {HTMLElement} div - The div whose class has changed.
 */
function handleDisplayChange(div) {
  const divId = div.id; // Get the ID of the div
  const buttonImageId = divButtonMap[divId]; // Find the associated button image ID
  const buttonImage = document.getElementById(buttonImageId); // Access the associated image element

  // Check if the div has the "active" class
  const isActive = div.classList.contains('active');

  if (isActive) {
      const newSrc = `./static/icons/new-${buttonImageId}.svg`;
      buttonImage.src = newSrc; // Change to the new image
      console.log(`Div "${divId}" is active. Updated "${buttonImageId}" image to: ${newSrc}`);
  } else {
      const originalSrc = `./static/icons/original-${buttonImageId}.svg`;
      buttonImage.src = originalSrc; // Revert to the original image
      console.log(`Div "${divId}" is not active. Reverted "${buttonImageId}" image to: ${originalSrc}`);
  }
}

/**
* Sets up MutationObservers for all relevant divs to monitor style changes.
* Observes changes to the `style` attribute and triggers `handleDisplayChange`.
*/
document.addEventListener('DOMContentLoaded', () => {
  const targetDivIds = Object.keys(divButtonMap); // Get all div IDs from the mapping

  // Iterate over each divId in the mapping
  targetDivIds.forEach((divId) => {
      const div = document.getElementById(divId); // Get the div element by ID

      if (div) {
          // Create a MutationObserver for the div
          const observer = new MutationObserver((mutationsList) => {
              mutationsList.forEach((mutation) => {
                  if (mutation.attributeName === 'class') {
                      console.log(`Class mutation observed for div: ${div.id}`);
                      handleDisplayChange(div);
                  }
              });
          });

          // Start observing the div for changes to its `class` attribute
          observer.observe(div, { attributes: true, attributeFilter: ['class'] });
      } else {
          console.warn(`No element found with ID: ${divId}`);
      }
  });
});




const lists = [
  [['Anna Tailor anan1','Decemeber 04','234'],['Anna Tailor1','Decemeber 04','234'],['Anna Tailor1','Decemeber 04','234'],['Anna Tailor1','Decemeber 04','234']],
  [['Anna Tailor2','Decemeber 04','234'],['Anna Tailor moham2','Decemeber 04','234'],['Anna','Decemeber 04','234']],
  [['Anna TailorT','Decemeber 04','234']]
];

function changeList(listNumber) {
  // Update button styles
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  document.getElementById(`btn${listNumber}`).classList.add('active');

  // Update the displayed list with divs
  const listContainer = document.getElementById('listContainer');
  const list = lists[listNumber - 1];  // Adjusting for 0-based index
  listContainer.innerHTML = list.map(item => 
    `<div class="list-item">
    <div style="display: flex; flex-direction: row; white-space: nowrap;">
    <img src="./static/icons/original-people.svg" alt="" style="transform: scale(0.5)">

    <p style="padding-left: -50px;">${item[0]}<br><span class="span-in-item">Joined on ${item[1]}</span></p>
    </div>
    <p>${item[2]} PYM</p>

    </div>`
  ).join('');
}

// Set default active button and list (level 1)
changeList(1);