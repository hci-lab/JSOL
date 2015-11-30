median = (input_array...) ->
  size = input_array.length
  posetion = 0
  result = 0
  if size%2 isnt 0
    posetion = (size-1)/2
    result = input_array[posetion]
  else
    posetion = size / 2
    result = (input_array[posetion]+input_array[posetion-1])/2
  result