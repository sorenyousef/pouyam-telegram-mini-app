


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

