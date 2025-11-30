// --- Page Specific: Set Operations Logic ---
function calculateSets() {
    const setAStr = document.getElementById('setA').value;
    const setBStr = document.getElementById('setB').value;
    
    // Parse inputs (comma separated)
    const arrA = setAStr.split(',').map(s => s.trim()).filter(s => s !== '');
    const arrB = setBStr.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const setA = new Set(arrA);
    const setB = new Set(arrB);

    // Union
    const union = new Set([...setA, ...setB]);
    
    // Intersection
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    
    // Difference (A - B)
    const difference = new Set([...setA].filter(x => !setB.has(x)));

    // Cartesian (Limit to 10 items for display)
    let cartesian = [];
    let count = 0;
    for (let a of setA) {
        for (let b of setB) {
            if(count < 10) cartesian.push(`(${a},${b})`);
            count++;
        }
    }
    if (arrA.length * arrB.length > 10) cartesian.push("...");

    // Update Display
    document.getElementById('res-union').innerText = `{ ${Array.from(union).join(', ')} }`;
    document.getElementById('res-intersect').innerText = `{ ${Array.from(intersection).join(', ')} }`;
    document.getElementById('res-diff').innerText = `{ ${Array.from(difference).join(', ')} }`;
    document.getElementById('res-cartesian').innerText = `{ ${cartesian.join(', ')} }`;
    document.getElementById('res-card-union').innerText = union.size;
}

// PDF Download Logic
function downloadPDF() {
    const element = document.getElementById('lesson-content');
    const opt = {
        margin: [0.5, 0.5],
        filename: 'Week_2_Lesson.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}