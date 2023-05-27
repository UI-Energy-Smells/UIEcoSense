// Description: This file contains the class Smell, which is used to store the information of a code smell.
export default class Smell {
  constructor() {
    this.category = 'Unmarked'
    this.start = {
      line: 0,
      column: 0,
      index: 0,
    }
    this.end = {
      line: 0,
      column: 0,
      index: 0,
    }
    this.filename = ''
    this.filepath = ''
    this.attributesType = ''

    this.refactorable = false
    this.refactored = ''
  }

  //Setters
  setLocations(start, end) {
    this.start = start
    this.end = end
  }

  setFile(filename, filepath) {
    this.filename = filename
    this.filepath = filepath
  }

  setDetail(attribute, category) {
    this.attributesType = attribute
    this.category = category
  }

  setRefactorable(refactorable) {
    this.refactorable = refactorable
  }

  setRefactoredCode(refactored) {
    this.refactored = refactored
  }

  //Getters
  getLocations() {
    return { start: this.start, end: this.end }
  }

  getFile() {
    return { filename: this.filename, filepath: this.filepath }
  }

  getDetail() {
    return { attributesType: this.attributesType, category: this.category }
  }

  getRefactorable() {
    return this.refactorable
  }

  getRefactoredCode() {
    return this.refactored
  }
}
