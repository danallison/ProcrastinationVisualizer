class QueuedToDoView extends ToDoView
  constructor: (todo) ->
    super todo
    li = @li
    @li.addEventListener("dblclick", () ->
        todo.activate()
        li.outerHTML = ""
    , false)
    @span.setAttribute "contentEditable", true
    t = null
    span = @span
    @span.addEventListener("keyup", (e) -> 
      window.clearTimeout t
      t = window.setTimeout ->
        todo.update span.textContent
        #console.log t
      , 400
    , false)
    @li.appendChild @span
    QueuedToDoView.list.appendChild @li
    
QueuedToDoView.list = document.getElementById "todoQueue"
