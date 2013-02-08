class ActiveToDo extends ToDo
  constructor: (description, timestamp = new Date().getTime(), active = true) ->
    super description, timestamp, active
    new ActiveToDoView @
    
  complete: ->
    new CompletedToDo @description
    @destroy()
    