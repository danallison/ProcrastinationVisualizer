class ToDoView
  constructor: (@todo) ->
    @li = document.createElement "li"
    @span = document.createElement "span"

    @span.textContent = @todo.description if @todo.description isnt ""

ToDoView.newButton = document.getElementById "newButton"

ToDoView.newButton.addEventListener("click", () ->
  new QueuedToDo()
, false)

ToDoView.clear = ->
  ActiveToDoView.list.innerHTML = ""
  QueuedToDoView.list.innerHTML = ""
