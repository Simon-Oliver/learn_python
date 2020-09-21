def gimme(input_array):
    return input_array.index(sorted(input_array)[1])
    # Implement this function


print(gimme([2, 3, 1]))

# test.assert_equals(gimme([2, 3, 1]), 0, 'Finds the index of middle element')
# test.assert_equals(gimme([5, 10, 14]), 1, 'Finds the index of middle element')
