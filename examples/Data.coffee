class Data

Data::process = (obj) ->
  for i in obj
    if i.hasOwnProperty('format') and i.format.type == "csv"
      i.values = dl.csv(i.values, i.format)
      lib.GoG_JSON[i.name] = i.values
    if i.hasOwnProperty('format') and i.format.type == "json"
      i.values = dl.json(i.values)
      lib.GoG_JSON[i.name] = i.values
    if i.hasOwnProperty('format') and i.format.type == "tsv"
      i.values = dl.tsv(i.values, i.format)
      lib.GoG_JSON[i.name] = i.values
    else
      lib.GoG_JSON[i.name] = i.values