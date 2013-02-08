class CompletedToDoView extends ToDoView
  constructor: (todo) ->
    super todo
    
    @checkbox = document.createElement "input"
    @checkbox.type = "checkbox"
    @checkbox.checked = "checked"
    
    li = @li
    @li.addEventListener("dblclick", () ->
        todo.destroy()
        li.outerHTML = ""
    , false)
    
    @li.appendChild @checkbox
    @li.appendChild @span
    
    otherLIs = []
    for child in CompletedToDoView.list.children
      otherLIs.push(child)
    CompletedToDoView.list.innerHTML = ""
    CompletedToDoView.list.appendChild @li
    for otherLI in otherLIs
      CompletedToDoView.list.appendChild otherLI
    
    
CompletedToDoView.list = document.getElementById "completedList"