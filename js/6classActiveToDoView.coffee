class ActiveToDoView extends ToDoView
  constructor: (todo) ->
    super todo
    
    @checkbox = document.createElement "input"
    @checkbox.type = "checkbox"
    
    li = @li
    @checkbox.addEventListener("click", () ->
        todo.complete()
        li.outerHTML = ""
    , false)
    
    @updateFont()
    
    @li.appendChild @checkbox
    @li.appendChild @span
    ActiveToDoView.list.appendChild @li
  
  updateFont: ->
    age = new Date().getTime() - @todo.timestamp
    oneWeek = 7 * 24 * 60 * 60 * 1000
    pixelToTimeRatio = 100 / oneWeek
    
    @li.style.fontSize = "#{Math.min(Math.round(age * pixelToTimeRatio + 16),250)}px"
    if age > oneWeek then @li.style.fontFamily = "Comic Sans MS"
    
ActiveToDoView.list = document.getElementById "todoList"