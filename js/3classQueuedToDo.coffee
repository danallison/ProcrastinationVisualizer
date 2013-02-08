class QueuedToDo extends ToDo
  constructor: (description = "", timestamp = 0, active = false) ->
    super description, timestamp, active
    new QueuedToDoView @
  
  activate: ->
    new ActiveToDo @description
    @destroy()
    