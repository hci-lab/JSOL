



class Lib
  config: {
    id: "#"
    background: "white"
    width: 400
    height: 300
    margin: {
      top: 5
      left: 5
      right: 5
      bottom: 5
    }
    context: "2d"

  }
  varset: {}
  geom: {}
  coordinates: {
    type: "cartisian"
    nice: false
    gridColor: "rgba(128, 128, 255, 0.5)"
    gridOpacity: 0.5
    orientation: {
      x: "bottom"
      y: "left"
    }
    title: {
      x: null
      y: null
      fontSize: "12 pt"
      fontType: "Helvetica"
      fontColor: "black"
    }
    format: ""
    ticks: 10
    axesColor: {
      x: "black"
      y: "black"
    }


  }
  stats: {}
  data: []
  helpers: {}



Lib::helpers.arrayEqual = (a, b) ->
  a.length is b.length and a.every (elem, i) -> elem is b[i]

Lib::helpers.arrayChecker = (arr) ->
  varName = ""
  for key, value of Lib::varset
    if Lib::helpers.arrayEqual(arr, value)
      varName = key
  varName

Lib::helpers.parseNumber = (arr) ->
  arr.shift()
  parsedArray = arr.map((e) -> +e)
  parsedArray


Lib::variables = new Object()
Lib::variables.log = (arr,append = true) ->
  LogArray = ( Math.log(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_log'] = LogArray
    Lib::variables
  else
    LogArray



Lib::variables.exp = (arr, append = true) ->
  ExpArray = ( Math.exp(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_exp'] = ExpArray
    Lib::variables
  else
    ExpArray

Lib::variables.sin = (arr, append = true) ->
  SinArray = ( Math.sin(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_sin'] = SinArray
    Lib::variables
  else
    SinArray


Lib::variables.cos = (arr, append = true) ->
  CosArray = ( Math.cos(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_cos'] = CosArray
    Lib::variables
  else
    CosArray


Lib::variables.tan = (arr, append = true) ->
  TanArray = ( Math.tan(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_tan'] = TanArray
    Lib::variables
  else
    TanArray

Lib::variables.asin = (arr, append = true) ->
  AsinArray = ( Math.asin(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_asin'] = AsinArray
    Lib::variables
  else
    AsinArray


Lib::variables.acos = (arr, append = true) ->
  AcosArray = ( Math.acos(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_acos'] = AcosArray
    Lib::variables
  else
    AcosArray


Lib::variables.atan = (arr, append = true) ->
  AtanArray = ( Math.atan(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_atan'] = AtanArray
    Lib::variables
  else
    AtanArray

Lib::variables.atanh = (arr, append = true) ->
  AtanhArray = ( Math.atanh(num) for num in arr)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_atanh'] = AtanhArray
    Lib::variables
  else
    AtanhArray


Lib::variables.sign = (arr, append = true) ->
  SignArray = (`num >= 0 ? 1 : -1` for num in arr )
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_sign'] = SignArray
    Lib::variables
  else
    SignArray


Lib::variables.pow = (arr, pow, append = true) ->
  PowArray = ( Math.pow(num, pow) for num in arr )
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_pow'] = PowArray
    Lib::variables
  else
    PowArray

Lib::variables.mean = (arr, append = true) ->
  Sum = arr.reduce(((a, b)-> a + b ), 0)
  Count = arr.length
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_mean'] = Sum / Count
    Lib::variables
  else
    Sum / Count

Lib::variables.median = (arr, append = true) ->
  index = Math.floor(arr.length / 2)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_median'] = arr[index]
    Lib::variables
  else
    arr[index]


Lib::variables.mode = (arr, append = true) ->
  frequency = {}
  max = 0
  result
  for v in arr
    frequency[arr[v]] = (frequency[arr[v]] || 0) + 1
    if(frequency[arr[v]] > max)
      max = frequency[arr[v]]
      result = arr[v]
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_mode'] = result
    Lib::variables
  else
    result


Lib::variables.sort_a = (arr, append = true) ->
  modifiedArray = arr.slice(0)
  sortAarray = modifiedArray.sort((a, b) -> a - b)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_sort_a'] = sortAarray
    Lib::variables
  else
    sortAarray


Lib::variables.sort_d = (arr, append = true) ->
  modifiedArray = arr.slice(0)
  sortAarray = modifiedArray.sort((a, b) -> b - a)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_sort_d'] = sortAarray
    Lib::variables
  else
    sortAarray


Lib::variables.rank = (arr, append = true) ->
  modifiedArray = arr.slice(0)
  sorted = modifiedArray.slice().sort((a, b) -> b - a)
  ranks = modifiedArray.slice().map((v) -> sorted.indexOf(v) + 1)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_rank'] = ranks
    Lib::variables
  else
    ranks

Lib::variables.prank = (arr, append = true) ->
  sortedArray = Lib::helpers.variables.statistical.sort_a(arr, false)
  prankArray = (((num - .5) / sortedArray.length) for num in sortedArray )
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_prank'] = prankArray
    Lib::variables
  else
    prankArray


Lib::variables.cut = (arr, cuts, append = true) ->
  modifiedArray = arr.slice(0)
  arrays = []
  while (modifiedArray.length > 0)
    arrays.push(modifiedArray.splice(0, cuts))
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_cut'] = arrays
    Lib::variables
  else
    arrays


Lib::variables.sum = (arr, append = true) ->
  Sum = arr.reduce(((a, b)-> a + b ), 0)
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_sum'] = Sum
    Lib::variables
  else
    Sum

Lib::variables.diff = (arr, append = true) ->
  initial = arr[0]
  modifiedArray = arr.slice(1)
  for num in modifiedArray
    initial = initial - num
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_diff'] = initial
    Lib::variables
  else
    initial

Lib::variables.prod = (arr, append = true) ->
  initial = arr[0]
  modifiedArray = arr.slice(1)
  for num in modifiedArray
    initial = initial * num
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_prod'] = initial
    Lib::variables
  else
    initial

Lib::variables.quotient = (arr, append = true) ->
  initial = arr[0]
  modifiedArray = arr.slice(1)
  for num in modifiedArray
    initial = initial / num
  if append
    varName = Lib::helpers.arrayChecker(arr)
    Lib::varset[varName + '_quotient'] = initial
    Lib::variables
  else
    initial



Lib::algebra = new Object()

Lib::algebra.cross = (arrs, append = true) ->
  sortedArrays = []
  for arr in arrs
    sortedArrays.push(Lib::variables.sort_a(arr, false))

  elements = sortedArrays.shift().filter((v) ->
    return sortedArrays.every((a) ->
      return a.indexOf(v) isnt -1
    )
  )

  elements = elements.filter((item, pos) ->
    elements.indexOf(item) == pos
  )

  if append
    name = ""
    for arr in arrs
      name += Lib::helpers.arrayChecker(arr)
      name += '_'
    name += 'cross'
    Lib::varset[name] = elements
    Lib::algebra
  else
    elements



Lib::algebra.blend = (arrs, append = true) ->
  MergedArray = [].concat.apply([],arrs)
  len = MergedArray.length

  while --len
    j = Math.floor(Math.random() * (len+1))
    [MergedArray[len], MergedArray[j]] = [MergedArray[j], MergedArray[len]]

  if append
    name = ""
    for arr in arrs
      name += Lib::helpers.arrayChecker(arr)
      name += '_'
    name += 'blend'
    Lib::varset[name] = MergedArray
    Lib::algebra
  else
    MergedArray



Lib::renderCartasian = (minVal, maxVal, ConfigObject, CoordinatesObject, varsetObject) ->
  can = document.getElementById(ConfigObject.id)
  ctx = can.getContext(ConfigObject.context)
  ctx.fillStyle = "black"
  ctx.font = "14pt Helvetica"
  colHead = 50
  rowHead = 50
  ctx.strokeStyle=CoordinatesObject.gridColor
  ctx.beginPath()

  Header = varsetObject.Header

  `
      var yScalar = (can.height - colHead - ConfigObject.margin.left) / (maxVal - minVal)
      var xScalar = (can.width - rowHead) / parseInt(varsetObject.Header.length-1);
      for (i = 1; i <= varsetObject.Header.length; i++) {
          var x = i * xScalar;
          ctx.fillText(Header[i], x, colHead - ConfigObject.margin.left);
          ctx.moveTo(x, colHead);
          ctx.lineTo(x, can.height - ConfigObject.margin.left);
      }
  var count = 0
  for (scale = maxVal; scale >= minVal; scale -= CoordinatesObject.StepSize) {
    var y = colHead + (yScalar * count * CoordinatesObject.StepSize);
    ctx.fillText(scale, ConfigObject.margin.left, y + ConfigObject.margin.left);
    ctx.moveTo(rowHead, y)
    ctx.lineTo(can.width, y)
    count++;
  }`
  ctx.stroke()
  ctx.translate(rowHead,can.height - ConfigObject.margin.left + minVal * yScalar)
  ctx.scale(1,-1 * yScalar)
  return


Lib::geom.line = (data, aes)->
  can = document.getElementById Lib::config.id
  ctx = can.getContext Lib::config.context
  numSamples = parseInt(Lib::varset.Header.length-1)
  xScalar = (can.width - 50) / parseInt(Lib::varset.Header.length-1)
  ctx.strokeStyle = aes
  ctx.beginPath()
  ctx.moveTo(0, data[0])

  `for (i = 1; i < numSamples; i++) {
      ctx.lineTo(i * xScalar, data[i]);
  }`
  ctx.stroke()





#graph = new Lib()
#x = [1, 2, 3, 4, 5, 4, 5, 5, 10, 6]
#y = [1, 4, 5]
#graph.varset.x = x
#graph.varset.y = y
##console.log graph.helpers.variables.multivariate.quotient(y,true)
#
#graph.variables.log(x).atan(x,false)
#graph.algebra.blend([x,y]).cross([x,y])
##graph.helpers.algebra.cross([x, y], true)
##console.log graph.helpers.algebra.blend([x,y], true)
#console.log graph.varset


