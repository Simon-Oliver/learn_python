# Use to detect errors that should never occur and crash your program
test_condition = True
assert test_condition , "Wow something went really wrong!"

device = 1
assert device in (1, 0) , "Not within range"


# We use exceptions that are caused by invalid user input or other problems
special_error = Exception("Exception raises a special error")
raise special_error

