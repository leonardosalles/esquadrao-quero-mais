export const toMonetary = (int) => {
  let intInternal = int !== null && int !== undefined ? int : 0

  const value = intInternal.toFixed(2).split('.')
  value[0] = `R$ ${value[0].split(/(?=(?:...)*$)/).join('.')}`
  return value.join(',')
}


export const toFixed = value => {
  if (value < 10) {
    return `0${value}`
  }

  return value
}

export const toColoredStatus = (percent, classInfo, classDanger, classSuccess) => {
  if (percent > 100) {
    return classSuccess
  }

  if (percent < 100) {
    return classDanger
  }

  return classSuccess
}

export const toSignalColor = (percent, yellowClass, redClass, greenClass) => {
  if (percent >= 100) {
    return greenClass
  }

  if (percent >= 80 && percent < 100) {
    return yellowClass
  }

  if (percent < 100) {
    return redClass
  }

  return redClass
}

export const normalizePercentage = percent => {
  return parseFloat(percent, 10).toFixed(2)
}