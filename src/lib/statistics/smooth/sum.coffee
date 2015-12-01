# ------------------------------------------------------------------------------
# Project     | GoGLib
# Module      | Stat Methods
# Author      | Sherif Emabrak
# Description | function return sum of array
# ------------------------------------------------------------------------------
sum = (input_array...) ->
  total=0;
  for count in input_array
    total+=count
  total