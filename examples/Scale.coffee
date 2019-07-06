class Scale



  ##{
  ##           "name": "xscale", // scale name
  ##            "type": "linear", // scale type
  ##            "range": "width", // chart width
  ##            "domain": {
  ##                "data": "static",
  ##                "field": "x"
  ##            }
  ##        }
  #  {"type" : "linear", "domain" : [1000,4000], "range" : [35,350]}
  #scale = (obj) ->
  #    scaleobj = d3.scale[obj.type]()
  #    scaleobj = scaleobj["domain"](obj.domain)
  #    scaleobj = scaleobj["range"](obj.range)
  #    console.log scaleobj(2000)


Scale::process = (obj)->
  dataArray = []
  for i in obj
    for j in lib.GoG_JSON[i.domain.data]
      for key,value of j
        if(key == i.domain.field)
          dataArray.push(value)
    break
    else
    continue
    domainArray = [d3.min(dataArray), d3.max(dataArray)]
    rangeArray = []
    if Array.isArray(i.range)
      rangeArray = i.range
    if i.range == "height"
      minRange = lib.GoG_JSON[i.range] - lib.GoG_JSON.margin
      rangeArray.push(minRange)
      maxRange = lib.GoG_JSON.margin
      rangeArray.push(maxRange)
    else
      minRange = lib.GoG_JSON.margin
      rangeArray.push(minRange)
      maxRange = lib.GoG_JSON[i.range] - lib.GoG_JSON.margin
      rangeArray.push(maxRange)

    scaleObj =
      type: i.type
      domain: domainArray
      range: rangeArray

    scaleArray = Scale::scale(scaleObj)

    for c in lib.GoG_JSON[i.domain.data]
      for key1,value1 of c
  if(key1 == i.domain.field)
    c[i.name] = scaleArray(c[i.domain.field])
  break

  dataArray = []
  domainArray = []
  return


Scale::scale = (obj) ->
  scaleobj = d3.scale[obj.type]()
  scaleobj = scaleobj["domain"](obj.domain)
  scaleobj = scaleobj["range"](obj.range)