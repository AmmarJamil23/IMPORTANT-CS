class Number:
    def __init__(self, value):
        self.value = value

class Var:
    def __init__(self, name):
        self.name = name

class Add:
    def __init__(self, left, right):
        self.left = left
        self.right = right

class Mul:
    def __init__(self, left, right):
        self.left = left
        self.right = right

class Assign:
    def __init__(self, name, value):
        self.name = name
        self.value = value

class Print:
    def __init__(self, value):
        self.value = value


class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.i = 0

    def peek(self):
        return self.tokens[self.i] if self.i < len(self.tokens) else None

    def advance(self):
        tok = self.peek()
        self.i += 1
        return tok

    def parse(self):
        statements = []
        while self.peek() is not None:
            statements.append(self.statement())
        return statements

    def statement(self):
        tok = self.peek()

        if tok[0] == "IDENT":
            name = tok[1]
            self.advance()

            eq = self.advance()
            if eq[0] != "EQUAL":
                raise Exception("Expected '='")
            
            value = self.expr()
            return Assign(name, value)
        
        elif tok[0] == "PRINT":
            self.advance()
            value = self.expr()
            return Print(value)

        else:
            raise Exception("Invalid statement start: " + str(tok))
    

    def expr(self):
        node = self.term()

        while True:
            tok = self.peek()
            if tok and tok[0] == "PLUS":
                self.advance()
                right = self.term()
                node = Add(node, right)

            else:
                break

        return node

    def term(self):
        node = self.factor()

        while True:
            tok = self.peek()

            if tok and tok[0] == "MULT":
                self.advance()
                right = self.factor()
                node = Mul(node, right)
            else:
                break
        
        return node

    def factor(self):
        tok = self.advance()

        if tok[0] == "NUMBER":
            return Number(tok[1])

        elif tok[0] == "IDENT":
            return Var(tok[1])

        elif tok[0] == "LPAREN":
            expr = self.expr()
            rp = self.advance()
            if rp[0] != "RPAREN":
                raise Exception("Expected ')'")
            return expr

        else:
            raise Exception("Unexppected token: " +str(tok))
