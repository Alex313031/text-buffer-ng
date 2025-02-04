(function() {
  var Point, isNumber;

  module.exports = Point = (function() {

    /*
    Section: Properties
     */
    Point.prototype.row = null;

    Point.prototype.column = null;


    /*
    Section: Construction
     */

    Point.fromObject = function(object, copy) {
      var column, row;
      if (object instanceof Point) {
        if (copy) {
          return object.copy();
        } else {
          return object;
        }
      } else {
        if (Array.isArray(object)) {
          row = object[0], column = object[1];
        } else {
          row = object.row, column = object.column;
        }
        return new Point(row, column);
      }
    };


    /*
    Section: Comparison
     */

    Point.min = function(point1, point2) {
      point1 = this.fromObject(point1);
      point2 = this.fromObject(point2);
      if (point1.isLessThanOrEqual(point2)) {
        return point1;
      } else {
        return point2;
      }
    };

    Point.max = function(point1, point2) {
      point1 = Point.fromObject(point1);
      point2 = Point.fromObject(point2);
      if (point1.compare(point2) >= 0) {
        return point1;
      } else {
        return point2;
      }
    };

    Point.assertValid = function(point) {
      if (!(isNumber(point.row) && isNumber(point.column))) {
        throw new TypeError("Invalid Point: " + point);
      }
    };

    Point.ZERO = Object.freeze(new Point(0, 0));

    Point.INFINITY = Object.freeze(new Point(2e308, 2e308));


    /*
    Section: Construction
     */

    function Point(row, column) {
      if (row == null) {
        row = 0;
      }
      if (column == null) {
        column = 0;
      }
      if (!(this instanceof Point)) {
        return new Point(row, column);
      }
      this.row = row;
      this.column = column;
    }

    Point.prototype.copy = function() {
      return new Point(this.row, this.column);
    };

    Point.prototype.negate = function() {
      return new Point(-this.row, -this.column);
    };


    /*
    Section: Operations
     */

    Point.prototype.freeze = function() {
      return Object.freeze(this);
    };

    Point.prototype.translate = function(other) {
      var column, ref, row;
      ref = Point.fromObject(other), row = ref.row, column = ref.column;
      return new Point(this.row + row, this.column + column);
    };

    Point.prototype.traverse = function(other) {
      var column, row;
      other = Point.fromObject(other);
      row = this.row + other.row;
      if (other.row === 0) {
        column = this.column + other.column;
      } else {
        column = other.column;
      }
      return new Point(row, column);
    };

    Point.prototype.traversalFrom = function(other) {
      other = Point.fromObject(other);
      if (this.row === other.row) {
        if (this.column === 2e308 && other.column === 2e308) {
          return new Point(0, 0);
        } else {
          return new Point(0, this.column - other.column);
        }
      } else {
        return new Point(this.row - other.row, this.column);
      }
    };

    Point.prototype.splitAt = function(column) {
      var rightColumn;
      if (this.row === 0) {
        rightColumn = this.column - column;
      } else {
        rightColumn = this.column;
      }
      return [new Point(0, column), new Point(this.row, rightColumn)];
    };


    /*
    Section: Comparison
     */

    Point.prototype.compare = function(other) {
      other = Point.fromObject(other);
      if (this.row > other.row) {
        return 1;
      } else if (this.row < other.row) {
        return -1;
      } else {
        if (this.column > other.column) {
          return 1;
        } else if (this.column < other.column) {
          return -1;
        } else {
          return 0;
        }
      }
    };

    Point.prototype.isEqual = function(other) {
      if (!other) {
        return false;
      }
      other = Point.fromObject(other);
      return this.row === other.row && this.column === other.column;
    };

    Point.prototype.isLessThan = function(other) {
      return this.compare(other) < 0;
    };

    Point.prototype.isLessThanOrEqual = function(other) {
      return this.compare(other) <= 0;
    };

    Point.prototype.isGreaterThan = function(other) {
      return this.compare(other) > 0;
    };

    Point.prototype.isGreaterThanOrEqual = function(other) {
      return this.compare(other) >= 0;
    };

    Point.prototype.isZero = function() {
      return this.row === 0 && this.column === 0;
    };

    Point.prototype.isPositive = function() {
      if (this.row > 0) {
        return true;
      } else if (this.row < 0) {
        return false;
      } else {
        return this.column > 0;
      }
    };

    Point.prototype.isNegative = function() {
      if (this.row < 0) {
        return true;
      } else if (this.row > 0) {
        return false;
      } else {
        return this.column < 0;
      }
    };


    /*
    Section: Conversion
     */

    Point.prototype.toArray = function() {
      return [this.row, this.column];
    };

    Point.prototype.serialize = function() {
      return this.toArray();
    };

    Point.prototype.toString = function() {
      return "(" + this.row + ", " + this.column + ")";
    };

    return Point;

  })();

  isNumber = function(value) {
    return (typeof value === 'number') && (!Number.isNaN(value));
  };

}).call(this);
