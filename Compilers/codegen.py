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

    
    def generate(self, ast):
        code = []
        for stmt in ast:
            code.extend(self.gen(stmt))
        code.append(HALT)
        return code


    def gen(self, node):
        if isinstance(node, Number):
            return [PUSH, node.value]

        if isinstance(node, Var):
            return [GET_LOCAL, self.get_slot(node.name)]

        if isinstance(node, Add):
            return self.gen(node.left) + self.gen(node.right) + [ADD]
        
        if isinstance(node, Mul):
            return self.gen(node.left) + self.gen(node.right) + [MUL]

        if isinstance(node, Assign):
            slot = self.get_slot(node.name)
            return self.gen(node.value) + [SET_LOCAL, slot]

        if isinstance(node, Print):
            return self.gen(node.value) + [PRINT]

        raise Exception("Unknown AST node")

    