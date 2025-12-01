// --- Counting Principle Simulator ---
function calculateScenario() {
    const group1Name = document.getElementById('group1-name').value || "Items A";
    const group1Count = parseInt(document.getElementById('group1-count').value) || 0;
    
    const group2Name = document.getElementById('group2-name').value || "Items B";
    const group2Count = parseInt(document.getElementById('group2-count').value) || 0;
    
    const operation = document.querySelector('input[name="operation"]:checked').value;
    
    const resultDisplay = document.getElementById('calc-result');
    const explanation = document.getElementById('calc-explanation');
    const visualContainer = document.getElementById('calc-visual');
    
    let result = 0;
    let visualHTML = '';

    // Safety Cap for visualizer to prevent browser lag
    const maxVisual = 100; 

    if (operation === 'sum') {
        // SUM RULE (OR)
        result = group1Count + group2Count;
        resultDisplay.innerText = result;
        explanation.innerHTML = `
            <strong class="text-teal-400">Sum Rule (OR):</strong><br>
            You are choosing <strong>ONE</strong> item from either ${group1Name} <em>OR</em> ${group2Name}.<br>
            Since you can't pick from both, we add the possibilities.<br>
            $$ ${group1Count} + ${group2Count} = ${result} $$
        `;

        // Visual: Just show all items side by side
        visualHTML += '<div class="flex flex-wrap gap-2 justify-center">';
        for(let i=0; i<group1Count; i++) {
            if(i > maxVisual/2) break;
            visualHTML += `<div class="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-xs text-white font-bold" title="${group1Name} ${i+1}">A${i+1}</div>`;
        }
        if(group1Count > maxVisual/2) visualHTML += `<span class="text-slate-500 self-center">...</span>`;
        
        // Separator
        visualHTML += `<div class="flex items-center px-4 text-slate-400 font-bold">OR</div>`;

        for(let i=0; i<group2Count; i++) {
            if(i > maxVisual/2) break;
            visualHTML += `<div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs text-white font-bold" title="${group2Name} ${i+1}">B${i+1}</div>`;
        }
        if(group2Count > maxVisual/2) visualHTML += `<span class="text-slate-500 self-center">...</span>`;
        visualHTML += '</div>';

    } else {
        // PRODUCT RULE (AND)
        result = group1Count * group2Count;
        resultDisplay.innerText = result;
        explanation.innerHTML = `
            <strong class="text-purple-400">Product Rule (AND):</strong><br>
            You are choosing <strong>ONE</strong> from ${group1Name} <em>AND THEN</em> <strong>ONE</strong> from ${group2Name}.<br>
            Every item in Group A pairs with every item in Group B.<br>
            $$ ${group1Count} \\times ${group2Count} = ${result} $$
        `;

        // Visual: Show connections/pairs
        if (result <= maxVisual) {
            visualHTML += '<div class="grid grid-cols-2 gap-2 text-xs text-left max-w-md mx-auto">';
            for(let i=0; i<group1Count; i++) {
                for(let j=0; j<group2Count; j++) {
                    visualHTML += `
                        <div class="bg-slate-700 p-2 rounded border border-slate-600 flex items-center gap-2">
                            <div class="flex gap-1">
                                <span class="w-4 h-4 bg-teal-500 rounded-full inline-block"></span>
                                <span class="w-4 h-4 bg-blue-500 rounded-full inline-block"></span>
                            </div>
                            <span class="text-slate-300">A${i+1}-B${j+1}</span>
                        </div>`;
                }
            }
            visualHTML += '</div>';
        } else {
            visualHTML += `<div class="text-center text-slate-500 italic p-4">Too many combinations to display visually (${result} items).<br>But imagine a massive grid!</div>`;
        }
    }

    visualContainer.innerHTML = visualHTML;
    
    // Refresh MathJax
    if(window.MathJax) MathJax.typesetPromise();
}

// --- Factorial Calculator ---
function calculateFactorial() {
    const n = parseInt(document.getElementById('fact-n').value);
    const resultBox = document.getElementById('fact-result');
    const stepBox = document.getElementById('fact-steps');

    if (isNaN(n) || n < 0) {
        resultBox.innerText = "Error";
        stepBox.innerText = "Please enter a non-negative integer.";
        return;
    }

    if (n > 170) {
        resultBox.innerText = "Infinity";
        stepBox.innerText = "Value too large for standard Javascript numbers!";
        return;
    }

    let result = 1;
    let steps = [];
    
    for (let i = n; i > 0; i--) {
        steps.push(i);
        result *= i;
    }

    // Special case for 0!
    if (n === 0) { 
        steps = ["1 (By definition)"]; 
    }

    resultBox.innerText = result.toLocaleString();
    stepBox.innerHTML = `$$ ${n}! = ${steps.join(' \\times ')} = ${result.toLocaleString()} $$`;
    
    if(window.MathJax) MathJax.typesetPromise();
}

// PDF Download Logic
function downloadPDF() {
    const element = document.getElementById('lesson-content');
    const opt = {
        margin: [0.3, 0.3],
        filename: 'Week_4_Lesson.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}