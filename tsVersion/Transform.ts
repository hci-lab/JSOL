interface TransformProperties {
  name: string
  field: string
}

interface TransformPower extends TransformProperties {
  power: number
}

interface TransformSpec {
  "function": string
  properties: TransformProperties
}

class Transform {

  process(obj: TransformSpec): (datatable: Array<{ [x: string]: any }>) => Array<{ [x: string]: any }> {
    return (dataTable) => {
      switch (obj.function) {
        case "power":
          return this.pow(<TransformPower>obj.properties, dataTable)
        case "count":
          return this.count(obj.properties, dataTable)
        default:
          return dataTable
      }
    }
  }


  pow(obj: TransformPower, dataTable: Array<{ [x: string]: any }>): Array<{ [x: string]: any }> {
    return dataTable.map(r => Object.assign({}, { ...r }, { [obj.name]: Math.pow(r[obj.field], obj.power) }))
  }

  count(obj: TransformProperties, dataTable: Array<{ [x: string]: any }>): Array<{ [x: string]: any }> {
    var results = dataTable.reduce((acc, r) => {
      if (acc[r[obj.field]])
        return Object.assign({}, { ...acc }, { [r[obj.field]]: acc[r[obj.field]] + 1 })
      else
        return Object.assign({}, { ...acc }, { [r[obj.field]]: 1 })
    }, <{ [x: string]: number }>{})

    return Object.keys(results).map(r => { 
      return { [r]: results[r] }
    })
  }
}