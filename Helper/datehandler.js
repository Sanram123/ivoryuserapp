const getOnlyDate = dateVal => {
  return dateVal.toISOString().split('T')[0]
}

export const showDay = (type, presentDate) => {
  let presDate = new Date(presentDate)
  if (type) {
    let prevDate = new Date(presDate.setDate(presDate.getDate() - 1))
    return prevDate.toISOString().split('T')[0]
  } else {
    let newDate = new Date(presDate.setDate(presDate.getDate() + 1))
    let nextDate = newDate < new Date() ? newDate : new Date()
    return nextDate.toISOString().split('T')[0]
  }
}

export const showWeek = () => {
  var curr = new Date()
  var fromDate = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  var toDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
  console.log(fromDate)
  console.log(toDate)
  return (
    fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]
  )
}

export const getDaysArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toISOString().split('T')[0])
  }
  return arr
}
