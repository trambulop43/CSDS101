// --- Venn Diagram Explorer Logic ---
function highlightVenn(operation) {
    // Get SVG Elements
    const circleA = document.getElementById('venn-a'); // Left part (A only)
    const circleB = document.getElementById('venn-b'); // Right part (B only)
    const intersect = document.getElementById('venn-intersect'); // Middle part
    const label = document.getElementById('venn-label');

    // Reset styles (Default State: Outline only, low opacity fill)
    const baseClass = "transition-all duration-300 fill-current";
    const inactiveClass = "text-slate-700/50";
    const activeClass = "text-teal-500/80"; // Highlight color
    const activeIntersect = "text-purple-500/80";

    circleA.setAttribute("class", `${baseClass} ${inactiveClass}`);
    circleB.setAttribute("class", `${baseClass} ${inactiveClass}`);
    intersect.setAttribute("class", `${baseClass} ${inactiveClass}`);

    // Apply Highlight based on Operation
    switch(operation) {
        case 'union':
            circleA.setAttribute("class", `${baseClass} ${activeClass}`);
            circleB.setAttribute("class", `${baseClass} ${activeClass}`);
            intersect.setAttribute("class", `${baseClass} ${activeClass}`);
            label.innerHTML = "<strong>Union ($A \\cup B$):</strong> Everything in A OR B (All colored regions).";
            break;
        case 'intersection':
            intersect.setAttribute("class", `${baseClass} ${activeIntersect}`);
            label.innerHTML = "<strong>Intersection ($A \\cap B$):</strong> Only where they overlap.";
            break;
        case 'diffA':
            circleA.setAttribute("class", `${baseClass} ${activeClass}`);
            label.innerHTML = "<strong>Difference ($A - B$):</strong> Everything in A, excluding the overlap.";
            break;
        case 'diffB':
            circleB.setAttribute("class", `${baseClass} ${activeClass}`);
            label.innerHTML = "<strong>Difference ($B - A$):</strong> Everything in B, excluding the overlap.";
            break;
        case 'symDiff':
            circleA.setAttribute("class", `${baseClass} ${activeClass}`);
            circleB.setAttribute("class", `${baseClass} ${activeClass}`);
            label.innerHTML = "<strong>Symmetric Difference ($A \\oplus B$):</strong> A or B, but NOT both.";
            break;
        default:
            label.textContent = "Select an operation to visualize.";
    }
    
    // Re-render MathJax in the label if needed
    if (window.MathJax) {
        MathJax.typesetPromise([label]);
    }
}

// PDF Download
function downloadPDF() {
    const element = document.getElementById('lesson-content');
    const opt = {
        margin: [0.3, 0.3],
        filename: 'Week_3_Lesson.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}