import matplotlib.pyplot as plt
import matplotlib.patches as patches

def create_sets_diagram():
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # Define colors (using hex for web consistency)
    c_real = '#e2e8f0'      # Slate-200
    c_rational = '#bfdbfe'  # Blue-200
    c_integer = '#a7f3d0'   # Emerald-200
    c_whole = '#fde68a'     # Amber-200
    c_natural = '#fecaca'   # Red-200
    c_irrational = '#e9d5ff'# Purple-200

    # 1. Real Numbers (The "Universal" Box)
    ax.add_patch(patches.Rectangle((0, 0), 10, 10, color=c_real, ec='black'))
    ax.text(0.5, 9.5, 'Real Numbers (R)', fontsize=14, fontweight='bold')

    # 2. Rational Numbers (Large Circle)
    circle_q = patches.Circle((4, 5), 3.8, color=c_rational, ec='black')
    ax.add_patch(circle_q)
    ax.text(4, 8.2, 'Rational (Q)', ha='center', fontsize=12, fontweight='bold')
    # Examples for Q
    ax.text(6.5, 6, '3/4', fontsize=10)
    ax.text(6, 4, '-0.5', fontsize=10)

    # 3. Integers (Circle inside Q)
    circle_z = patches.Circle((4, 4.5), 2.8, color=c_integer, ec='black')
    ax.add_patch(circle_z)
    ax.text(4, 6.5, 'Integers (Z)', ha='center', fontsize=12, fontweight='bold')
    # Examples for Z
    ax.text(5.5, 4.5, '-5', fontsize=10)
    ax.text(2, 3.5, '-100', fontsize=10)

    # 4. Whole Numbers (Circle inside Z)
    circle_w = patches.Circle((4, 3.8), 1.8, color=c_whole, ec='black')
    ax.add_patch(circle_w)
    ax.text(4, 5.0, 'Whole (W)', ha='center', fontsize=12, fontweight='bold')
    # Examples for W
    ax.text(4, 2.2, '0', ha='center', fontsize=10)

    # 5. Natural Numbers (Circle inside W)
    circle_n = patches.Circle((4, 3.5), 0.8, color=c_natural, ec='black')
    ax.add_patch(circle_n)
    ax.text(4, 3.5, 'Natural (N)', ha='center', fontsize=10, fontweight='bold')
    # Examples for N
    ax.text(4, 3.0, '1, 2, 3...', ha='center', fontsize=8)

    # 6. Irrational Numbers (Separate Circle/Box)
    circle_i = patches.Circle((8.5, 2), 1.2, color=c_irrational, ec='black')
    ax.add_patch(circle_i)
    ax.text(8.5, 2, 'Irrational (I)', ha='center', fontsize=10, fontweight='bold')
    # Examples for I
    ax.text(8.5, 1.2, 'π, √2, e', ha='center', fontsize=10)

    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')  # Hide axes
    
    # Save the figure
    plt.tight_layout()
    plt.savefig('static/sets_diagram.png', dpi=300, bbox_inches='tight')
    print("Diagram saved to static/sets_diagram.png")

if __name__ == "__main__":
    create_sets_diagram()