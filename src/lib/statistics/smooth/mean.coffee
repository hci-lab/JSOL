# ------------------------------------------------------------------------------
# ,Project     | GoGLib
# Module      | Stat Methods
# Author      | Sherif Emabrak
# Description | function return The mean (is the average of the numbers.)
#, ------------------------------------------------------------------------------

sum = (input_array...) ->
  total=0;
  for count in input_array
    total+=count
  total


mean = (input_array...) ->
  (sum input_array...)/input_array.length
