# ------------------------------------------------------------------------------
# ,Project     | GoGLib
# Module      | Stat Methods
# Author      | Sherif Emabrak
# Description | The sequence method links adjacent nodes in a sequence
#               (1,2,3,..),producing the list of links{(1,2),(2,3),...}
# ------------------------------------------------------------------------------
#x=[6,2,3,5,4,7,8]
sequence = (input_array...) ->
  result = []
  for  key,value of input_array
    temp=key
    key=value
    value=input_array[parseInt(temp)+1]
    result.push([key,value])
  result

#console.log(sequence x...)
