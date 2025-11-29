from flask import Flask, render_template, abort, send_from_directory, url_for
import os

app = Flask(__name__)

# --- Instructor Personal Info ---
instructor_info = {
    "name": "Paul Domenic Trambulo",
    "title": "Instructor",
    "email": "p.t.instructor@example.edu",
    "focus": "Discrete Mathematics, Cryptography, Algorithms",
    "quote": "Our attitude towards life determines life's attitude towards us.",
}

# --- Syllabus Data (Full Semester) ---
syllabus_data = {
    "course_info": {
        "title": "Discrete Structures 1",
        "code": "CS101", 
        "units": 3,
        "prerequisite": "College Algebra",
        "description": "This course introduces the fundamental discrete mathematical structures used in computer science, focusing on logic, proofs, sets, functions, and graph theory. It aims to develop the mathematical foundations required for analyzing algorithms, cryptography, and logic design."
    },
    "periods": [
        # --- PRELIMINARY PERIOD (Weeks 0-6) ---
        {
            "id": "preliminary",
            "name": "Preliminary Period",
            "weeks": "0–6",
            "theme": "The Language of Logic and Proofs",
            "focus": "Formalizing reasoning, which is essential for programming logic and condition checking.",
            "schedule": [
                {
                    "week": 0,
                    "topic": "Course Overview: What is Discrete Math?",
                    "intro_text": "Before we dive into logic, we must ask: What exactly is Discrete Mathematics? Unlike the continuous math of Calculus (smooth curves), Discrete Math deals with distinct, separated values—like the 1s and 0s of a computer, or the nodes in a network.",
                    "details": ["Discrete vs. Continuous Math", "Discrete vs. Continuous Data", "Real-world Applications"],
                    "activities": ["Data Classification Drill", "Real-world Examples"],
                    "pdf_link": "DC PPT 1.pdf", 
                    "detailed_lessons": [] 
                },
                {
                    "week": 1,
                    "topic": "Introduction & Propositional Logic",
                    "intro_text": "Welcome to Discrete Structures! In this first week, we lay the foundation for all computer logic. You will learn how to formalize statements into propositions and use logical connectives to build complex arguments.",
                    "details": ["Propositions", "Connectives (AND, OR, NOT, XOR)", "Truth Tables", "Tautology, Contradiction"],
                    "activities": ["Interactive Truth Table Generator", "Logic Puzzles"],
                    "pdf_link": "DC PPT 2.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 2,
                    "topic": "Logical Equivalences & Sets (Basic)",
                    "intro_text": "Now that we understand basic logic, we explore how to manipulate it using equivalence laws like De Morgan's. We also introduce Set Theory, the mathematical language of collections.",
                    "details": ["De Morgan’s Laws", "Idempotent, Commutative Laws", "Set Notation", "Number Systems"],
                    "activities": ["Truth Table Proofs", "Number Classification"],
                    "pdf_link": "DC PPT 2.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 3,
                    "topic": "Set Operations and Venn Diagrams",
                    "intro_text": "We dive deeper into Sets, learning how to combine them using Union, Intersection, and Difference. We'll visualize these relationships using Venn Diagrams.",
                    "details": ["Union, Intersection, Difference", "Venn Diagrams", "Cardinality"],
                    "pdf_link": "DC PPT 3.pdf",
                    "activities": ["Venn Diagram Solver"]
                },
                {
                    "week": 4,
                    "topic": "Basic Counting Principles",
                    "intro_text": "How do we count complex possibilities without listing them all? We introduce the Sum and Product rules, the building blocks of combinatorics.",
                    "details": ["Sum/Product Rules", "Factorials", "Combinatorics Intro"],
                    "pdf_link": "DC PPT 4.pdf",
                    "activities": ["Counting Calculator"]
                },
                {
                    "week": 5,
                    "topic": "Permutations and Combinations",
                    "intro_text": "Order matters... sometimes. We distinguish between Permutations (arrangements) and Combinations (selections), crucial for probability and optimization.",
                    "details": ["Permutations vs Combinations", "Formulas"],
                    "pdf_link": "DC PPT 4.pdf",
                    "activities": ["Permutation Calculator"]
                },
                {
                    "week": 6,
                    "topic": "PRELIMINARY EXAMINATION",
                    "intro_text": "This week is dedicated to assessing your understanding of Weeks 1-5. Prepare for a comprehensive exam covering Logic, Sets, and Counting.",
                    "details": ["Review All Topics"],
                    "pdf_link": None,
                    "activities": ["Mock Exam"]
                }
            ]
        },
        # --- MIDTERM PERIOD (Weeks 7-12) ---
        {
            "id": "midterm",
            "name": "Midterm Period",
            "weeks": "7–12",
            "theme": "Structures: Sets, Functions, and Numbers",
            "focus": "Focuses on the data structures used to store information and the math behind cryptography.",
            "schedule": [
                {
                    "week": 7,
                    "topic": "Probability Theory",
                    "intro_text": "Uncertainty is a part of life and computing. In this week, we learn how to quantify that uncertainty using Probability, exploring independent and dependent events.",
                    "details": ["Independent vs Dependent Events", "Mutually Exclusive Events", "Conditional Probability"],
                    "activities": ["Dice Roll Simulation", "Card Draw Probability"],
                    "pdf_link": "DC PPT 5.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 8,
                    "topic": "Functions",
                    "intro_text": "Functions are the workhorses of mathematics and programming. We will define them formally and explore properties like Injection, Surjection, and Bijection.",
                    "details": ["Injective, Surjective, Bijective", "Inverse Functions", "Composition"],
                    "activities": ["Function Mapping Visualizer", "Hash Collision Demo"],
                    "pdf_link": None,
                    "detailed_lessons": []
                },
                {
                    "week": 9,
                    "topic": "Sequences and Summations",
                    "intro_text": "Patterns in numbers are everywhere. We will look at Arithmetic and Geometric progressions and learn the powerful Sigma notation for summations.",
                    "details": ["Arithmetic/Geometric Progressions", "Summation Notation (Σ)", "Recurrence Relations"],
                    "activities": ["Sequence Generator", "Recursive Code Tracer"],
                    "pdf_link": None,
                    "detailed_lessons": []
                },
                {
                    "week": 10,
                    "topic": "Matrices and Zero-One Matrices",
                    "intro_text": "Matrices are fundamental to graphics, AI, and network representation. We will learn matrix arithmetic and special Boolean matrices used in graph theory.",
                    "details": ["Matrix Operations", "Boolean Matrix Operations", "Transposes"],
                    "activities": ["Matrix Calculator", "Social Network Matrix"],
                    "pdf_link": "DC PPT 6.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 11,
                    "topic": "Number Theory & Cryptography",
                    "intro_text": "How do we keep data safe? We explore the basics of Number Theory, Modular Arithmetic, and apply them to classic ciphers like the Caesar Cipher.",
                    "details": ["Modular Arithmetic", "Primes & GCD", "Caesar Cipher Encryption"],
                    "activities": ["Caesar Cipher Tool", "GCD Calculator"],
                    "pdf_link": "DC PPT 7.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 12,
                    "topic": "MIDTERM EXAMINATION",
                    "intro_text": "Halfway there! This week we assess your mastery of Sets, Functions, Matrices, and Basic Cryptography.",
                    "details": ["Coverage: Weeks 7-11"],
                    "activities": ["Midterm Mock Exam"],
                    "pdf_link": "DC PPT 8.pdf", # Review PPT
                    "detailed_lessons": []
                }
            ]
        },
        # --- FINAL PERIOD (Weeks 13-18) ---
        {
            "id": "final",
            "name": "Final Period",
            "weeks": "13–18",
            "theme": "Advanced Structures and Counting",
            "focus": "Focuses on measuring complexity and understanding relationships between data.",
            "schedule": [
                {
                    "week": 13,
                    "topic": "Mathematical Induction",
                    "intro_text": "How do we prove a loop is correct or a formula works for infinity? Mathematical Induction is the powerful 'domino effect' proof technique we use.",
                    "details": ["Principle of Induction", "Base Case & Inductive Step", "Strong Induction"],
                    "activities": ["Domino Visualizer", "Summation Proofs"],
                    "pdf_link": None,
                    "detailed_lessons": []
                },
                {
                    "week": 14,
                    "topic": "Advanced Counting",
                    "intro_text": "Revisiting counting with more power. We look at the Pigeonhole Principle—a simple concept with profound implications for hash collisions and resource allocation.",
                    "details": ["Pigeonhole Principle", "Permutations Review", "Combinations Review"],
                    "activities": ["Birthday Paradox Sim", "Password Strength Calc"],
                    "pdf_link": "DC PPT 4.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 15,
                    "topic": "Relations",
                    "intro_text": "Relations define how objects interact. We study properties like Reflexivity, Symmetry, and Transitivity, which are key to database design.",
                    "details": ["Reflexive, Symmetric, Transitive", "Equivalence Relations", "Equivalence Classes"],
                    "activities": ["Relation Property Checker"],
                    "pdf_link": None,
                    "detailed_lessons": []
                },
                {
                    "week": 16,
                    "topic": "Graph Theory (Introduction)",
                    "intro_text": "Graphs model everything from social networks to city maps. We introduce Vertices, Edges, and the famous Seven Bridges of Königsberg problem.",
                    "details": ["Vertices & Edges", "Directed vs. Undirected", "Paths and Cycles"],
                    "activities": ["Graph Builder Tool", "Seven Bridges Challenge"],
                    "pdf_link": "DC PPT 9.pdf",
                    "detailed_lessons": []
                },
                {
                    "week": 17,
                    "topic": "Trees and Traversal",
                    "intro_text": "Trees are a special type of graph used in file systems and AI decision making. We learn about Rooted Trees and Binary Search Trees.",
                    "details": ["Rooted Trees", "Binary Search Trees (BST)", "Tree Traversal"],
                    "activities": ["BST Builder", "Tree Traversal visualizer"],
                    "pdf_link": None,
                    "detailed_lessons": []
                },
                {
                    "week": 18,
                    "topic": "FINAL EXAMINATION",
                    "intro_text": "The final challenge. A comprehensive assessment of your journey through Discrete Structures.",
                    "details": ["Cumulative Coverage"],
                    "activities": ["Finals Mock Exam"],
                    "pdf_link": None,
                    "detailed_lessons": []
                }
            ]
        }
    ]
}

def get_lesson_data(week_number):
    week_num = int(week_number)
    for period in syllabus_data['periods']:
        for item in period['schedule']:
            if item['week'] == week_num:
                return period, item
    return None, None

@app.route('/')
def index():
    # This now looks for 'index.html' inside the 'templates' folder
    return render_template('index.html', data=syllabus_data, instructor=instructor_info)

@app.route('/instructor')
def instructor_page():
    return render_template('instructor.html', instructor=instructor_info)

# ROUTE FOR LESSON INTRO
@app.route('/lesson/intro/<int:week_number>')
def lesson_intro(week_number):
    period, lesson = get_lesson_data(week_number)
    if not lesson:
        abort(404)
    return render_template('lesson_intro.html', period=period, lesson=lesson)

# ROUTE FOR WEEKLY LESSON CONTENT
@app.route('/lesson/week/<int:week_number>')
def weekly_lesson(week_number):
    period, lesson = get_lesson_data(week_number)
    if not lesson:
        abort(404)
    
    template_name = f"weeks/week_{week_number}.html"
    try:
        return render_template(template_name, 
                               course_info=syllabus_data['course_info'],
                               period=period,
                               lesson=lesson,
                               instructor=instructor_info)
    except:
        # Fallback to generic template if specific one doesn't exist
        return render_template('lesson_detail.html', 
                               course_info=syllabus_data['course_info'],
                               period=period,
                               lesson=lesson,
                               instructor=instructor_info)

@app.route('/uploaded_file/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(os.getcwd(), filename)

if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = os.getcwd()
    app.run(debug=True)