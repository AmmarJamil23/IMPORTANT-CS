from vm import PUSH, ADD , MUL, SET_LOCAL, GET_LOCAL, PRINT, HALT
from simple_ast import Number, Var, Add, Mul, Assign, Print 

class CodeGen:
    def __init__(self):
        self.vars = {}
        self.next_slot = 0

    def get_slot(self, name):
        if name not in self.vars:
            self.vars[name] = self.next_slot
            self.next_slot += 1
        return self.vars[name]