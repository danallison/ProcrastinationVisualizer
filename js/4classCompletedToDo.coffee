class CompletedToDo extends ToDo
  constructor: (description, timestamp = new Date().getTime(), active = false) ->
    super description, timestamp, active
    new CompletedToDoView @