containerDiv = d3.select("#containerDiv") # The container div to which ToDo divs are appended
button = d3.select("#button").on("click", -> new ToDo()) # This button creates a new ToDo

arr = [] # This array contains all the ToDo objects, which is JSON.stringify'ed and stored in localStorage

randomToDos = ["buy mayonaise to finish making sandwich and eat sandwich", "tie shoes CORRECTLY", "build sandbox near guest house", "throw away expired Captain Crunch", "sharpen toothpicks for meetup group", "share true feelings with crush", "fix hole in pants butt", "practice wookie impression", "do things that will not lead to regret", "bury timecapsule in the lot where they're going to build that new Walmart"]
randomToDo = ->
  randomToDos[Math.floor(Math.random()*10)]

window.onload = ->
  if localStorage.todos? # check local storage for existing ToDos
    arrLS = JSON.parse localStorage.todos # parse the json string, save it as arrLS
    for obj, i in arrLS # loop through arrLS and (re)create a new ToDo object for each object in the array
      try
        new ToDo(i, obj.timestamp, obj.description) # for deleted items that are null, an error will be thrown and no ToDo object will be created
      catch e
        console.log e
  else
    new ToDo()

class ToDo
  constructor: (@index = arr.length, @timestamp = new Date().getTime(), @description = randomToDo(), @id) ->
    updateDescription = @updateDescription
    div = containerDiv.append("div")
      .attr("class", "toDo")
      .text(@description)
      .attr("contenteditable", "true")
      .on("keyup", ->  updateDescription @.textContent )
    
    @updateSize(div)
      
    remove = @remove
    rbutton = containerDiv.append("span")
      .attr("class", "removeButton")
      .text("done")
      .on("click", -> remove(div, rbutton))
      
    containerDiv.append("br")
      
    #if new Date().getTime() - @timestamp is 0
    arr.push @
    localStorage.todos = JSON.stringify arr
      
    @startInterval div
      
  startInterval: (div) ->
    updateSize = @updateSize
    window.setInterval(-> 
        updateSize(div)
      , 1000*60*5) # Five Minutes
    
  updateSize: (div) =>
    age = Math.ceil((new Date().getTime() - @timestamp)/1000000)/100 # This is the real formula
    #age = Math.ceil((86400000*(7 - @index))/1000000)/100 # This is for demonstration purposes only
    
    div.style("font-size", "#{1 + age}em")
    
    if age >= 6.05 # If the todo is older than one week
      div.attr("class", "toDo comicSans") # set the font to Comic Sans
      
  updateDescription: (newDescription) =>
    @description = newDescription
    arr[@index] = @
    localStorage.todos = JSON.stringify arr
    
  changeIndex: =>
    # update the indexes of the other ToDos to reflect their new position in the dom
    # update localStorage
  
  remove: (div, rbutton) =>
    div.remove()
    rbutton.remove()
    arr[@index] = null
    localStorage.todos = JSON.stringify arr
    # remove from the dom
    # remove for the arr
    # update the indexes of the other ToDos to reflect their new position in the arr
    # update localStorage
    