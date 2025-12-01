// --- Permutation & Combination Calculator ---
function calculateCombinatorics() {
    const n = parseInt(document.getElementById('comb-n').value);
    const r = parseInt(document.getElementById('comb-r').value);
    const type = document.querySelector('input[name="comb-type"]:checked').value; // 'perm' or 'comb'
    
    const resultBox = document.getElementById('comb-result');
    const formulaBox = document.getElementById('comb-formula-display');
    const stepBox = document.getElementById('comb-steps');

    // Validation
    if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
        resultBox.innerText = "Error";
        stepBox.innerText = "Please enter non-negative integers.";
        formulaBox.innerText = "";
        return;
    }
    if (r > n) {
        resultBox.innerText = "Error";
        stepBox.innerText = "r cannot be greater than n (you can't pick more items than you have).";
        formulaBox.innerText = "";
        return;
    }

    // Factorial Helper
    const fact = (num) => {
        let val = 1;
        for (let i = 2; i <= num; i++) val *= i;
        return val;
    };

    let result = 0;
    let formulaTeX = "";
    let explanationText = "";

    if (type === 'perm') {
        // Permutation: nPr = n! / (n-r)!
        result = fact(n) / fact(n - r);
        formulaTeX = `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!} = \\frac{${n}!}{${n-r}!}`;
        
        // Build expansion string for visual step
        let expansion = "";
        for(let i=0; i<r; i++) {
            expansion += (n-i) + (i < r-1 ? " \\times " : "");
        }
        explanationText = `$$ = ${expansion} = ${result.toLocaleString()} $$`;

    } else {
        // Combination: nCr = n! / ((n-r)! * r!)
        result = fact(n) / (fact(n - r) * fact(r));
        formulaTeX = `C(${n}, ${r}) = \\binom{${n}}{${r}} = \\frac{${n}!}{(${n}-${r})! \\times ${r}!}`;
        explanationText = `$$ = \\frac{${n}!}{${n-r}! \\times ${r}!} = ${result.toLocaleString()} $$`;
    }

    // Update UI
    formulaBox.innerHTML = `$$ ${formulaTeX} $$`;
    stepBox.innerHTML = explanationText;
    resultBox.innerText = result.toLocaleString();

    // Re-render MathJax
    if(window.MathJax) MathJax.typesetPromise();
}

// PDF Download
function downloadPDF() {
    const element = document.getElementById('lesson-content');
    const opt = {
        margin: [0.3, 0.3],
        filename: 'Week_5_Lesson.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// --- Modal Logic ---
function showModal(title, message, isCorrect) {
    const modal = document.getElementById('feedback-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.getElementById('modal-icon');
    
    modalTitle.className = "text-2xl font-bold text-center mb-2";
    modalIcon.innerHTML = ''; 
    
    modalTitle.textContent = title;
    modalMessage.innerHTML = message; 

    if (isCorrect === true) {
        modalTitle.classList.add("text-green-400");
        modalIcon.innerHTML = '<svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    } else if (isCorrect === false) {
        modalTitle.classList.add("text-red-400");
        modalIcon.innerHTML = '<svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    } else {
        modalTitle.classList.add("text-indigo-400");
        modalIcon.innerHTML = '<svg class="w-16 h-16 text-indigo-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }

    modal.classList.remove('hidden');
    
    // IMPORTANT: Re-render MathJax after content is injected
    if (window.MathJax) {
        MathJax.typesetPromise([modalMessage]);
    }
}

function closeModal() {
    document.getElementById('feedback-modal').classList.add('hidden');
}

// --- Quiz Logic ---
function checkQuestion(quizName, questionNum, correctAnswer, explanation) {
    const selected = document.querySelector(`input[name="${quizName}-q${questionNum}"]:checked`);
    
    if (!selected) {
        showModal("Notice", "Please select an answer before checking.", null); 
        return;
    }

    if (selected.value === correctAnswer) {
        showModal("Correct!", "Great job! That is the correct answer.", true);
    } else {
        showModal("Incorrect", `
            <div class="space-y-4">
                <p class="text-lg">The correct answer was <strong>${correctAnswer.toUpperCase()}</strong>.</p>
                <div class="bg-slate-700/50 p-4 rounded-lg text-sm text-slate-300 border-l-4 border-red-500 text-left">
                    <strong>Explanation:</strong><br>${explanation}
                </div>
            </div>
        `, false);
    }
}

// --- Activity Logic ---
function showAnswer(questionText, answerText) {
    showModal("Answer Reveal", `
        <div class="flex flex-col items-center space-y-4">
            <div class="w-full bg-slate-700/30 p-3 rounded-lg border border-slate-600">
                <p class="text-xs text-slate-400 uppercase font-bold">Question</p>
                <p class="text-lg text-white">${questionText}</p>
            </div>
            <div class="w-full bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <p class="text-xs text-green-400 uppercase font-bold">Answer</p>
                <p class="text-xl text-white font-bold">${answerText}</p>
            </div>
        </div>
    `, null);
}

// --- TRUTH TABLE GENERATOR ---

function isOperator(c) { return ['!', '&', '|', '>', '=', '(', ')', '^', 'v'].includes(c); }
function getPrecedence(op) {
    if (op === '!') return 4;
    if (op === '&' || op === '^') return 3;
    if (op === '|' || op === 'v') return 2;
    if (op === '>') return 1; 
    if (op === '=') return 0; 
    return -1;
}

// Variable Extraction (Preserves order)
function getVariables(expression) {
    const regex = /[a-zA-Z]/g;
    const found = expression.match(regex);
    if (!found) return [];
    const uniqueVars = [...new Set(found)].filter(v => v !== 'v' && v !== 'T' && v !== 'F');
    return uniqueVars;
}

function infixToPostfix(expression) {
    let outputQueue = [];
    let operatorStack = [];
    let tokens = expression.replace(/\s+/g, '')
                           .replace(/->/g, '>')
                           .replace(/<->/g, '=')
                           .replace(/\^/g, '&')
                           .replace(/v/g, '|') 
                           .split('');
    
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (isOperator(token)) {
            if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            } else {
                while (operatorStack.length > 0 && getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        } else {
            outputQueue.push(token);
        }
    }
    while (operatorStack.length > 0) outputQueue.push(operatorStack.pop());
    return outputQueue;
}

function evaluateWithSteps(postfix, rowValues) {
    let stack = [];
    let steps = {}; 

    for (let token of postfix) {
        if (!isOperator(token)) {
            let val = (token === 'T') ? true : (token === 'F') ? false : rowValues[token];
            stack.push({ val: val, expr: token });
        } else {
            let a, b, newVal, newExpr;
            
            if (token === '!') { 
                a = stack.pop(); 
                newVal = !a.val;
                newExpr = (a.expr.length > 1) ? `¬(${a.expr})` : `¬${a.expr}`;
                stack.push({ val: newVal, expr: newExpr });
                steps[newExpr] = newVal;
            } else {
                b = stack.pop(); a = stack.pop();
                let opSym = {'&':'∧', '|':'∨', '>':'→', '=':'↔'}[token];
                
                if (token === '&') newVal = a.val && b.val;
                else if (token === '|' || token === 'v') newVal = a.val || b.val;
                else if (token === '>') newVal = !a.val || b.val;
                else if (token === '=') newVal = a.val === b.val;
                
                newExpr = `(${a.expr} ${opSym} ${b.expr})`;
                stack.push({ val: newVal, expr: newExpr });
                steps[newExpr] = newVal;
            }
        }
    }
    return { result: stack.pop(), steps: steps };
}

function getColumnHeaders(postfix) {
    let stack = [];
    let headers = [];
    for (let token of postfix) {
        if (!isOperator(token)) {
            stack.push(token);
        } else {
            let a, b, newExpr;
            if (token === '!') {
                a = stack.pop();
                newExpr = (a.length > 1) ? `¬(${a})` : `¬${a}`;
            } else {
                b = stack.pop(); a = stack.pop();
                let opSym = {'&':'∧', '|':'∨', '>':'→', '=':'↔'}[token];
                newExpr = `(${a} ${opSym} ${b})`;
            }
            stack.push(newExpr);
            headers.push(newExpr);
        }
    }
    if (headers.length > 0) headers.pop();
    return headers;
}

function generateTruthTable() {
    const expressionInput = document.getElementById('expression').value;
    const outputDiv = document.getElementById('truth-table-output');
    
    if (!expressionInput) { outputDiv.innerHTML = '<p class="text-red-400">Please enter an expression.</p>'; return; }

    try {
        let vars = getVariables(expressionInput);
        if (vars.length === 0 && expressionInput.length > 0) vars = []; 

        const numVars = vars.length;
        const numRows = Math.pow(2, numVars);
        
        const postfix = infixToPostfix(expressionInput);
        const subExprHeaders = getColumnHeaders(postfix);

        // --- Make Expression Pretty for Header ---
        let formattedExpression = expressionInput
            .replace(/<->/g, ' ↔ ')
            .replace(/->/g, ' → ')
            .replace(/\^/g, ' ∧ ')
            .replace(/&/g, ' ∧ ')
            .replace(/v/g, ' ∨ ')
            .replace(/\|/g, ' ∨ ')
            .replace(/!/g, '¬')
            .replace(/~/g, '¬');

        // --- Build Table HTML ---
        let tableHTML = `
            <div class="rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
                <table class="w-full text-sm text-center border-collapse">
                    <thead class="text-xs uppercase text-slate-300">
                        <tr>`;
        
        // Header: Variables
        vars.forEach(v => {
            tableHTML += `<th class="px-4 py-3 border border-slate-600 bg-slate-800/80 font-bold text-indigo-300 tracking-wider">${v}</th>`;
        });
        
        // Header: Sub-expressions
        subExprHeaders.forEach(h => {
            tableHTML += `<th class="px-4 py-3 border border-slate-600 bg-slate-800/60 text-slate-400 font-medium">${h}</th>`;
        });
        
        // Header: Final (Now displays the formatted input expression)
        tableHTML += `<th class="px-6 py-3 border border-slate-600 bg-indigo-600 text-white font-bold tracking-wider shadow-inner font-mono text-sm">${formattedExpression}</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-300 font-mono text-sm">`;

        // Rows
        for (let i = numRows - 1; i >= 0; i--) {
            let rowValues = {};
            let rowClass = (i % 2 === 0) ? "bg-slate-900" : "bg-slate-800/30"; 
            
            let rowHTML = `<tr class="${rowClass} hover:bg-slate-700/50 transition-colors">`;
            
            // 1. Variable Values
            for (let j = 0; j < numVars; j++) {
                const val = (i >> (numVars - 1 - j)) & 1 ? true : false;
                rowValues[vars[j]] = val;
                let colorClass = val ? 'text-green-400' : 'text-red-400';
                rowHTML += `<td class="px-4 py-3 border-r border-slate-600 ${colorClass}">${val ? 'T' : 'F'}</td>`;
            }

            const evalData = evaluateWithSteps(postfix, rowValues);

            // 2. Intermediate Steps
            subExprHeaders.forEach(h => {
                let val = evalData.steps[h];
                if(val === undefined) val = evalData.steps[h.replace(/^\(|\)$/g, '')];
                
                let display = (val === true) ? 'T' : 'F';
                let color = (val === true) ? 'text-green-400' : 'text-red-400';
                rowHTML += `<td class="px-4 py-3 border-r border-slate-600 ${color}">${display}</td>`;
            });

            // 3. Final Result
            const res = evalData.result.val;
            let finalBg = res ? "bg-green-900/20" : "bg-red-900/20";
            let finalColor = res ? "text-green-400" : "text-red-400";
            
            rowHTML += `<td class="px-4 py-3 font-bold ${finalColor} ${finalBg} border-l-2 border-slate-600">${res ? 'T' : 'F'}</td></tr>`;
            tableHTML += rowHTML;
        }
        tableHTML += '</tbody></table></div>';
        
        outputDiv.innerHTML = tableHTML;
        
    } catch (e) {
        console.error(e);
        outputDiv.innerHTML = `<div class="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
            <p class="font-bold">Syntax Error</p>
            <p>Please check your expression format (e.g., p ^ q -> r).</p>
        </div>`;
    }
}