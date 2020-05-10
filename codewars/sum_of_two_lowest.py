def sum_two_smallest_numbers(numbers):
    numbers.sort()
    return numbers[0] + numbers[1]


print(sum_two_smallest_numbers([5, 8, 12, 18, 22]))
print(sum_two_smallest_numbers([7, 15, 12, 18, 22]))
