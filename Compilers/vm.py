PUSH = 1
ADD = 2
MUL = 3
SET_LOCAL = 4
GET_LOCAL = 5
PRINT = 6
HALT = 0
class VM:
    def __init__(self, code):
        self.code = code
        self.ip = 0
        self.stack = []
        self.locals = [0] * 10

    def run(self):
        while True:
            op = self.code[self.ip]
            self.ip += 1

            if op == HALT:
                break

            elif op == PUSH:
                val = self.code[self.ip]
                self.ip += 1
                self.stack.append(val)

            elif op == ADD:
                b = self.stack.pop()
                a = self.stack.pop()
                self.stack.append(a + b)

            elif op == SET_LOCAL:
                idx = self.code[self.ip]
                self.ip += 1
                self.locals[idx] = self.stack.pop()

            elif op == GET_LOCAL:
                idx = self.code[self.ip]
                self.ip += 1
                self.stack.append(self.locals[idx])

            elif op == PRINT:
                print(self.stack.pop())

            else: 
                raise Exception("Unknown opcode", op)