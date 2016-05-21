class Transform


#             {
#               "lang": "R",    // function language
#               "function": "fibonnaci", // function name
#                "properties": {
#                  "data" : "static",
#                  "length" : 20,
#                  "field" : "x",
#                 "name": "fibonnaci_x"
#                }
#          }

Transform::process = (obj) ->
  for i in obj
    if i.hasOwnProperty("lang") and i.lang == "R"
      Transform.prototype["R_" + i.function](i.properties)
    else
      Transform.prototype[i.function](i.properties)




        #j {log_x: Math.log(j.x)    ,x:5}




Transform::pow = (obj)->
  dataTable = lib.GoG_JSON[obj.data]
  power = obj.power
  field = obj.field
  variable = obj.name

  for j in dataTable
    for key, value of j
      j[variable] = Math.pow(j[field], power)



Transform::R_fibonnaci = (obj) ->
  dataTable = lib.GoG_JSON[obj.data]
  variable = obj.name
  field = obj.field
  length = obj.length
  library = obj.library
  data = {n : length, sequence: true}

  ocpu.seturl "http://localhost:5888/ocpu/library/"+library+"/R"

  ocpu.rpc "fibonacci", data , (output) ->
    m = 0
    for j in dataTable
      j[variable] = output[m]
      m++

  return




