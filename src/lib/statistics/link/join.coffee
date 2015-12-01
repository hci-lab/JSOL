# ------------------------------------------------------------------------------
# Project     | GoGLib
# Module      | Stat Methods
# Author      | Sherif Emabrak
# Description | Given a list of n nodes (n assumed even) represented by the indices
#               (1,2,3,...) , the join method returns a list of edges represented
#               by the indices {(1,1+n/2),(2,2+n/2),...}This  method is useful for blending
#               two varsets of nodes because it pairs the first node in the first
#               column with the first node in the second, and so on
# ------------------------------------------------------------------------------
#x=[2, 3 ,6 ,8 ,4 ,2 ,6 ,9]
join = (input_array...) ->
  n = input_array.length
  result = []
  for  key,value  of input_array
    result.push([value,value+n/2])
  result

#console.log(join x...)

