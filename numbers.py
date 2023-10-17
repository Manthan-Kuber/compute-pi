import random

# Input and output file paths
input_file = "master_file.txt"
output_file = "random.txt"

# Number of random numbers to extract
num_random_numbers = 1000

# List to store the selected random numbers
random_numbers = []

# Read the input file and extract random numbers
with open(input_file, "r") as file:
    lines = file.readlines()
    
    # Ensure you have at least 1000 lines in the file; otherwise, you'll get all lines.
    num_lines = min(len(lines), num_random_numbers)
    
    # Shuffle the lines to randomly select lines
    random.shuffle(lines)
    
    for line in lines[:num_lines]:
        parts = line.strip().split()  # Assuming whitespace separates columns
        if parts and parts[0].isdigit():
            random_numbers.append(parts[0])

# Write the selected random numbers to the output file
with open(output_file, "w") as file:
    for number in random_numbers:
        file.write(number + "\n")

print(f"Extracted {len(random_numbers)} random numbers and saved them to '{output_file}'.")
