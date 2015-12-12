class rectangle
  constructor:(@x = 0 , @y = 0 , @height = 100 , @width = 100)->
    canvas = document.getElementsByTagName("canvas")[0]
    context = canvas.getContext('2d')

    context.beginPath()
    context.rect(@x , @y , @height , @width)
    context.lineWidth = 7
    context.strokeStyle = 'black'
    context.stroke()

re = new rectangle()
