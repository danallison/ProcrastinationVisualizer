// Generated by CoffeeScript 1.3.3
(function() {
  var ActiveToDo, ActiveToDoView, CompletedToDo, CompletedToDoView, QueuedToDo, QueuedToDoView, ToDo, ToDoView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ToDo = (function() {

    function ToDo(description, timestamp, active) {
      this.description = description;
      this.timestamp = timestamp;
      this.active = active;
      this.id = ToDo.data.length;
      ToDo.data.push({
        d: this.description,
        t: this.timestamp,
        a: this.active
      });
    }

    ToDo.prototype.update = function(description) {
      this.description = description;
      ToDo.data[this.id].d = this.description;
      return ToDo.save();
    };

    ToDo.prototype.destroy = function() {
      ToDo.data[this.id] = null;
      return ToDo.save();
    };

    return ToDo;

  })();

  ToDo.data = [];

  ToDo.save = function() {
    return localStorage.todos = JSON.stringify(ToDo.data);
  };

  ToDo.get = function() {
    var todo, _i, _len, _ref, _results;
    if (localStorage.todos != null) {
      ToDoView.clear();
      _ref = JSON.parse(localStorage.todos);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        if (todo != null) {
          if (todo.a) {
            _results.push(new ActiveToDo(todo.d, todo.t, todo.a));
          } else if (todo.t === 0) {
            _results.push(new QueuedToDo(todo.d, todo.t, todo.a));
          } else {
            _results.push(new CompletedToDo(todo.d, todo.t, todo.a));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  ActiveToDo = (function(_super) {

    __extends(ActiveToDo, _super);

    function ActiveToDo(description, timestamp, active) {
      if (timestamp == null) {
        timestamp = new Date().getTime();
      }
      if (active == null) {
        active = true;
      }
      ActiveToDo.__super__.constructor.call(this, description, timestamp, active);
      new ActiveToDoView(this);
    }

    ActiveToDo.prototype.complete = function() {
      new CompletedToDo(this.description);
      return this.destroy();
    };

    return ActiveToDo;

  })(ToDo);

  QueuedToDo = (function(_super) {

    __extends(QueuedToDo, _super);

    function QueuedToDo(description, timestamp, active) {
      if (description == null) {
        description = "";
      }
      if (timestamp == null) {
        timestamp = 0;
      }
      if (active == null) {
        active = false;
      }
      QueuedToDo.__super__.constructor.call(this, description, timestamp, active);
      new QueuedToDoView(this);
    }

    QueuedToDo.prototype.activate = function() {
      new ActiveToDo(this.description);
      return this.destroy();
    };

    return QueuedToDo;

  })(ToDo);

  CompletedToDo = (function(_super) {

    __extends(CompletedToDo, _super);

    function CompletedToDo(description, timestamp, active) {
      if (timestamp == null) {
        timestamp = new Date().getTime();
      }
      if (active == null) {
        active = false;
      }
      CompletedToDo.__super__.constructor.call(this, description, timestamp, active);
      new CompletedToDoView(this);
    }

    return CompletedToDo;

  })(ToDo);

  ToDoView = (function() {

    function ToDoView(todo) {
      this.todo = todo;
      this.li = document.createElement("li");
      this.span = document.createElement("span");
      if (this.todo.description !== "") {
        this.span.textContent = this.todo.description;
      }
    }

    return ToDoView;

  })();

  ToDoView.newButton = document.getElementById("newButton");

  ToDoView.newButton.addEventListener("click", function() {
    return new QueuedToDo();
  }, false);

  ToDoView.clear = function() {
    ActiveToDoView.list.innerHTML = "";
    return QueuedToDoView.list.innerHTML = "";
  };

  ActiveToDoView = (function(_super) {

    __extends(ActiveToDoView, _super);

    function ActiveToDoView(todo) {
      var li;
      ActiveToDoView.__super__.constructor.call(this, todo);
      this.checkbox = document.createElement("input");
      this.checkbox.type = "checkbox";
      li = this.li;
      this.checkbox.addEventListener("click", function() {
        todo.complete();
        return li.outerHTML = "";
      }, false);
      this.updateFont();
      this.li.appendChild(this.checkbox);
      this.li.appendChild(this.span);
      ActiveToDoView.list.appendChild(this.li);
    }

    ActiveToDoView.prototype.updateFont = function() {
      var age, oneWeek, pixelToTimeRatio;
      age = new Date().getTime() - this.todo.timestamp;
      oneWeek = 7 * 24 * 60 * 60 * 1000;
      pixelToTimeRatio = 100 / oneWeek;
      this.li.style.fontSize = "" + (Math.min(Math.round(age * pixelToTimeRatio + 16), 250)) + "px";
      if (age > oneWeek) {
        return this.li.style.fontFamily = "Comic Sans MS";
      }
    };

    return ActiveToDoView;

  })(ToDoView);

  ActiveToDoView.list = document.getElementById("todoList");

  QueuedToDoView = (function(_super) {

    __extends(QueuedToDoView, _super);

    function QueuedToDoView(todo) {
      var li, span, t;
      QueuedToDoView.__super__.constructor.call(this, todo);
      li = this.li;
      this.li.addEventListener("dblclick", function() {
        todo.activate();
        return li.outerHTML = "";
      }, false);
      this.span.setAttribute("contentEditable", true);
      t = null;
      span = this.span;
      this.span.addEventListener("keyup", function(e) {
        window.clearTimeout(t);
        return t = window.setTimeout(function() {
          return todo.update(span.textContent);
        }, 400);
      }, false);
      this.li.appendChild(this.span);
      QueuedToDoView.list.appendChild(this.li);
    }

    return QueuedToDoView;

  })(ToDoView);

  QueuedToDoView.list = document.getElementById("todoQueue");

  CompletedToDoView = (function(_super) {

    __extends(CompletedToDoView, _super);

    function CompletedToDoView(todo) {
      var child, li, otherLI, otherLIs, _i, _j, _len, _len1, _ref;
      CompletedToDoView.__super__.constructor.call(this, todo);
      this.checkbox = document.createElement("input");
      this.checkbox.type = "checkbox";
      this.checkbox.checked = "checked";
      li = this.li;
      this.li.addEventListener("dblclick", function() {
        todo.destroy();
        return li.outerHTML = "";
      }, false);
      this.li.appendChild(this.checkbox);
      this.li.appendChild(this.span);
      otherLIs = [];
      _ref = CompletedToDoView.list.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        otherLIs.push(child);
      }
      CompletedToDoView.list.innerHTML = "";
      CompletedToDoView.list.appendChild(this.li);
      for (_j = 0, _len1 = otherLIs.length; _j < _len1; _j++) {
        otherLI = otherLIs[_j];
        CompletedToDoView.list.appendChild(otherLI);
      }
    }

    return CompletedToDoView;

  })(ToDoView);

  CompletedToDoView.list = document.getElementById("completedList");

  window.onload = function() {
    ToDo.get();
    return ActiveToDoView.list.style.display = "block";
  };

}).call(this);
