class ToDo
  constructor: (@description, @timestamp, @active) ->
    @id = ToDo.data.length
    ToDo.data.push { d: @description, t: @timestamp, a: @active }
    
  update: (@description) ->
    ToDo.data[@id].d = @description
    ToDo.save()
    
  destroy: ->
    ToDo.data[@id] = null
    ToDo.save()
    
ToDo.data = []

ToDo.save = ->
  localStorage.todos = JSON.stringify ToDo.data

ToDo.get = ->
  if localStorage.todos?
    ToDoView.clear()
    for todo in JSON.parse localStorage.todos
      if todo?
        if todo.a 
          new ActiveToDo(todo.d, todo.t, todo.a) 
        else if todo.t is 0
          new QueuedToDo(todo.d, todo.t, todo.a)
        else
          new CompletedToDo(todo.d, todo.t, todo.a)
  