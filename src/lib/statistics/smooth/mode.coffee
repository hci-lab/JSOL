mode = (input_array...) ->
  counter = 1
  max = 0;
  result = input_array[0]

  input_array.sort()

  for i in [1...input_array.length-1]
    if(input_array[i]==input_array[i+1])
      counter++
      if(counter > max)
        max=counter
        result = input_array[i]
      else
        counter = 1

  result